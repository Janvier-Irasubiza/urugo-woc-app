import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
  faUsers,
  faGraduationCap,
  faHandHoldingHeart,
  faLeaf,
  faHome,
  faArrowRight,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { PALETTE } from "../configs/app";
import Footer from "../partials/footer";
import Nav from "../partials/nav";
import { Link } from "react-router-dom";

// Mock data - replace with your actual API calls
const mockEvents = [
  {
    title: "Women's Leadership Workshop",
    slug: "womens-leadership-workshop",
    short_desc:
      "Join us for an intensive leadership development program designed to empower women in rural communities.",
    poster:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
    type: "event",
  },
  {
    title: "Skills Training Program",
    slug: "skills-training-program",
    short_desc:
      "Learn valuable vocational skills including tailoring, handicrafts, and digital literacy.",
    poster:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
    type: "event",
  },
];

const mockPartners = [
  { logo: "https://via.placeholder.com/120x60?text=Partner+1", url: "#" },
  { logo: "https://via.placeholder.com/120x60?text=Partner+2", url: "#" },
  { logo: "https://via.placeholder.com/120x60?text=Partner+3", url: "#" },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  // Mock states - replace with your actual state management
  const [events] = useState(mockEvents);
  const [partners] = useState(mockPartners);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Enhanced content with better structure
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

  const sliderImages = [
    {
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop",
      title: "Empower Women, Transform Lives",
      description:
        "Supporting women in Rwanda to build sustainable futures through education and opportunity.",
      cta: "Join Our Mission",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=600&fit=crop",
      title: "Building Stronger Communities",
      description:
        "Creating lasting change through women's economic empowerment and community development.",
      cta: "Make an Impact",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=600&fit=crop",
      title: "Skills for Life",
      description:
        "Providing practical training and education that opens doors to new opportunities.",
      cta: "Support Education",
    },
  ];

  const galleryImages = [
    {
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop",
      title: "Women's Training Session",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=400&fit=crop",
      title: "Community Gathering",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop",
      title: "Skills Development",
    },
    {
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop",
      title: "Cultural Celebration",
    },
    {
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=400&fit=crop",
      title: "Educational Workshop",
    },
    {
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop",
      title: "Community Support",
    },
  ];

  const testimonials = [
    {
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c5e0f26d?w=150&h=150&fit=crop&crop=face",
      name: "Marie Uwimana",
      role: "Small Business Owner",
      quote:
        "The center gave me the skills and confidence to start my own tailoring business. I now employ three other women and can support my family with dignity.",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      name: "Grace Mukamana",
      role: "Program Graduate",
      quote:
        "The training programs transformed my life completely. I learned valuable skills in digital literacy and now teach others in my community.",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Niyonsaba",
      role: "Community Leader",
      quote:
        "Thanks to the support and resources provided, I've grown my small business and created employment opportunities for other women in our village.",
      rating: 5,
    },
  ];

  const impactStats = [
    {
      icon: faUsers,
      number: "500+",
      label: "Women Empowered",
      color: "text-primary",
    },
    {
      icon: faGraduationCap,
      number: "200+",
      label: "Training Programs",
      color: "text-primary",
    },
    {
      icon: faHeart,
      number: "1000+",
      label: "Lives Impacted",
      color: "text-primary",
    },
    {
      icon: faLeaf,
      number: "50+",
      label: "Sustainable Projects",
      color: "text-primary",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="min-h-screen" style={{ background: PALETTE.seasalt }}>
      {/* Navigation Bar */}
      <Nav />

      <div className="">
        {/* Hero Slider Section */}
        <section className="relative h-screen overflow-hidden">
          {sliderImages.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center max-w-4xl px-4">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
                    {slide.description}
                  </p>
                  <button
                    onClick={openModal}
                    className="bg-primary text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-fade-in-up animation-delay-400"
                  >
                    {slide.cta}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}

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
            {sliderImages.map((_, index) => (
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

        {/* Impact Stats Section */}
        <section
          id="stats"
          data-animate
          className="py-20 relative overflow-hidden transform transition-all duration-1000"
          style={{ background: PALETTE.antiFlashWhite }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Our Impact
              </h2>
              <p className="text-xl text-gray-600">
                Making a difference in women's lives across Rwanda
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <FontAwesomeIcon
                      icon={stat.icon}
                      className={`text-5xl mb-4 ${stat.color} group-hover:scale-125 transition-transform duration-300`}
                    />
                    <h3 className="text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-lg text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=500&fit=crop"
                  alt="Women Empowerment"
                  className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-primary">
                  Creating Lasting Change
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Your support helps create sustainable economic opportunities
                  for women in rural Rwanda. Through education, skills training,
                  and community support, we're building a brighter future.
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
                  onClick={openModal}
                  className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Make a Difference
                  <FontAwesomeIcon icon={faHeart} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" style={{ background: PALETTE.dutchWhite }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                Empowering Women, Transforming Communities
              </h2>
              <p
                className="text-xl mb-4"
                style={{ color: PALETTE.brunswickGreen }}
              >
                Urugo is dedicated to supporting women in Rwanda through
                education, skills training, and community initiatives. Together,
                we build brighter futures and stronger communities.
              </p>
            </div>
            <div className="flex justify-center">
              {/* Video placeholder (YouTube embed) */}
              <div style={{ width: "100%", maxWidth: 480 }}>
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Empowering Women Video Placeholder"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "1rem",
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          data-animate
          className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transform transition-all duration-1000 ${
            isVisible.gallery
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-primary mb-4">
              Unforgettable Moments
            </h2>
            <p className="text-xl text-gray-600">
              Moments that capture the transformation happening in our community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-emerald-400 rounded-2xl transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
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

        {/* Events Section */}
        {events && events.length > 0 && (
          <section
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
                  <div className="relative overflow hidden">
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
                    <button className="text-primary font-semibold hover:text-primary-dark transition-colors group-hover:translate-x-2 transform duration-300">
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Partners Section */}
        {partners && partners.length > 0 && (
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
                  onClick={openModal}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-fade-in-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-white text-2xl"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Make a Donation
              </h3>
              <p className="text-gray-600 mb-6">
                Your contribution helps empower women and transform communities
                in Rwanda.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="bg-emerald-50 text-emerald-600 p-3 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                  $25
                </button>
                <button className="bg-emerald-50 text-emerald-600 p-3 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                  $50
                </button>
                <button className="bg-emerald-50 text-emerald-600 p-3 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                  $100
                </button>
                <button className="bg-emerald-50 text-emerald-600 p-3 rounded-xl font-semibold hover:bg-emerald-100 transition-colors">
                  Custom
                </button>
              </div>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
