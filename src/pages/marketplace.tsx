import { useEffect, useState } from "react";
import App from "../layouts/app";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";

interface Marketplace {
  image: string;
  title: string;
  price: number;
  category: string;
  slug: string;
}

function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Product");
  const [products, setProducts] = useState<Marketplace[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1, reset = false) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/listings/?type=${category.toLowerCase()}&page=${page}&search=${searchQuery}`
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

  return (
    <App>
      <div className="px-4 md:px-20 md:py-10 space-y-10">
        {/* Search Section */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center space-x-4 border-2 border-orange-400 rounded-full px-4 py-2 w-full md:w-1/2">
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
                    <p className="font-medium mb-2 text-gray-700">
                      ${product.price}
                    </p>
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
