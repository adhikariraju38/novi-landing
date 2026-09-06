import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Novi, run your team without the tab switching";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fbfaf8",
        padding: 72,
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 15,
            background: "#4119f4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 30,
          }}
        >
          N
        </div>
        <div style={{ fontSize: 40, color: "#14131a" }}>Novi</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 78, color: "#14131a", lineHeight: 1.05, letterSpacing: -2 }}>
          Run your team without
        </div>
        <div style={{ fontSize: 78, color: "#4119f4", lineHeight: 1.05, letterSpacing: -2 }}>
          the tab switching.
        </div>
      </div>

      <div style={{ fontSize: 27, color: "#5c5866", fontFamily: "Helvetica, sans-serif" }}>
        Tasks, docs, and conversations in one calm workspace.
      </div>
    </div>,
    size,
  );
}
