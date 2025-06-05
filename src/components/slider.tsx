import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "./modal";
import Auth from "../partials/auth/auth";
import Donation from "../partials/donation";
import axios from "axios";
import { ABT_ENDPOINTS } from "../configs/configs";

interface Slider {
  image: string;
  title: string;
  subtitle: string;
  action: "join" | "donate" | "none";
  action_text: string;
}

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalComp, setActiveModalComp] = useState<
    "join" | "donate" | "none"
  >("none");
  const [sliders, setSliders] = useState<Slider[]>([]);

  const getSliders = async () => {
    try {
      const response = await axios.get(ABT_ENDPOINTS.SLIDERS);
      const typedSliders = response.data.results.map((slide: any) => ({
        ...slide,
        action: slide.action as "join" | "donate" | "none",
      }));
      setSliders(typedSliders);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setSliders([]);
    }
  };

  useEffect(() => {
    getSliders();
  }, []);

  const openModal = (action: "join" | "donate" | "none") => {
    setIsModalOpen(true);
    setActiveModalComp(action);
  };

  const nextSlide = () => {
    if (sliders.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }
  };

  const prevSlide = () => {
    if (sliders.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
    }
  };

  // Auto-advance slider
  useEffect(() => {
    if (sliders.length > 0) {
      const timer = setInterval(nextSlide, 6000);
      return () => clearInterval(timer);
    }
  }, [sliders]);

  const renderModalContent = () => {
    switch (activeModalComp) {
      case "join":
        return <Auth />;
      case "donate":
        return <Donation />;
      case "none":
        return null;
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {renderModalContent()}
        </Modal>
      )}
      {/* Hero Slider Section */}
      {sliders.length > 0 && (
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-100 scale-100">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src={sliders[currentSlide].image}
              alt={sliders[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
                  {sliders[currentSlide].title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
                  {sliders[currentSlide].subtitle}
                </p>
                <button
                  onClick={() => openModal(sliders[currentSlide].action)}
                  className="bg-primary text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-fade-in-up animation-delay-400"
                >
                  {sliders[currentSlide].action_text}
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-2xl text-white"
            />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-2xl text-white"
            />
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Slider;
