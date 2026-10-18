const siteUrl = (
  process.env.SITE_URL || "https://addiseats.et"
).replace(/\/$/, "");

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cart",
        "/checkout",
        "/orders",
        "/kitchen",
        "/signin",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
