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
        <svg width="128" height="128" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 17c4 0 4-9 12-9 4 0 5 3 3 5"
            stroke="#5fa0e6"
            strokeWidth="4.6"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="19" cy="13" r="2.4" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
