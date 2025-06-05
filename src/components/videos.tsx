import { useEffect, useState } from "react";
import { PALETTE } from "../configs/app";
import { ABT_ENDPOINTS } from "../configs/configs";
import axios from "axios";

interface Video {
  url: string;
}

function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const getVideos = async () => {
    try {
      const response = await axios.get(ABT_ENDPOINTS.VIDEOS);
      setVideos(response.data.results);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <section className="py-20" style={{ background: PALETTE.dutchWhite }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Text Section */}
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                Empowering Women, Transforming Communities
              </h2>
              <p
                className="text-xl mb-8"
                style={{ color: PALETTE.brunswickGreen }}
              >
                Urugo is dedicated to supporting women in Rwanda through
                education, skills training, and community initiatives. Together,
                we build brighter futures and stronger communities.
              </p>
            </div>

            {/* Video Carousel Section */}
            <div className="lg:w-1/2 w-full">
              <div className="relative">
                <div className="overflow-x-auto pb-4">
                  <div
                    className="flex space-x-4"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {videos.map((video, index) => (
                      <div
                        key={index}
                        className="flex-none w-full md:w-1/2 lg:w-full"
                        style={{ scrollSnapAlign: "start" }}
                      >
                        <div
                          style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                          }}
                        >
                          <iframe
                            src={video.url}
                            title={`Video ${index + 1}`}
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
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        currentVideoIndex === index
                          ? "bg-primary"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to video ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Videos;
