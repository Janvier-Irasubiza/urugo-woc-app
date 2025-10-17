import { useEffect, useState } from "react";
import App from "../layouts/app";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import axios from "axios";
import { ABT_ENDPOINTS } from "../configs/configs";
import { useSEO, generateStructuredData } from "../utils/seo";
import { impactStats } from "../components/data";

interface AboutUsProps {
  title: string;
  description: string;
}

interface TeamProps {
  id: string;
  name: string;
  role: string;
  image: string;
  social_links: {
    name: string;
    link: string;
  }[];
}

function About() {
  const [aboutUs, setAboutUs] = useState<AboutUsProps[]>([]);
  const [team, setTeam] = useState<TeamProps[]>([]);

  // SEO Configuration
  useSEO({
    title:
      "About Urugo WOC - Our Story, Mission & Team | Women economic support Rwanda",
    description:
      "Learn about Urugo WOC's mission to empower women and build stronger communities in Rwanda. Meet our passionate team and discover our journey since 2015.",
    keywords:
      "about Urugo WOC, women economic support Rwanda, our story, team, mission, vision, community development Rwanda",
    url: window.location.href,
    type: "website",
  });

  const fetchAboutUs = async () => {
    try {
      const response = await axios.get(`${ABT_ENDPOINTS.ABOUT}/`);
      setAboutUs(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${ABT_ENDPOINTS.TEAM}/`);
      setTeam(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAboutUs();
    fetchStaff();
  }, []);

  // Add About Page structured data
  useEffect(() => {
    if (aboutUs.length > 0) {
      const mainAbout = aboutUs.find((item) => item.title === "About");
      if (mainAbout) {
        generateStructuredData("Organization", {
          name: "Urugo WOC",
          description: mainAbout.description,
          url: window.location.origin,
          foundingDate: "2015",
          address: {
            "@type": "PostalAddress",
            addressCountry: "RW",
            addressRegion: "Kigali",
          },
          employee: team.map((member) => ({
            "@type": "Person",
            name: member.name,
            jobTitle: member.role,
            image: member.image,
          })),
        });
      }
    }
  }, [aboutUs, team]);

  return (
    <App>
      <div className="bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div
          className="relative overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--primary-dark-color))",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
            <div
              className="absolute bottom-20 right-20 w-40 h-40 opacity-20 rounded-full blur-2xl"
              style={{ backgroundColor: "var(--thrd-level-color)" }}
            ></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white opacity-5 rounded-full blur-lg"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-20 md:py-28">
            <div className="max-w-5xl mx-auto text-center">
              {/* Main heading */}
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                <span className="block">Urugo Women</span>
                <span
                  className="block"
                  style={{
                    background: `linear-gradient(45deg, var(--thrd-level-color), white)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Opportunity Center
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white text-opacity-90 leading-relaxed max-w-4xl mx-auto mb-12 font-light">
                Advancing women in Rwanda through education, skills development,
                and community support — building sustainable futures, one woman
                at a time
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {impactStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="text-4xl md:text-5xl font-bold mb-2"
                      style={{ color: "var(--thrd-level-color)" }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-white text-opacity-80 text-lg">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-auto">
              <path
                fill="white"
                fillOpacity="0.1"
                d="M0,120L48,105C96,90,192,60,288,45C384,30,480,30,576,40C672,50,768,70,864,75C960,80,1056,70,1152,60C1248,50,1344,40,1392,35L1440,30L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="px-4 md:px-20 py-16 space-y-28 max-w-7xl mx-auto">
          {/* About Section with Timeline */}

          <section className="grid grid-cols-1 gap-16 items-center">
            {/* Timeline Title */}
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From humble beginnings to transformative impact - discover the
                milestones that shaped Urugo WOC into the empowering force it is
                today
              </p>
            </div>

            {/* Timeline visualization */}
            <div className="relative pl-8 space-y-10 before:absolute before:inset-0 before:h-full before:w-0.5 before:bg-orange-300 before:left-0">
              <div className="relative">
                <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4">
                  <h3 className="font-black text-xl text-primary">
                    2013 - Establishment
                  </h3>
                  <p className="text-gray-700">
                    Established by Women for Women International (WfWI) in
                    Kayonza District as a center to economically develop women
                    through vocational and life skills training.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4">
                  <h3 className="font-black text-xl text-primary">
                    April 2016 - Government recognition
                  </h3>
                  <p className="text-gray-700">
                    The foreign branch office of WfWI Empowerment Center, LLC
                    located in Kayonza, Rwanda, was registered with the Rwanda
                    Development Board (RDB) as a social enterprise. The name
                    “Urugo Women’s Opportunity Center” was adopted as the
                    center’s business name and a Trademark was registered in the
                    US and Rwanda in July 2017.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4">
                  <h3 className="font-black text-xl text-primary">2017</h3>
                  <p className="text-gray-700">
                    The center takes up full management of the center and all
                    the facilities including · Partnership building –
                    Collaborated with local cooperatives and organizations to
                    provide women with access to markets and resources. ·
                    Tourism & culture hub – Became a destination for both
                    Rwandans and international visitors, showcasing authentic
                    crafts, cultural experiences, and sustainable development in
                    action. · Business incubation – Home to several thriving
                    businesses led by WfWI graduates (tailoring, crafts, dairy,
                    hospitality, etc.). · Today – A vibrant space for learning,
                    commerce, and partnership, uplifting women and the wider
                    Kayonza community.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4">
                  <h3 className="font-black text-xl text-primary">Today</h3>
                  <p className="text-gray-700">
                    Urugo stands as a vibrant space for learning, creativity,
                    and commerce, supporting women-led enterprises and
                    contributing to the economic and social growth of the
                    Kayonza community.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* More Info Section with Cards */}
          <section className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 text-center mb-8">
              What Sets Us Apart
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {aboutUs
                .filter((item) => item.title !== "About")
                .map((info, index) => (
                  <div
                    key={info.title}
                    className="p-8 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 rounded-full p-4 group-hover:bg-primary transition-colors duration-300">
                        {/* Different icon for each card */}
                        {index % 3 === 0 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        )}
                        {index % 3 === 1 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        )}
                        {index % 3 === 2 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-800 mb-3">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Staff Section with Enhanced Cards */}
          <section className="text-center py-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              Passionate professionals dedicated to delivering excellence in
              everything we do
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-primary mb-4">{member.role}</p>
                    <div className="flex justify-center gap-3">
                      {member.social_links.map((social) => (
                        <a
                          key={social.name}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary flex items-center justify-center transition-all duration-300"
                        >
                          {social.name === "Facebook" && (
                            <FaFacebookF className="text-gray-700 hover:text-white" />
                          )}
                          {social.name === "Twitter" && (
                            <FaTwitter className="text-gray-700 hover:text-white" />
                          )}
                          {social.name === "Whatsapp" && (
                            <FaWhatsapp className="text-gray-700 hover:text-white" />
                          )}
                          {social.name === "Instagram" && (
                            <FaInstagram className="text-gray-700 hover:text-white" />
                          )}
                          {social.name === "LinkedIn" && (
                            <FaLinkedinIn className="text-gray-700 hover:text-white" />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </App>
  );
}

export default About;
