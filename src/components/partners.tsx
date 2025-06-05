import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../configs/configs";

interface Partner {
  logo: string;
  url: string;
}

function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isVisible, setIsVisible] = useState({ partners: false });

  const getPartners = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PARTNERS);
      setPartners(response.data.results);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  // Add intersection observer to handle visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible({ partners: true });
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("partners");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <>
      {partners && (
        <section
          id="partners"
          data-animate
          className={`py-20 bg-gradient-to-br from-emerald-50 to-teal-50 transform transition-all duration-1000 ${
            isVisible.partners
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-primary mb-4">
                Our Partners
              </h2>
              <p className="text-xl text-gray-600">
                Working together to create meaningful change
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-12">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img
                    src={partner.logo}
                    alt="Partner Logo"
                    className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Partners;
