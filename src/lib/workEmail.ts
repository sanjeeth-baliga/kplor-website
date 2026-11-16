// src/lib/workEmail.ts
// Single source of truth for "is this a genuine work/institution email?".
// Used by BOTH the callback form (browser) and /api/contact (server), so
// someone can't bypass the form by posting directly to the API.

const BLOCKED_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "yahoo.co.uk",
  "ymail.com", "rocketmail.com", "hotmail.com", "outlook.com", "live.com",
  "msn.com", "icloud.com", "me.com", "mac.com", "aol.com", "aim.com",
  "proton.me", "protonmail.com", "zoho.com", "mail.com", "email.com",
  "gmx.com", "gmx.net", "yandex.com", "yandex.ru", "rediffmail.com",
  "tempmail.com", "10minutemail.com", "guerrillamail.com", "trashmail.com",
  "sharklasers.com", "test.com", "example.com",
]);

const BLOCKED_BASE_DOMAINS = new Set([
  "gmail", "googlemail", "yahoo", "ymail", "rocketmail", "hotmail",
  "outlook", "live", "msn", "icloud", "aol", "proton", "protonmail",
  "zoho", "mail", "gmx", "yandex", "rediffmail", "tempmail",
]);

const KEYBOARD_MASH_PATTERNS = [
  /asdf/i, /sdfg/i, /dfgh/i, /fghj/i, /ghjk/i, /hjkl/i,
  /qwer/i, /wert/i, /erty/i, /rtyu/i, /tyui/i, /uiop/i,
  /zxcv/i, /xcvb/i, /cvbn/i, /vbnm/i,
  /(.)\1{2,}/i,
];

const PERSONAL_MSG =
  "Please enter your work or institution email (personal domains like Gmail and Yahoo are not accepted).";
const GIBBERISH_MSG = "Please enter a valid company or institution email address.";

export function validateWorkEmail(email: string): { valid: boolean; message?: string } {
  if (!email || typeof email !== "string") {
    return { valid: false, message: "Work email is required." };
  }
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length > 254) return { valid: false, message: "Please enter a valid email address." };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return { valid: false, message: "Please enter a valid email address." };
  }

  const [localPart, domain] = trimmed.split("@");
  if (!domain || !localPart) return { valid: false, message: "Please enter a valid work email." };

  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-z]{2,24}$/i.test(tld)) {
    return { valid: false, message: "Please enter an email with a valid domain extension." };
  }

  const baseDomain = domainParts[0].toLowerCase();

  if (BLOCKED_DOMAINS.has(domain) || BLOCKED_BASE_DOMAINS.has(baseDomain)) {
    return { valid: false, message: PERSONAL_MSG };
  }
  for (const blocked of BLOCKED_DOMAINS) {
    if (domain.endsWith("." + blocked)) return { valid: false, message: PERSONAL_MSG };
  }

  const mainDomain = baseDomain.replace(/-/g, "");

  for (const pattern of KEYBOARD_MASH_PATTERNS) {
    if (pattern.test(mainDomain)) return { valid: false, message: GIBBERISH_MSG };
  }
  if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(mainDomain)) return { valid: false, message: GIBBERISH_MSG };

  const vowels = (mainDomain.match(/[aeiouy]/gi) || []).length;
  if (mainDomain.length >= 6) {
    if (vowels === 0) return { valid: false, message: GIBBERISH_MSG };
    if (mainDomain.length >= 9 && vowels / mainDomain.length < 0.15) {
      return { valid: false, message: GIBBERISH_MSG };
    }
  }

  if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(localPart)) {
    return { valid: false, message: "Please enter a valid work email address." };
  }

  return { valid: true };
}
