import { useEffect, useMemo } from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product" | "event";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: number;
  currency?: string;
  availability?: "in stock" | "out of stock" | "preorder";
  brand?: string;
  category?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultSEO: Required<SEOProps> = {
  title: "Urugo WOC - Empowering Women and Building Communities",
  description:
    "Urugo WOC is dedicated to empowering women and building stronger communities across Rwanda through innovative programs, cultural experiences, and sustainable development initiatives.",
  keywords:
    "women economic support, Rwanda, community development, cultural experiences, dining, marketplace, events, Urugo WOC",
  image: "/src/assets/urugo.svg",
  url: "",
  type: "website",
  author: "Urugo WOC",
  publishedTime: "",
  modifiedTime: "",
  section: "",
  tags: [],
  price: 0,
  currency: "RWF",
  availability: "in stock",
  brand: "Urugo WOC",
  category: "",
  noindex: false,
  nofollow: false,
};

export const useSEO = (seoProps: SEOProps = {}) => {
  const seo = useMemo(() => ({ ...defaultSEO, ...seoProps }), [seoProps]);

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      property?: boolean
    ) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", seo.description);
    updateMetaTag("keywords", seo.keywords);
    updateMetaTag("author", seo.author);

    // Open Graph tags
    updateMetaTag("og:title", seo.title, true);
    updateMetaTag("og:description", seo.description, true);
    updateMetaTag("og:image", seo.image, true);
    updateMetaTag("og:url", seo.url, true);
    updateMetaTag("og:type", seo.type, true);
    updateMetaTag("og:site_name", "Urugo WOC", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
    updateMetaTag("twitter:image", seo.image);

    // Article specific tags
    if (seo.type === "article") {
      if (seo.publishedTime)
        updateMetaTag("article:published_time", seo.publishedTime, true);
      if (seo.modifiedTime)
        updateMetaTag("article:modified_time", seo.modifiedTime, true);
      if (seo.author) updateMetaTag("article:author", seo.author, true);
      if (seo.section) updateMetaTag("article:section", seo.section, true);
      if (seo.tags.length > 0) {
        seo.tags.forEach((tag) => {
          updateMetaTag("article:tag", tag, true);
        });
      }
    }

    // Product specific tags
    if (seo.type === "product") {
      if (seo.price)
        updateMetaTag("product:price:amount", seo.price.toString(), true);
      if (seo.currency)
        updateMetaTag("product:price:currency", seo.currency, true);
      if (seo.availability)
        updateMetaTag("product:availability", seo.availability, true);
      if (seo.brand) updateMetaTag("product:brand", seo.brand, true);
      if (seo.category) updateMetaTag("product:category", seo.category, true);
    }

    // Robots meta tag
    const robotsContent = [
      seo.noindex ? "noindex" : "index",
      seo.nofollow ? "nofollow" : "follow",
    ].join(", ");
    updateMetaTag("robots", robotsContent);

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", seo.url);
  }, [seo]);

  return seo;
};

// Structured Data Generator
export const generateStructuredData = (
  type: "Organization" | "WebSite" | "Article" | "Product" | "Event",
  data: Record<string, unknown>
) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  // Add to page
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);

  // Remove existing structured data of same type
  const existingScript = document.querySelector(
    `script[data-schema-type="${type}"]`
  );
  if (existingScript) {
    existingScript.remove();
  }

  script.setAttribute("data-schema-type", type);
  document.head.appendChild(script);
};

// Organization structured data
export const organizationStructuredData = {
  name: "Urugo WOC",
  description:
    "Empowering women and building stronger communities across Rwanda",
  url: typeof window !== "undefined" ? window.location.origin : "",
  logo:
    typeof window !== "undefined"
      ? `${window.location.origin}/src/assets/urugo.svg`
      : "",
  sameAs: [
    // Add social media URLs here
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+250-XXX-XXXX",
    contactType: "customer service",
    areaServed: "RW",
    availableLanguage: ["English", "Kinyarwanda"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "RW",
    addressRegion: "Kigali",
  },
};

// Website structured data
export const websiteStructuredData = {
  name: "Urugo WOC",
  description:
    "Empowering women and building stronger communities across Rwanda",
  url: typeof window !== "undefined" ? window.location.origin : "",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        typeof window !== "undefined"
          ? `${window.location.origin}/marketplace?search={search_term_string}`
          : "",
    },
    "query-input": "required name=search_term_string",
  },
};
