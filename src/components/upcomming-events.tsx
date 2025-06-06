import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../configs/configs";
import { Link } from "react-router-dom";

interface Event {
  title: string;
  slug: string;
  short_desc: string;
  poster: string;
}

function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isVisible, setIsVisible] = useState({
    events: false,
  });
  const sectionRef = useRef<HTMLElement>(null);

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BLOG_POSTS}/?type=event&status=upcoming`
      );
      setEvents(response.data.results);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible({ events: true });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Events Section */}
      {events && (
        <section
          ref={sectionRef}
          id="events"
          data-animate
          className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transform transition-all duration-1000 ${
            isVisible.events
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-primary mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Join us in our upcoming programs and workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.poster}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {event.short_desc.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/atl/${event.slug}`}
                    className="text-primary font-semibold hover:text-primary-dark transition-colors group-hover:translate-x-2 transform duration-300"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default UpcomingEvents;
