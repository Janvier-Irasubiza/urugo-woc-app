import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../components/modal";
import Auth from "./auth/auth";
import Cart from "./cart";
import Donation from "./donation";

function Nav() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModalComp, setActiveModalComp] = useState<
    "auth" | "donation" | "cart"
  >("auth");

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Events", link: "/events" },
    { name: "Accommodations", link: "/accommodations" },
    { name: "Dining", link: "/dining" },
    { name: "Marketplace", link: "/marketplace" },
    { name: "Cultural", link: "/cultural" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const openModal = (type: "auth" | "donation" | "cart") => {
    setActiveModalComp(type);
    setIsModalOpen(true);
  };

  const renderModalContent = () => {
    switch (activeModalComp) {
      case "auth":
        return <Auth />;
      case "donation":
        return <Donation />;
      case "cart":
        return <Cart />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="relative">
        <div className="border-b py-6 px-4 md:px-20">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-semibold">Logo</div>

            {/* Desktop Menu */}
            <div className="space-x-12 hidden md:flex">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`font-medium text-base ${
                    isActive(item.link)
                      ? "text-primary border-b-2 border-b-primary text-lg font-semibold"
                      : "text-gray-600 hover:text-gray-800"
                  } transition`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-x-3 md:space-x-6 flex items-center">
              <button
                onClick={() => openModal("auth")}
                className="hidden md:block font-medium border-2 btn-primary-outline hover:text-white text-gray-500 px-4 py-1 rounded-full transition"
              >
                Join Us
              </button>

              <button
                onClick={() => openModal("donation")}
                className="font-medium border-2 btn-primary hover:text-white text-gray-500 px-4 py-1 rounded-full transition"
              >
                Donate
              </button>

              <button onClick={() => openModal("cart")}>
                <ShoppingBagIcon className="h-7 w-7 pry-txt p-0 m-0" />
              </button>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600"
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="h-7 w-7" />
                  ) : (
                    <Bars3Icon className="h-7 w-7" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Mobile Menu */}
            <div className="md:hidden sticky top-[76px] left-0 w-full bg-white shadow-lg z-50 h-[calc(100vh-76px)] overflow-y-auto">
              <div className="px-4 py-6">
                <div className="flex flex-col space-y-4">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg ${
                        isActive(item.link)
                          ? "text-primary font-semibold"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      openModal("auth");
                      setIsMobileMenuOpen(false);
                    }}
                    className="mt-4 w-full font-medium border-2 btn-primary-outline text-gray-500 px-4 py-2 rounded-full transition"
                  >
                    Join Us
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Modal for Auth, Donation, Cart */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {renderModalContent()}
      </Modal>
    </>
  );
}

export default Nav;
