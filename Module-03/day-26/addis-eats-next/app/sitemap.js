const siteUrl = (
  process.env.SITE_URL || "https://addiseats.et"
).replace(/\/$/, "");

export default function sitemap() {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/menu", priority: 0.8 },
    { path: "/menu/1", priority: 0.6 },
    { path: "/menu/2", priority: 0.6 },
    { path: "/menu/3", priority: 0.6 },
    { path: "/menu/4", priority: 0.6 },
    { path: "/menu/5", priority: 0.6 },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    priority: route.priority,
  }));
}
