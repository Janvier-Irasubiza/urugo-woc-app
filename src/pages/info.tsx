import { useParams } from "react-router-dom";
import App from "../layouts/app";
import axios from "axios";
import { useState, useEffect } from "react";

interface DiningDetails {
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

function DiningDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [DiningDetails, setDiningDetails] = useState<DiningDetails>(
    {} as DiningDetails
  );

  const fetchDiningDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/dining/${slug}/`
      );
      console.log(response.data);
      setDiningDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiningDetails();
  }, []);

  return (
    <>
      <App>
        <div className="px-6 py-10 max-w-4xl mx-auto space-y-8">
          {/* Dining Image and Title */}
          <div className="space-y-4">
            <img
              src={DiningDetails.image}
              alt={DiningDetails.title}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
            <h1 className="text-4xl font-bold text-orange-600">
              {DiningDetails.title}
            </h1>
          </div>

          {/* Dining Metadata */}
          <div className="flex flex-col md:flex-row justify-between text-gray-500 text-sm">
            <span>Location: {DiningDetails.location}</span>
          </div>

          {/* Dining Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              About This Dining
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {DiningDetails.description}
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-8">
            <button className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition">
              Book Your Spot
            </button>
          </div>
        </div>
      </App>
    </>
  );
}

export default DiningDetails;
