import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PALETTE } from "../configs/app";
import Footer from "../partials/footer";
import Nav from "../partials/nav";
import { Link } from "react-router-dom";
import Partners from "../components/partners";
import Testimonials from "../components/testimonials";
import Gallery from "../components/gallery";
import Modal from "../components/modal";
import Auth from "../partials/auth/auth";
import Donation from "../partials/donation";
import Slider from "../components/slider";
import Videos from "../components/videos";
import Programs from "../components/programs";
import ImpactStats from "../components/impact-stats";
import Featured from "../components/featured";
import UpcommingEvents from "../components/upcomming-events";
import {
  useSEO,
  generateStructuredData,
  websiteStructuredData,
} from "../utils/seo";

// Add type definition for isVisible state
type VisibilityState = {
  stats?: boolean;
  programs?: boolean;
  impact?: boolean;
  gallery?: boolean;
  testimonials?: boolean;
  events?: boolean;
  partners?: boolean;
  newsletter?: boolean;
  "final-cta"?: boolean;
};

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [activeModalComp, setActiveModalComp] = useState<"auth" | "donation">(
    "auth"
  );

  // SEO Configuration
  useSEO({
    title: "Urugo WOC - Empowering Women and Building Communities in Rwanda",
    description:
      "Join Urugo WOC in transforming lives through women economic support, cultural experiences, and community development. Discover our programs, events, dining experiences, and marketplace.",
    keywords:
      "women economic support Rwanda, community development, cultural experiences, dining Rwanda, marketplace, events, Urugo WOC, women's organization",
    url: window.location.href,
    type: "website",
  });

  const openModal = (type: "auth" | "donation") => {
    setIsModalOpen(true);
    setActiveModalComp(type);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Add Website structured data
  useEffect(() => {
    generateStructuredData("WebSite", websiteStructuredData);
  }, []);

  const renderModalContent = () => {
    switch (activeModalComp) {
      case "auth":
        return <Auth />;
      case "donation":
        return <Donation />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: PALETTE.seasalt }}>
      {/* Navigation Bar */}
      <Nav />

      <div className="">
        <Slider />

        <ImpactStats />

        <Programs />

        <Featured />

        <Videos />

        <Gallery />

        <Testimonials />

        <UpcommingEvents />

        <Partners />

        {/* Newsletter Section */}
        <section
          id="newsletter"
          data-animate
          className={`py-20 relative overflow-hidden transform transition-all duration-1000 ${
            isVisible.newsletter
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{ background: PALETTE.dutchWhite }}
        >
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Stay Connected
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get updates on our programs, success stories, and ways you can
              make a difference in women's lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-white/25 focus:outline-none text-gray-800"
              />
              <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Final Call to Action Section */}
        <section
          id="final-cta"
          data-animate
          className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible["final-cta"]
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-primary mb-6">
                Transform Lives Today
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Every contribution, no matter the size, creates ripple effects
                of positive change. Join us in empowering women and building
                stronger communities across Rwanda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => openModal("donation")}
                  className="bg-primary text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  Donate Now
                  <FontAwesomeIcon icon={faHeart} className="ml-2" />
                </button>
                <Link
                  to="/about"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors text-lg"
                >
                  Learn More About Our Impact
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
}

export default Index;
