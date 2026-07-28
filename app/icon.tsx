import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
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
