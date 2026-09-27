import { ImageResponse } from "next/og"; // Edge-compatible OG image (works on Vercel + `next start`)

export const alt = "Ashiqur Rahman Bhuiyan — AI & Cyber Security portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Neon cyberpunk cover card rendered at build/request time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#05060A",
          color: "#E8ECF8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* neon edge glow bars */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "linear-gradient(90deg,#00F0FF,#7C5CFF,#FF2D95)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#00F0FF" }}>
            {"// ASHIQ0X — 0x Portfolio"}
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
            {"ASHIQUR RAHMAN"}
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#FF2D95" }}>
            {"BHUIYAN"}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#8A93B2", marginTop: 8 }}>
            {"Bug Bounty Hunter · Full-Stack Developer · AI & Cyber Security"}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", fontSize: 24, color: "#FFD166" }}>{"Vice President — Cyber Security Club"}</div>
            <div style={{ display: "flex", fontSize: 22, color: "#8A93B2" }}>{"Uttara University · Dhaka, Bangladesh"}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "2px solid #00F0FF",
              borderRadius: 999,
              padding: "12px 26px",
              fontSize: 22,
              color: "#00F0FF",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#3BFF6E" }} />
            {"AVAILABLE FOR WORK"}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
