import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { validateWorkEmail } from "../../../lib/workEmail";

// ---------------------------------------------------------------------------
// Spam / abuse protection for the lead form (no extra services needed)
//   1. Payload size cap          -> blocks giant junk bodies
//   2. Per-IP rate limit         -> blocks one source hammering the endpoint
//   3. Honeypot field            -> blocks simple form-filling bots
//   4. Server-side validation    -> blocks people who skip the browser form
//   5. Webhook text sanitising   -> blocks @everyone / @here pings & overlong messages
//
// NOTE: the rate limit lives in server memory. On Vercel each serverless
// instance has its own memory, so treat it as a first line of defence and ALSO
// turn on Vercel's Firewall rate limiting (see README / deployment checklist).
// ---------------------------------------------------------------------------

const MAX_BODY_BYTES = 10_000; // a real submission is ~1 KB
const RATE_LIMIT_MAX = 5; // requests...
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // ...per 10 minutes per IP

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // keep the map from growing forever
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

function getIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0].trim() : request.headers.get("x-real-ip")) || "unknown";
}

/** Trim, collapse control chars, cap length, and neutralise Discord/Slack mass pings. */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}
function forChat(value: string): string {
  return value
    .replace(/@(everyone|here)/gi, "@\u200b$1")
    .replace(/<@[!&]?\d+>/g, "[mention]")
    .replace(/[`*_~|>]/g, "");
}

const ALLOWED_WINDOWS = new Set(["morning", "afternoon", "evening"]);

const PREFERRED_WINDOW_LABELS: Record<string, string> = {
  morning: "Morning (10:00 AM – 1:00 PM IST)",
  afternoon: "Afternoon (1:00 PM – 5:00 PM IST)",
  evening: "Evening (5:00 PM – 8:00 PM IST)",
};

const TEAM_NOTIFY_EMAILS = "bharadhwaj@kplor.com,mukil@kplor.com,sanjeeth@kplor.com";

function fail(status: number, message: string, field?: string) {
  return NextResponse.json({ success: false, message, field }, { status });
}

export async function POST(request: Request) {
  try {
    // 1. size cap
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return fail(413, "Request too large.");

    // 2. rate limit
    const ip = getIp(request);
    if (isRateLimited(ip)) {
      return fail(429, "Too many requests. Please try again in a few minutes or email info@kplor.com.");
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return fail(400, "Invalid request.");
    }

    // 3. honeypot: real users never fill this hidden field. Pretend success so bots don't adapt.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true, message: "Lead received" });
    }

    // 4. validate + whitelist fields (never spread raw user input into records)
    // Two forms post here:
    //   "callback" = the "Ask our team to call you" modal (strict: work email, phone, window)
    //   "contact"  = the /contact_us page (general message; basic email check)
    const name = clean(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const isCallback = body.preferredTime !== undefined || body.phone !== undefined;

    if (!name) return fail(400, "Please enter your name.", "name");

    let leadRecord: Record<string, string>;
    let kind: string;

    if (isCallback) {
      kind = "Callback Request";
      const phone = clean(body.phone, 30);
      const organization = clean(body.organization, 150);
      const requirement = clean(body.requirement, 2000);
      const preferredTime = clean(body.preferredTime, 20);

      if (!/^[+\d][\d\s\-()]{6,24}$/.test(phone)) return fail(400, "Please enter a valid phone number.", "phone");
      const emailCheck = validateWorkEmail(email);
      if (!emailCheck.valid) return fail(400, emailCheck.message || "Please enter a valid work email.", "email");
      if (!organization) return fail(400, "Please enter your organization.", "organization");
      if (!requirement) return fail(400, "Please tell us about your requirement.", "requirement");
      if (!ALLOWED_WINDOWS.has(preferredTime)) return fail(400, "Please select a preferred call window.", "preferredTime");

      const preferredWindowLabel = PREFERRED_WINDOW_LABELS[preferredTime] || preferredTime;
      leadRecord = {
        type: "callback",
        name,
        phone,
        email,
        organization,
        requirement,
        preferredTime,
        preferredWindowLabel,
        subject: "Callback Request from Website",
        message: `Phone: ${phone} | Preferred Window: ${preferredWindowLabel} | Organization: ${organization} | Requirement: ${requirement}`,
      };
    } else {
      kind = "Contact Message";
      const message = clean(body.message, 3000);
      const role = clean(body.role, 50);
      const subject = clean(body.subject, 80);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail(400, "Please enter a valid email address.", "email");
      if (!message) return fail(400, "Please enter a message.", "message");

      leadRecord = { type: "contact", name, email, role, subject, message, preferredWindowLabel: "" };
    }

    const now = new Date();
    const timestamp = now.toISOString();
    const dateIST = now.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeIST =
      now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }) + " IST";

    leadRecord = {
      id: `lead_${Date.now()}`,
      timestamp,
      dateIST,
      timeIST,
      notifyEmails: TEAM_NOTIFY_EMAILS,
      ...leadRecord,
    };

    // Terminal log (visible in Vercel > Logs). Do not log more than needed.
    console.log(`[KPLOR LEAD] ${timestamp} ${kind}: ${name} <${email}>`);

    // 5a. Local file backup. Works on your laptop; on Vercel the filesystem is
    // read-only/ephemeral so this silently does nothing there. The webhook is the real record.
    if (process.env.NODE_ENV !== "production") {
      try {
        const dataDir = path.join(process.cwd(), "data");
        await fs.mkdir(dataDir, { recursive: true });
        const leadsFile = path.join(dataDir, "leads.json");
        let existing: unknown[] = [];
        try {
          existing = JSON.parse(await fs.readFile(leadsFile, "utf-8"));
        } catch {
          existing = [];
        }
        existing.unshift(leadRecord);
        await fs.writeFile(leadsFile, JSON.stringify(existing, null, 2), "utf-8");
      } catch (fsErr) {
        console.warn("Could not write local leads backup:", fsErr);
      }
    }

    // 5b. Notifications. At least ONE channel must succeed, otherwise we tell the user.
    const webhookUrl =
      process.env.NOTIFICATION_WEBHOOK_URL ||
      process.env.DISCORD_WEBHOOK_URL ||
      process.env.SLACK_WEBHOOK_URL;
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    const results: boolean[] = [];

    if (webhookUrl) {
      const lines = [
        `🔔 **New Kplor ${kind}**`,
        `👤 **Name:** ${forChat(name)}`,
        `✉️ **Email:** ${forChat(email)}`,
      ];
      if (isCallback) {
        lines.push(
          `📞 **Phone:** ${forChat(leadRecord.phone)}`,
          `🏢 **Organization:** ${forChat(leadRecord.organization)}`,
          `📋 **Requirement:** ${forChat(leadRecord.requirement).slice(0, 900)}`,
          `⏰ **Preferred Window:** ${leadRecord.preferredWindowLabel || leadRecord.preferredTime}`
        );
      } else {
        lines.push(
          `🏷️ **Role / Subject:** ${forChat(leadRecord.role)} / ${forChat(leadRecord.subject)}`,
          `💬 **Message:** ${forChat(leadRecord.message).slice(0, 1200)}`
        );
      }
      lines.push(`🕒 **Received:** ${dateIST}, ${timeIST}`);
      const summaryText = lines.join("\n");
      try {
        const r = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: summaryText, text: summaryText, allowed_mentions: { parse: [] } }),
        });
        results.push(r.ok);
        if (!r.ok) console.error("Webhook responded with", r.status);
      } catch (err) {
        results.push(false);
        console.error("Webhook error:", err);
      }
    }

    if (googleScriptUrl) {
      try {
        const r = await fetch(googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadRecord),
          redirect: "follow",
        });
        const ok = r.ok || r.status === 302;
        results.push(ok);
        if (!ok) console.error("Google Script responded with", r.status);
      } catch (err) {
        results.push(false);
        console.error("Google Script error:", err);
      }
    }

    // In production with no working channel, the lead would vanish. Say so instead of lying.
    if (process.env.NODE_ENV === "production" && !results.some(Boolean)) {
      console.error("LEAD NOT DELIVERED (no notification channel succeeded):", JSON.stringify(leadRecord));
      return fail(502, "We couldn't submit your request right now. Please email info@kplor.com.");
    }

    return NextResponse.json({ success: true, message: "Lead received" });
  } catch (error) {
    console.error("Contact API Error:", error instanceof Error ? error.message : error);
    return fail(500, "Something went wrong. Please try again or email info@kplor.com.");
  }
}
