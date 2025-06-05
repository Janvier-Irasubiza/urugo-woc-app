import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PALETTE } from "../configs/app";
import { useEffect, useState } from "react";
import {
  faHandHoldingHeart,
  faHome,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const infoCards = [
  {
    icon: faUsers,
    title: "Women's Opportunity Center",
    description:
      "A safe and welcoming space in Kayonza District where women learn, develop skills, and build sustainable livelihoods. We provide dedicated facilities for education, skill development, and community building.",
    highlight: "500+ Women Empowered",
  },
  {
    icon: faHome,
    title: "Urugo Eco-Lodge",
    description:
      "Experience meaningful hospitality in rural Rwanda. Our sustainable lodge offers comfortable accommodations while supporting community development and women's empowerment initiatives.",
    highlight: "Sustainable Tourism",
  },
  {
    icon: faHandHoldingHeart,
    title: "Men's Engagement Program",
    description:
      "Creating allies for gender equality through education and awareness. We engage men to support women's rights and create an inclusive environment for everyone to thrive.",
    highlight: "Community Partnership",
  },
];

function Programs() {
  const [isVisible, setIsVisible] = useState({
    programs: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible({ programs: true });
          }
        });
      },
      { threshold: 0.1 }
    );

    const programsSection = document.getElementById("programs");
    if (programsSection) {
      observer.observe(programsSection);
    }

    return () => {
      if (programsSection) {
        observer.unobserve(programsSection);
      }
    };
  }, []);

  return (
    <>
      {/* Programs Section */}
      <section
        id="programs"
        data-animate
        className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transform transition-all duration-1000 ${
          isVisible.programs
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-primary mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive programs designed to empower women and transform
            communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="group rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border"
              style={{
                background: [
                  PALETTE.dutchWhite,
                  PALETTE.ashGray,
                  PALETTE.dun,
                  PALETTE.tiffanyBlue,
                ][index % 4],
                color: PALETTE.brunswickGreen,
                borderColor: "#eee",
              }}
            >
              <div className="p-8">
                <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon
                    icon={card.icon}
                    className="text-2xl text-white"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Programs;
