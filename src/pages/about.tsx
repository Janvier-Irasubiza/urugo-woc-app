import { useEffect, useState } from "react";
import App from "../layouts/app";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { ABT_ENDPOINTS } from "../configs/configs";

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

  const mainAbout = aboutUs.find((item) => item.title === "About");

  return (
    <App>
      <div className="px-2 md:px-20 py-20 space-y-28 bg-gradient-to-b from-white to-gray-50">
        {/* About Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {mainAbout && (
            <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-100 to-orange-50 border-l-4 border-orange-500 shadow-md">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
                {mainAbout.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg tracking-wide">
                {mainAbout.description}
              </p>
            </div>
          )}

          {/* More Info Section */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center">
              More
            </h2>
            {aboutUs
              .filter((item) => item.title !== "About")
              .map((info) => (
                <div
                  key={info.title} // Use unique identifier from data
                  className="p-5 rounded-lg bg-white border border-orange-200 hover:bg-orange-50 transition-transform transform hover:scale-105 duration-300 flex items-start gap-4"
                >
                  {/* <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div> */}
                  <p className="text-gray-600 text-lg">{info.description}</p>
                </div>
              ))}
          </div>
        </section>

        {/* Staff Section */}
        <section className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-10">
            Meet Our Staff
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.id} // Use proper unique identifier
                className="p-6 rounded-xl bg-white hover:bg-orange-50 transition-transform transform hover:scale-105 duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-700 mb-3 font-medium">{member.role}</p>
                <div className="flex justify-center gap-4 mt-2">
                  {member.social_links.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-all duration-300"
                    >
                      {social.name === "Facebook" && (
                        <FaFacebookF className="text-gray-800 hover:text-white text-lg" />
                      )}
                      {social.name === "Twitter" && (
                        <FaTwitter className="text-gray-800 hover:text-white text-lg" />
                      )}
                      {social.name === "Whatsapp" && (
                        <FaWhatsapp className="text-gray-800 hover:text-white text-lg" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </App>
  );
}

export default About;
