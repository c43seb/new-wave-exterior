import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1d26",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
            stroke="#5fa0e6"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
