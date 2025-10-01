import { useEffect, useState } from "react";
import App from "../layouts/app";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../configs/configs";

interface Accommodation {
  image: string;
  title: string;
  short_desc: string;
  type: string;
  active: boolean;
  available: boolean;
  time_frame: string;
  price: number;
  category: string;
  slug: string;
}

function Accommodations() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAccommodations = async (page = 1) => {
    if (page > totalPages) return;
    try {
      // Fetch data from API using axios
      const response = await axios.get(
        `${API_ENDPOINTS.LISTINGS}/?type=accommodation&page=${page}`
      );
      setAccommodations((prevAccommodations) => {
        const newAccommodations = response.data.results;
        const uniqueAccommodations = [
          ...prevAccommodations,
          ...newAccommodations,
        ].reduce((acc, accommodation) => {
          if (
            !acc.some(
              (item: Accommodation) => item.title === accommodation.title
            )
          ) {
            acc.push(accommodation);
          }
          return acc;
        }, [] as Accommodation[]);

        return uniqueAccommodations;
      });

      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccommodations(currentPage);
  }, []);

  const familyRooms = accommodations.filter(
    (accommodation) => accommodation.category === "family"
  );
  const coupleRooms = accommodations.filter(
    (accommodation) => accommodation.category === "couple"
  );
  const singleRooms = accommodations.filter(
    (accommodation) => accommodation.category === "single"
  );
  const generalRooms = accommodations.filter(
    (accommodation) => accommodation.category === "general"
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

  return (
    <App>
      <div id="accommodations" className="px-4 md:px-20 md:py-16 space-y-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Room Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse selection of accommodations, each
            thoughtfully designed to provide the perfect stay for your needs
          </p>
        </div>

        {/* Accommodations Section */}
        {familyRooms && familyRooms.length > 0 && (
          <section className="">
            <h3 className="text-3xl font-bold text-primary mb-8 flex items-center">
              Family Rooms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {familyRooms.map((accom, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={accom.image}
                    alt={accom.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {accom.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{accom.short_desc}</p>
                    <Link
                      to={`/itm/${accom.slug}`}
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

        {coupleRooms && coupleRooms.length > 0 && (
          <section className="mb-20">
            <h3 className="text-3xl font-bold text-primary mb-8 flex items-center">
              Couple Rooms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {coupleRooms.map((accom, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={accom.image}
                    alt={accom.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {accom.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{accom.short_desc}</p>
                    <Link
                      to={`/itm/${accom.slug}`}
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

        {singleRooms && singleRooms.length > 0 && (
          <section className="mb-20">
            <h3 className="text-3xl font-bold text-primary mb-8 flex items-center">
              Single Rooms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {singleRooms.map((accom, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={accom.image}
                    alt={accom.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {accom.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{accom.short_desc}</p>
                    <Link
                      to={`/itm/${accom.slug}`}
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

        {generalRooms && generalRooms.length > 0 && (
          <section className="mb-20">
            <h3 className="text-3xl font-bold text-primary mb-8 flex items-center">
              General
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {generalRooms.map((accom, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={accom.image}
                    alt={accom.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {accom.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{accom.short_desc}</p>
                    <Link
                      to={`/itm/${accom.slug}`}
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

export default Accommodations;
