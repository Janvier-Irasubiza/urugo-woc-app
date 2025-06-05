import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ABT_ENDPOINTS } from "../configs/configs";

interface Testimonial {
  image: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

function Testimonials() {
  const [isVisible, setIsVisible] = useState({ testimonials: false });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const getTestimonials = async () => {
    try {
      const response = await axios.get(ABT_ENDPOINTS.TESTIMONIALS);
      setTestimonials(response.data.results);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  // Add intersection observer to handle visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible({ testimonials: true });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const section = document.getElementById("testimonials");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="testimonials"
      data-animate
      className={`py-20 bg-gradient-to-br from-gray-50 to-emerald-50 transform transition-all duration-1000 ${
        isVisible.testimonials
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-primary mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            Hear from the women whose lives have been transformed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="text-primary text-2xl mb-4"
                />
                <p className="text-gray-600 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
