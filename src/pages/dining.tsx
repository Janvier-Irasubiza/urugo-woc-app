import { useEffect, useState } from "react";
import App from "../layouts/app";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../configs/configs";
import { useSEO, generateStructuredData } from "../utils/seo";

interface Dining {
  image: string;
  title: string;
  short_desc: string;
  category: string;
  location: string;
  slug: string;
}

function Dining() {
  const [Dining, setDining] = useState<Dining[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // SEO Configuration
  useSEO({
    title: "Dining Experiences - African & Kinyarwanda Cuisine | Urugo WOC",
    description:
      "Discover authentic African and Kinyarwanda dining experiences at Urugo WOC. Experience traditional Rwandan cuisine, African dishes, and cultural dining traditions.",
    keywords:
      "Rwandan cuisine, African food, Kinyarwanda dishes, traditional dining Rwanda, cultural food experiences, Urugo WOC dining",
    url: window.location.href,
    type: "website",
  });

  const fetchDinings = async (page = 1) => {
    if (page > totalPages) return;
    try {
      // Fetch data from API using axios
      const response = await axios.get(`${API_ENDPOINTS.DINING}/?page=${page}`);
      setDining((prevDinings) => {
        const newDinings = response.data.results;
        const uniqueDinings = [...prevDinings, ...newDinings].reduce(
          (acc, dining) => {
            if (!acc.some((item: Dining) => item.title === dining.title)) {
              acc.push(dining);
            }
            return acc;
          },
          [] as Dining[]
        );

        return uniqueDinings;
      });

      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDinings(currentPage);
  }, [currentPage]);

  const AfricanDish = Dining.filter(
    (dining) => dining.category === "african_dish"
  );
  const KinyarwandaFood = Dining.filter(
    (dining) => dining.category === "kinyarwanda_dish"
  );
  const AfricanTradition = Dining.filter(
    (dining) => dining.category === "african_tradition"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add Dining structured data
  useEffect(() => {
    if (Dining.length > 0) {
      generateStructuredData("Organization", {
        name: "Urugo WOC Dining",
        description: "Authentic African and Kinyarwanda dining experiences",
        url: window.location.href,
        servesCuisine: ["African", "Kinyarwanda", "Rwandan"],
        hasMenu: Dining.map((dining) => ({
          "@type": "MenuItem",
          name: dining.title,
          description: dining.short_desc,
          image: dining.image,
          menuAddOn: {
            "@type": "MenuSection",
            name: dining.category,
          },
        })),
      });
    }
  }, [Dining]);

  return (
    <App>
      <div className="px-4 md:px-20 md:py-10 space-y-10">
        {/* Dining Section */}

        {AfricanDish && AfricanDish.length > 0 && (
          <section className="">
            <h2 className="text-3xl font-bold text-primary mb-6">
              African Dish
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {AfricanDish.map((dining, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={dining.image}
                    alt={dining.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {dining.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{dining.short_desc}</p>
                    <Link
                      to={`/dng/${dining.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Kinyarwanda Food Section */}
        {KinyarwandaFood && KinyarwandaFood.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Kinyarwanda Food
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {KinyarwandaFood.map((dining, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={dining.image}
                    alt={dining.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {dining.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{dining.short_desc}</p>
                    <Link
                      to={`/dng/${dining.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {AfricanTradition && AfricanTradition.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-6">
              African Tradition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {AfricanTradition.map((dining, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={dining.image}
                    alt={dining.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {dining.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{dining.short_desc}</p>
                    <Link
                      to={`/dng/${dining.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Read More
                    </Link>
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

export default Dining;
