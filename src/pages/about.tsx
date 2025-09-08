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
    title: "About Urugo WOC - Our Story, Mission & Team | Women Empowerment Rwanda",
    description: "Learn about Urugo WOC's mission to empower women and build stronger communities in Rwanda. Meet our passionate team and discover our journey since 2015.",
    keywords: "about Urugo WOC, women empowerment Rwanda, our story, team, mission, vision, community development Rwanda",
    url: window.location.href,
    type: "website"
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
        generateStructuredData('Organization', {
          name: 'Urugo WOC',
          description: mainAbout.description,
          url: window.location.origin,
          foundingDate: '2015',
          address: {
            '@type': 'PostalAddress',
            'addressCountry': 'RW',
            'addressRegion': 'Kigali'
          },
          employee: team.map(member => ({
            '@type': 'Person',
            name: member.name,
            jobTitle: member.role,
            image: member.image
          }))
        });
      }
    }
  }, [aboutUs, team]);

  const mainAbout = aboutUs.find((item) => item.title === "About");

  return (
    <App>
      <div className="bg-gradient-to-b from-white to-gray-50">
        {/* Main Content */}
        <div className="px-4 md:px-20 py-16 space-y-28">
          {/* About Section with Timeline */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {mainAbout && (
              <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-100 to-orange-50 border-l-4 border-orange-500 shadow-lg">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                  Our Story
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg tracking-wide">
                  {mainAbout.description}
                </p>
              </div>
            )}

            {/* Timeline visualization */}
            <div className="relative pl-8 space-y-10 before:absolute before:inset-0 before:h-full before:w-0.5 before:bg-orange-300 before:left-0">
              <div className="relative">
                <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4">
                  <h3 className="font-bold text-xl text-primary">2015</h3>
                  <p className="text-gray-700">
                    Founded with a vision to revolutionize the industry
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4">
                  <h3 className="font-bold text-xl text-primary">2018</h3>
                  <p className="text-gray-700">
                    Expanded operations to three new locations
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4">
                  <h3 className="font-bold text-xl text-primary">2021</h3>
                  <p className="text-gray-700">
                    Launched innovative new services and solutions
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-8 bg-primary rounded-full w-6 h-6 border-4 border-white"></div>
                <div className="bg-white p-6 rounded-lg shadow-md ml-4">
                  <h3 className="font-bold text-xl text-primary">2024</h3>
                  <p className="text-gray-700">
                    Celebrating our growth and success with new initiatives
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* More Info Section with Cards */}
          <section className="space-y-10">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
              What Sets Us Apart
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
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
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
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
                    <h3 className="text-xl font-bold text-gray-800">
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
