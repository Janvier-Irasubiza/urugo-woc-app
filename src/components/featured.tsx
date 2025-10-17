import empowering from "../assets/urugo-photo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faUsers,
  faLeaf,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "./modal";
import Auth from "../partials/auth/auth";
import Donation from "../partials/donation";

function Featured() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalComp, setActiveModalComp] = useState<"auth" | "donation">(
    "auth"
  );

  const [isVisible, setIsVisible] = useState({
    impact: false,
  });

  const openModal = (type: "auth" | "donation") => {
    setActiveModalComp(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible({ impact: true });
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("impact");
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {activeModalComp === "auth" ? <Auth /> : <Donation />}
      </Modal>

      {/* Featured Impact Section */}
      <section
        id="impact"
        data-animate
        className={`py-20 bg-gradient-to-br from-emerald-50 to-teal-50 transform transition-all duration-1000 ${
          isVisible.impact
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-20 blur-xl"></div>
              <img
                src={empowering}
                alt="Women economic support"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-primary">
                Creating Lasting Change
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your support helps create sustainable economic opportunities for
                women in rural Rwanda. Through education, skills training, and
                community support, we're building a brighter future.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-white text-lg"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Skills Training
                    </h4>
                    <p className="text-gray-600">
                      Vocational training in high-demand skills
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-white text-lg"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Community Support
                    </h4>
                    <p className="text-gray-600">
                      Building networks of support and mentorship
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faLeaf}
                      className="text-white text-lg"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Sustainable Development
                    </h4>
                    <p className="text-gray-600">
                      Environmentally conscious growth initiatives
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => openModal("donation")}
                className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Make a Difference
                <FontAwesomeIcon icon={faHeart} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Featured;
