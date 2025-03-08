import { ShoppingCartIcon, StarIcon, TagIcon } from "@heroicons/react/24/solid";
import App from "../layouts/app";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
  available_stock: number;
  rating: number;
  type: string;
  time_frame?: string;
}

function ProductInfo() {
  const { slug } = useParams();
  const [productDetails, setProductDetails] = useState<Product>({} as Product);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/listings/${slug}/`
      );
      console.log(response.data);
      setProductDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [slug]);

  return (
    <>
      <App>
        <div className="px-6 py-6 max-w-6xl mx-auto space-y-10">
          {/* Product Title & Image Gallery */}

          <div className="text-sm text-gray-500">
            Home /{" "}
            {productDetails.type === "product"
              ? "Marketplace"
              : "Accommodations"}
            / {productDetails.title}
          </div>

          <div className="">
            <h1 className="text-4xl font-bold text-gray-800">
              {productDetails.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* image */}
              <img
                src={productDetails.image}
                className="rounded-xl object-cover w-full h-64 shadow-lg hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Section - Details */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Details</h2>
              <p className="text-gray-600">{productDetails.description}</p>

              <div className="flex items-center space-x-2 text-gray-500">
                <TagIcon className="h-6 w-6 text-secondary" />
                <span>{productDetails.category}</span>
              </div>

              <div className="flex items-center space-x-2 text-yellow-500">
                <StarIcon className="h-5 w-5" />
                <span>{productDetails.rating} / 5.0</span>
              </div>

              <div className="text-sm text-gray-400">
                <span>
                  {productDetails.available_stock > 0
                    ? `${productDetails.available_stock} in stock`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Right Section - Purchase Form */}
            {productDetails.type === "product" ? (
              <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-lg space-y-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Purchase This Product
                </h2>
                <p className="text-3xl font-bold text-secondary">
                  ${productDetails.price}
                </p>

                {/* Purchase Form */}
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={productDetails.available_stock}
                      className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                      disabled={productDetails.available_stock === 0}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg btn-primary text-white transition"
                    disabled={productDetails.available_stock === 0}
                  >
                    <ShoppingCartIcon className="h-5 w-5 inline-block mr-2" />
                    Add to Cart
                  </button>
                </form>
              </div>
            ) : (
              <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-lg space-y-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Book This Accommodation
                </h2>
                <p className="text-3xl font-bold text-secondary">
                  {productDetails.price} Rwf
                  <span className="text-sm font-normal text-gray-500">
                    /{productDetails.time_frame}
                  </span>
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg btn-primary text-white transition"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </App>
    </>
  );
}

export default ProductInfo;
