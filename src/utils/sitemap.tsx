import { useEffect } from "react";

// Sitemap generation utility
export const generateSitemap = () => {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString().split("T")[0];

  const staticPages = [
    {
      url: "/",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: "/about",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/events",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/dining",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: "/marketplace",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.9",
    },
    {
      url: "/accommodations",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.7",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return sitemap;
};

// Robots.txt generator
export const generateRobotsTxt = () => {
  const baseUrl = window.location.origin;

  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /me/
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /
Allow: /about
Allow: /events
Allow: /dining
Allow: /marketplace
Allow: /accommodations`;
};

// Hook to add sitemap and robots.txt to the page
export const useSitemap = () => {
  useEffect(() => {
    // Add robots.txt meta tag
    const robotsMeta = document.createElement("meta");
    robotsMeta.name = "robots";
    robotsMeta.content = "index, follow";
    document.head.appendChild(robotsMeta);

    // Add canonical URL
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = window.location.href;
    document.head.appendChild(canonical);

    return () => {
      // Cleanup on unmount
      const existingRobots = document.querySelector('meta[name="robots"]');
      const existingCanonical = document.querySelector('link[rel="canonical"]');

      if (existingRobots) existingRobots.remove();
      if (existingCanonical) existingCanonical.remove();
    };
  }, []);
};

// Function to create and download sitemap
export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sitemap.xml";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to create and download robots.txt
export const downloadRobotsTxt = () => {
  const robotsTxt = generateRobotsTxt();
  const blob = new Blob([robotsTxt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "robots.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
