import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PALETTE } from "../configs/app";
import {
  faGraduationCap,
  faLeaf,
  faRug,
  faBasketShopping,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";

const infoCards = [
  {
    icon: faGraduationCap, // Perfect for TVET/Education programs
    title: "TVET Program",
    description:
      "Offers hands-on training in coffee service, front office, housekeeping, and dairy production, equipping women with practical, industry-ready skills to build meaningful careers and contribute to thriving communities.",
  },
  {
    icon: faLeaf, // Represents leather (natural material) and craftsmanship
    title: "Leather Work",
    description:
      "The newest addition at the center, this program equips women with the skills to craft high-quality leather goods that combine style and durability, opening pathways for sustainable livelihoods.",
  },
  {
    icon: faRug, // Perfect representation for carpet weaving
    title: "Carpet Weaving",
    description:
      "Focused on advanced handweaving techniques, this program blends traditional craftsmanship with contemporary design, providing artisans with a stable source of income.",
  },
  {
    icon: faBasketShopping, // Represents baskets and handmade crafts
    title: "Handcrafts",
    description:
      "Women carry on the legacy of Rwandan basket weaving and Imigongo art, transforming cultural heritage into beautiful interior design pieces.",
  },

  {
    icon: faShirt, // Perfect for tailoring and clothing creation
    title: "Tailoring",
    description:
      "Trains women to create clothing, accessories, and custom items, supporting them to achieve financial independence through creative self-reliance.",
  },
];

function Programs() {
  return (
    <section
      id="programs"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {infoCards.map((card, index) => (
          <div key={card.title} className="w-full">
            <div
              className="group rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border h-full"
              style={{
                background: [
                  PALETTE.dutchWhite,
                  PALETTE.ashGray,
                  PALETTE.dun,
                  PALETTE.tiffanyBlue,
                  PALETTE.dutchWhite,
                ][index % 5],
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default Programs;
