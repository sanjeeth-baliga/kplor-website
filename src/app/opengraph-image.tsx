// src/app/opengraph-image.tsx
//
// The picture that appears when kplor.com is shared on WhatsApp, LinkedIn,
// Slack, X etc. Generated automatically at 1200x630. To use your own design
// instead, delete this file and put a 1200x630 "opengraph-image.png" in src/app/.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Kplor: Turn text and manuals into AI explainer videos for learning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "Kplor_logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #2862ad 0%, #092c5b 55%, #032859 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#00FFFF", letterSpacing: 2 }}>KPLOR</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, marginTop: 24 }}>
            Turn text and manuals into explainer videos for learning
          </div>
          <div style={{ fontSize: 30, marginTop: 28, color: "#cfe3ff" }}>
            AI-powered, LMS-ready, built on instructional design
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={260} height={260} alt="" style={{ borderRadius: 48 }} />
      </div>
    ),
    { ...size }
  );
}
