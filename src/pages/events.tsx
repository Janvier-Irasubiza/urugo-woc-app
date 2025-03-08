import { useEffect, useState } from "react";
import App from "../layouts/app";
import axios from "axios";
import { Link } from "react-router-dom";

interface Post {
  title: string;
  short_desc: string;
  image: string;
  type: string;
  status: string;
  slug: string;
}
[];

function Events() {
  const [events, setEvents] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async (page = 1) => {
    if (page > totalPages) return;
    try {
      // Fetch data from API using axios
      const response = await axios.get(
        `http://localhost:8000/api/blog-posts/?type=event&page=${page}`
      );
      setEvents((prevEvents) => {
        const newEvents = response.data.results;
        const uniqueEvents = [...prevEvents, ...newEvents].reduce(
          (acc, event) => {
            if (!acc.some((item: Post) => item.title === event.title)) {
              acc.push(event);
            }
            return acc;
          },
          [] as Post[]
        );

        return uniqueEvents;
      });

      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, []);

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

  const happeningNow = events.filter((event) => event.status === "happening");
  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const archivedEvents = events.filter((event) => event.status === "archived");

  return (
    <App>
      <div className="px-4 md:px-20 py-4 md:py-10 space-y-10">
        {happeningNow && happeningNow.length > 0 && (
          <section>
            <h1 className="mb-4 text-3xl font-bold text-primary">
              Happening Now
            </h1>
            {happeningNow.map((event, index) => (
              <Link to={`/events/${event.slug}`}>
                <div
                  key={index}
                  className="border w-full md:h-[352px] rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center"
                >
                  <img src={event.image} alt="" />
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Events Section */}
        {upcomingEvents && upcomingEvents.length > 0 && (
          <section className="">
            <h2 className="text-3xl font-bold text-primary mb-6">Upcoming</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{event.short_desc}</p>
                    <Link
                      to={`/atl/${event.slug}`}
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

        {/* Archive Section */}
        {archivedEvents && archivedEvents.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-6">Archive</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
              {archivedEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 text-2xl text-primary-dark">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{event.short_desc}</p>
                    <Link
                      to={`/atl/${event.slug}`}
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

export default Events;
