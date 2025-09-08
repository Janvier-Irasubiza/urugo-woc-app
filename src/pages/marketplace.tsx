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

function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Product");
  const [products, setProducts] = useState<Marketplace[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // SEO Configuration
  useSEO({
    title: "Marketplace - Products & Accommodations | Urugo WOC",
    description: "Shop authentic Rwandan products and find accommodations at Urugo WOC marketplace. Support women entrepreneurs and discover unique local items.",
    keywords: "Rwandan products, marketplace, accommodations Rwanda, women entrepreneurs, local products, Urugo WOC shop",
    url: window.location.href,
    type: "website"
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

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts(1, true);
  };

  // Handle initial load and category changes
  useEffect(() => {
    handleSearch();
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
      generateStructuredData('Organization', {
        name: 'Urugo WOC Marketplace',
        description: 'Authentic Rwandan products and accommodations marketplace',
        url: window.location.href,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Urugo WOC Products',
          itemListElement: products.map((product, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Product',
              name: product.title,
              description: product.short_desc,
              image: product.image,
              category: product.category
            },
            price: product.price,
            priceCurrency: 'RWF',
            availability: 'https://schema.org/InStock'
          }))
        }
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
      </div>
    </App>
  );
}

export default Marketplace;
