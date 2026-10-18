
import { ImageResponse } from "next/og";

export const alt = "Ethiopian dish and price from Addis Eats";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const dishes = {
  "1": { name: "Doro Wot", price: 350 },
  "2": { name: "Shiro Wot", price: 220 },
  "3": { name: "Tibs", price: 320 },
  "4": { name: "Beyaynetu", price: 280 },
  "5": { name: "Kitfo", price: 400 },
};

export default async function Image({ params }) {
  const { id } = await params;
  const dish = dishes[id] || {
    name: "Ethiopian Dish",
    price: null,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A1F3D",
          color: "#FFFFFF",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: "#F4C95D",
            marginBottom: 25,
          }}
        >
          ADDIS EATS · ETHIOPIAN FOOD
        </div>

        <div style={{ fontSize: 88, fontWeight: 700 }}>
          {dish.name}
        </div>

        {dish.price !== null && (
          <div style={{ fontSize: 48, marginTop: 24 }}>
            {dish.price} ETB
          </div>
        )}

        <div style={{ fontSize: 28, marginTop: 35 }}>
          Ethiopian favourites in Addis Ababa
        </div>
      </div>
    ),
    size
  );
}
