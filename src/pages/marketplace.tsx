import { useEffect, useState } from "react";
import App from "../layouts/app";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import { API_ENDPOINTS } from "../configs/configs";
import { useSEO, generateStructuredData } from "../utils/seo";

interface Marketplace {
  image: string;
  title: string;
  price: number;
  category: string;
  slug: string;
  short_desc: string;
}

interface Document {
  id?: number | string;
  file_name?: string;
  file_type?: string;
  document_type?: string;
  description?: string;
  file?: string;
}

function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Product");
  const [products, setProducts] = useState<Marketplace[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [documents, setDocuments] = useState<Document[]>([]);

  // SEO Configuration
  useSEO({
    title: "Marketplace - Products & Accommodations | Urugo WOC",
    description:
      "Shop authentic Rwandan products and find accommodations at Urugo WOC marketplace. Support women entrepreneurs and discover unique local items.",
    keywords:
      "Rwandan products, marketplace, accommodations Rwanda, women entrepreneurs, local products, Urugo WOC shop",
    url: window.location.href,
    type: "website",
  });

  const fetchProducts = async (page = 1, reset = false) => {
    try {
      const response = await axios.get(
        `${
          API_ENDPOINTS.LISTINGS
        }/?type=${category.toLowerCase()}&page=${page}&search=${searchQuery}`
      );

      setProducts((prev) =>
        reset ? response.data.results : [...prev, ...response.data.results]
      );
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDocs = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.DOCUMENTS}/?visibility=public&document_type=marketplace`
      );
      setDocuments(response.data.results);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts(1, true);
  };

  // Handle initial load and category changes
  useEffect(() => {
    handleSearch();
    fetchDocs();
  }, [category]);

  // Handle infinite scroll
  useEffect(() => {
    if (currentPage === 1) return;
    fetchProducts(currentPage);
  }, [currentPage]);

  // Add scroll listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        currentPage < totalPages
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages]);

  // Add Marketplace structured data
  useEffect(() => {
    if (products.length > 0) {
      generateStructuredData("Organization", {
        name: "Urugo WOC Marketplace",
        description:
          "Authentic Rwandan products and accommodations marketplace",
        url: window.location.href,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Urugo WOC Products",
          itemListElement: products.map((product, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Product",
              name: product.title,
              description: product.short_desc,
              image: product.image,
              category: product.category,
            },
            price: product.price,
            priceCurrency: "RWF",
            availability: "https://schema.org/InStock",
          })),
        },
      });
    }
  }, [products]);

  return (
    <App>
      <div className="px-4 md:px-20 md:py-10 space-y-10">
        {/* Search Section */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center space-x-4 border-2 border-[#7B6828] rounded-full px-4 py-2 w-full md:w-1/2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-gray-700 p-4 rounded-full focus:outline-none hidden md:block"
            >
              <option>Product</option>
              <option>Accommodation</option>
            </select>
            <input
              type="text"
              placeholder={`Search in ${category}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-grow px-4 py-2 rounded-full border-none focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 btn-primary rounded-full text-white hover:bg-orange-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-lg">
            {products.map((product) => (
              <Link to={`/itm/${product.slug}`} key={product.slug}>
                <div className="bg-thrd-level rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-primary-dark">
                      {product.title}
                    </h3>
                    <p className="font-medium mb-2 text-gray-800">
                      {product.price} RWF
                    </p>

                    <p className="mb-4 text-gray-700">{product.short_desc}</p>

                    <div className="flex items-center space-x-4 justify-between">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle add to cart logic here
                        }}
                        className="btn-primary text-sm rounded-full text-white hover:bg-orange-600 transition px-6 py-2 font-medium flex items-center"
                      >
                        <ShoppingBagIcon className="h-5 w-5 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Marketplace Documents Section */}
        {documents.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl font-bold mb-4">Documents</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc, idx) => (
                <div
                  key={doc.id || idx}
                  className="bg-thrd-level rounded-xl shadow-lg p-6 flex items-center justify-between space-x-6 border border-primary hover:shadow-xl transition duration-200"
                >
                  <div className="flex items-center space-x-4">
                    {/* Document Icon */}
                    <svg
                      className="h-10 w-10 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 7V3a1 1 0 011-1h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1v-4"
                      />
                      <rect x="3" y="7" width="8" height="10" rx="2" />
                    </svg>
                    <div>
                      <span className="font-semibold text-lg text-primary-dark">
                        {doc.file_name || `Document ${idx + 1}`}
                      </span>
                      {/* Actual file type display from file_type field */}
                      <span className="ml-2 px-2 py-1 rounded bg-primary text-white text-xs font-semibold align-middle">
                        {doc.file_type && doc.file_type.toUpperCase()}
                      </span>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    {/* View Button for supported types */}
                    {(() => {
                      const ext = doc.file_type
                        ? doc.file_type.toLowerCase()
                        : "";
                      const viewable = [
                        "pdf",
                        "jpg",
                        "jpeg",
                        "png",
                        "gif",
                        "webp",
                      ].includes(ext);
                      if (viewable) {
                        return (
                          <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary px-5 py-2 rounded-lg shadow text-sm font-medium transition duration-150 flex items-center justify-center"
                          >
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View
                          </a>
                        );
                      }
                      return null;
                    })()}
                    {/* Download Button always shown */}
                    <a
                      href={doc.file}
                      download
                      className="btn-secondary px-5 py-2 rounded-lg shadow text-white border border-primary hover:bg-thrd-level transition duration-150 flex items-center justify-center"
                    >
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v2a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 10l5 5 5-5"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15V3"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </App>
  );
}

export default Marketplace;
