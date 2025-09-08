import { useEffect } from "react";
import { SEOProps } from "../utils/seo";

interface SEOHeadProps extends SEOProps {
  children?: React.ReactNode;
}

// SEO Head component for additional meta tags and structured data (React 19 compatible)
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  price,
  currency = "RWF",
  availability = "in stock",
  brand = "Urugo WOC",
  category,
  noindex = false,
  nofollow = false,
  children,
}) => {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const currentImage = image || `${baseUrl}/src/assets/urugo.svg`;

  // Generate structured data based on type
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type":
        type === "article"
          ? "Article"
          : type === "product"
          ? "Product"
          : "WebPage",
      name: title,
      description: description,
      url: currentUrl,
      image: currentImage,
      publisher: {
        "@type": "Organization",
        name: "Urugo WOC",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/src/assets/urugo.svg`,
        },
      },
    };

    if (type === "article") {
      return {
        ...baseData,
        "@type": "Article",
        headline: title,
        author: {
          "@type": "Person",
          name: author || "Urugo WOC",
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        articleSection: section,
        keywords: tags.join(", "),
      };
    }

    if (type === "product") {
      return {
        ...baseData,
        "@type": "Product",
        brand: {
          "@type": "Brand",
          name: brand,
        },
        category: category,
        offers: {
          "@type": "Offer",
          price: price,
          priceCurrency: currency,
          availability: `https://schema.org/${availability.replace(" ", "")}`,
        },
      };
    }

    return baseData;
  };

  const robotsContent = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
  ].join(", ");

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
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

    // Basic Meta Tags
    if (description) updateMetaTag("description", description);
    if (keywords) updateMetaTag("keywords", keywords);
    if (author) updateMetaTag("author", author);
    updateMetaTag("robots", robotsContent);

    // Open Graph Tags
    updateMetaTag("og:type", type, true);
    if (title) updateMetaTag("og:title", title, true);
    if (description) updateMetaTag("og:description", description, true);
    if (currentImage) updateMetaTag("og:image", currentImage, true);
    if (currentUrl) updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:site_name", "Urugo WOC", true);

    // Twitter Card Tags
    updateMetaTag("twitter:card", "summary_large_image");
    if (title) updateMetaTag("twitter:title", title);
    if (description) updateMetaTag("twitter:description", description);
    if (currentImage) updateMetaTag("twitter:image", currentImage);

    // Article Specific Tags
    if (type === "article") {
      if (publishedTime)
        updateMetaTag("article:published_time", publishedTime, true);
      if (modifiedTime)
        updateMetaTag("article:modified_time", modifiedTime, true);
      if (author) updateMetaTag("article:author", author, true);
      if (section) updateMetaTag("article:section", section, true);
      tags.forEach((tag) => {
        updateMetaTag("article:tag", tag, true);
      });
    }

    // Product Specific Tags
    if (type === "product") {
      if (price) updateMetaTag("product:price:amount", price.toString(), true);
      if (currency) updateMetaTag("product:price:currency", currency, true);
      if (availability)
        updateMetaTag("product:availability", availability, true);
      if (brand) updateMetaTag("product:brand", brand, true);
      if (category) updateMetaTag("product:category", category, true);
    }

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    if (currentUrl) canonical.setAttribute("href", currentUrl);

    // Structured Data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(generateStructuredData());

    // Remove existing structured data of same type
    const existingScript = document.querySelector(
      `script[data-schema-type="${type}"]`
    );
    if (existingScript) {
      existingScript.remove();
    }

    script.setAttribute("data-schema-type", type);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the structured data script on unmount
      const scriptToRemove = document.querySelector(
        `script[data-schema-type="${type}"]`
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    price,
    currency,
    availability,
    brand,
    category,
    noindex,
    nofollow,
    currentUrl,
    currentImage,
    robotsContent,
  ]);

  return <>{children}</>;
};

export default SEOHead;
