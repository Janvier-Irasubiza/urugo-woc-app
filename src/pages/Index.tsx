import Modal from "../components/modal";
import App from "../layouts/app";
import Donation from "../partials/donation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import poster from "../../public/images/sxpra.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface Post {
  title: string;
  slug: string;
  short_desc: string;
  image: string;
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
        `http://localhost:8000/api/blog-posts/?type=event&page=${eventsPage}`
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
        `http://localhost:8000/api/blog-posts/?type=blog&page=${newsPage}`
      );
      setNewsUpdates(response.data.results);
      setNewsTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/partners/?page=1`
      );
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
      title: "Urugo Women Opportunity Center",
      description:
        "is a safe environment and dedicated facilities located in Kayonza District the Eastern province of Rwanda where women can learn, build new skills, and operate businesses that directly contribute to the local communities.",
    },
    {
      title: "The Urugo Eco-Lodge",
      description:
        "is a part of an innovative social enterprise promoting economic empowerment for women. Set in rolling hills with spectacular views and friendly, dedicated staff, it’s the perfect place to discover rural Rwanda, stay en-route on your safari adventure, or hold your next meeting, wedding or special event.",
    },
    {
      title: "Women and Men Learning Space",
      description:
        "The Urugo Women’s Opportunity Center provides vocational and  life skills training for women and supports our Men’s Engagement Program, designed to build support for women’s economic and social empowerment in Rwanda.",
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
                  Support women’s <br />
                  Survivors of war
                </h3>
                <p className="hidden md:block text-white md:mt-4 md:text-xl">
                  In countries affected by conflict and war, we help the most
                  marginized women to overcome adversity and rebuild their
                  lives. Join our mission to make a difference.
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
              className="bg-thrd-level p-6 rounded-lg shadow-lg text-center"
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
          {/* Images */}
          <div className="flex flex-col gap-4 w-full">
            <img
              src="path-to-image.jpg"
              alt="Hands Together"
              className="rounded-lg"
            />
            <img
              src="path-to-image.jpg"
              alt="Hands Together"
              className="rounded-lg"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-8 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700">
              Supporting Women’s Economic Development
            </h2>
            <p className="text-gray-600 text-lg">
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
              className="btn-primary text-white px-12 py-3 rounded-full hover:bg-orange-600"
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
                  className="text-primary-dark"
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button
                  onClick={() => setEventsPage((prev) => prev + 1)}
                  disabled={eventsPage === eventsTotalPages}
                  className="text-primary-dark"
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
                    src={event.image}
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
                    src={update.image}
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
            <div className="flex items-center justify-between gap-6">
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
