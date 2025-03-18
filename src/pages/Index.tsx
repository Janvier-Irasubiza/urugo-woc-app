import Modal from "../components/modal";
import App from "../layouts/app";
import Donation from "../partials/donation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import poster from "/images/sxpra.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS } from "../configs/configs";
import Give1 from "../assets/give1.jpg";

interface Post {
  title: string;
  slug: string;
  short_desc: string;
  poster: string;
  type: string;
}

interface partners {
  logo: string;
  url: string;
}

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Events states
  const [events, setEvents] = useState<Post[]>([]);
  const [eventsPage, setEventsPage] = useState(1);
  const [eventsTotalPages, setEventsTotalPages] = useState(1);

  // News states
  const [newsUpdates, setNewsUpdates] = useState<Post[]>([]);
  const [newsPage, setNewsPage] = useState(1);
  const [newsTotalPages, setNewsTotalPages] = useState(1);

  // Partners states
  const [partners, setPartners] = useState<partners[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BLOG_POSTS}/?type=event&page=${eventsPage}`
      );
      setEvents(response.data.results);
      setEventsTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNewsUpdates = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BLOG_POSTS}/?type=blog&page=${newsPage}`
      );
      setNewsUpdates(response.data.results);
      setNewsTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.PARTNERS}/?page=1`);
      setPartners(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [eventsPage]);

  useEffect(() => {
    fetchNewsUpdates();
  }, [newsPage]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const infoCards = [
    {
      title: "Urugo Women Opportunity center",
      description:
        "Is a safe and welcoming space located in Kayonza District, Eastern Province of Rwanda. It provides dedicated facilities where women can learn, develop new skills, and build sustainable livelihoods that uplift their families and communities. With a deep commitment to women’s empowerment, Urugo is a place of hope and transformation. It brings women together, offering them the tools, support, and opportunities they need to create a brighter future. Every contribution helps change lives, making it possible for more women to gain the skills and confidence to thrive.",
    },
    {
      title: "The Urugo Eco-Lodge",
      description:
        "Offers a unique and meaningful stay in the heart of rural Rwanda. Designed to provide comfort while staying true to sustainable and community-centered values, our deluxe camps feature Wi-Fi, en suite solar-powered hot showers, and private verandas—blending luxury with simplicity. More than just a place to stay, Urugo Eco-Lodge is an experience. Visitors have the opportunity to immerse themselves in the warmth of the local community, supporting initiatives that empower women and foster sustainable development. Its close proximity to Akagera National Park also makes it a perfect resting place for those seeking adventure while contributing to a greater cause.",
    },
    {
      title: "Women and Men Learning Space",
      description:
        "The center also focuses on engaging men through the Men's Engagement Programme, teaching them about gender equality and women's rights. This initiative aims to create an environment where women can reach their full potential and exercise their rights. Recognizing that true empowerment requires collective effort, our Men’s Engagement Program encourages men to become allies in gender equality. By fostering understanding and support for women’s economic and social empowerment, we strengthen families and create a more inclusive, prosperous future for all.",
    },
  ];

  return (
    <App>
      <div className="px-4 md:px-20 py-6">
        <div className="w-full md:h-[474px] rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
          <div className="relative w-full h-full">
            <img src={poster} alt="Hands Together" />
            <div className="absolute inset-0 md:w-1/2 flex items-center justify-start">
              <div className="p-4 md:p-12">
                <h3 className="text-white text-lg md:text-4xl font-bold">
                  Empower Women, <br />
                  Transform Lives
                </h3>
                <p className="hidden md:block text-white md:mt-4 md:text-xl">
                  In Rwanda and beyond, we support women facing adversity to
                  reclaim their independence and build a sustainable future.
                  Your donation today helps us provide skills, education, and
                  opportunities to the most vulnerable.
                </p>
                <button
                  onClick={openModal}
                  className="btn-primary mt-2 md:mt-8 text-sm md:text-base text-white px-6 py-1 md:px-12 md:py-3 rounded-full hover:bg-orange-600"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* infoCards Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg text-center bg-green-50"
            >
              {/* Title */}
              <h3 className="font-semibold text-green-700 mb-2 text-3xl md:text-4xl">
                {card.title}
              </h3>

              {/* short_description */}
              <p className="text-gray-600 mt-8 text-lg">{card.description}</p>
            </div>
          ))}
        </div>

        <section className="flex flex-col md:flex-row items-center gap-10 mt-20">
          {/* Images Section */}
          <div className="relative w-full md:w-1/2 flex flex-col gap-4r">
            {/* Large Image */}
            <img
              src={Give1}
              alt="Hands Together"
              className="w-full rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-green-500 text-transparent bg-clip-text">
              Supporting Women’s Economic Development
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              By spending your money at the Urugo Women’s Opportunity Center,
              you are contributing to the social and economic development of
              local women and their communities. The Urugo Women’s Opportunity
              Center provides a secure, supportive environment where women can
              find support, access resources, and build life-changing skills to
              move from crisis and poverty to stability and economic
              self-reliance.
            </p>
            <button
              onClick={openModal}
              className="btn-primary mt-2 md:mt-8 text-sm md:text-base text-white px-6 py-1 md:px-12 md:py-3 rounded-full hover:bg-orange-600"
            >
              Donate
            </button>
          </div>
        </section>

        {/* Events Section */}
        {events && events.length > 0 && (
          <section className="mt-20">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Events
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEventsPage((prev) => prev - 1)}
                  disabled={eventsPage === 1}
                  className="text-white btn-primary w-12 h-12 flex items-center justify-center rounded-full shadow-md disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                <button
                  onClick={() => setEventsPage((prev) => prev + 1)}
                  disabled={eventsPage === eventsTotalPages}
                  className="text-white btn-primary w-12 h-12 flex items-center justify-center rounded-full shadow-md disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg mt-4 md:mt-6">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={event.poster}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-4 text-2xl text-primary-dark">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{event.short_desc}</p>
                    <Link
                      to={`/atl/${event.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* News & Updates Section */}
        {newsUpdates && newsUpdates.length > 0 && (
          <section className="mt-20">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                News & Updates
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setNewsPage((prev) => prev - 1)}
                  disabled={newsPage === 1}
                  className="text-primary-dark"
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button
                  onClick={() => setNewsPage((prev) => prev + 1)}
                  disabled={newsPage === newsTotalPages}
                  className="text-primary-dark"
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg mt-6">
              {newsUpdates.map((update, index) => (
                <div
                  key={index}
                  className="bg-thrd-level rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={update.poster}
                    alt={update.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold mb-4 text-2xl text-primary-dark">
                      {update.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{update.short_desc}</p>
                    <Link
                      to={`/atl/${update.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Partners Section */}
        {partners && partners.length > 0 && (
          <section className="mt-20 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Partners
            </h2>
            <div className="flex items-center justify-start gap-6">
              {partners.map((partner, index) => (
                <Link to={partner.url} target="_blank">
                  <div
                    key={index}
                    className="bg-gray-100 h-16 w-32 flex items-center justify-center rounded-lg"
                  >
                    <img src={partner.logo} alt="" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Donation />
      </Modal>
    </App>
  );
}

export default Index;
