
import { ImageResponse } from "next/og";

export const alt = "Addis Eats — Ethiopian food delivery";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A1F3D",
          color: "#FFFFFF",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 38,
            color: "#F4C95D",
            marginBottom: 24,
          }}
        >
          ETHIOPIAN FOOD DELIVERY
        </div>

        <div style={{ fontSize: 88, fontWeight: 700 }}>
          Addis Eats
        </div>

        <div style={{ fontSize: 32, marginTop: 28 }}>
          Your favourites. Delivered across Addis Ababa.
        </div>
      </div>
    ),
    size
  );
}
