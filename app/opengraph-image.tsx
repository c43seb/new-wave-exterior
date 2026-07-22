import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0f1d26",
        }}
      >
        <svg width="90" height="90" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 32 }}>
          <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="#5fa0e6" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 800, color: "#ffffff", letterSpacing: -1 }}>
          New Wave <span style={{ color: "#5fa0e6", marginLeft: 20 }}>Exterior</span>
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#9fb3be" }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 26, color: "#5fa0e6" }}>
          Window Cleaning &middot; Screen Cleaning &middot; Pressure Washing
        </div>
      </div>
    ),
    { ...size }
  );
}
