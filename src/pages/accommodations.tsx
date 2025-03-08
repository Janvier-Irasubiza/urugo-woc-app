import { useEffect, useState } from "react";
import App from "../layouts/app";
import axios from "axios";
import { Link } from "react-router-dom";

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
        `http://localhost:8000/api/listings/?type=accommodation&page=${page}`
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
      <div className="px-4 md:px-20 md:py-10 space-y-10">
        {/* Accommodations Section */}
        {familyRooms && familyRooms.length > 0 && (
          <section className="">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Family Rooms
            </h2>
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
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-6">Couple</h2>
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
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-6">Single</h2>
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
      </div>
    </App>
  );
}

export default Accommodations;
