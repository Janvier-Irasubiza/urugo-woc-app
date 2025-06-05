import axios from "axios";
import { useState, useEffect } from "react";
import { ABT_ENDPOINTS } from "../configs/configs";

interface GalleryImage {
  image: string;
  title: string;
}

function Gallery() {
  const [isVisible, setIsVisible] = useState({
    gallery: false,
  });
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const getGalleryImages = async () => {
    try {
      const response = await axios.get(ABT_ENDPOINTS.GALLERY);
      setGalleryImages(response.data.results);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  useEffect(() => {
    getGalleryImages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible({ gallery: true });
          }
        });
      },
      { threshold: 0.1 }
    );

    const galleryElement = document.getElementById("gallery");
    if (galleryElement) {
      observer.observe(galleryElement);
    }

    return () => {
      if (galleryElement) {
        observer.unobserve(galleryElement);
      }
    };
  }, []);

  return (
    <>
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
    </>
  );
}

export default Gallery;
