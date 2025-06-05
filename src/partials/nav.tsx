import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../components/modal";
import Auth from "./auth/auth";
import Cart from "./cart";
import Donation from "./donation";
import { PALETTE } from "../configs/app";
import { useCart } from "../contexts/cart";

function Nav() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModalComp, setActiveModalComp] = useState<
    "auth" | "donation" | "cart"
  >("auth");
  const { getTotalItems } = useCart();

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Events", link: "/events" },
    { name: "Accommodations", link: "/accommodations" },
    { name: "Dining", link: "/dining" },
    { name: "Marketplace", link: "/marketplace" },
    // { name: "Cultural", link: "/cultural" },
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
      <nav className="relative bg-white">
        <div className="border-b py-4 px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: PALETTE.brunswickGreen }}
              >
                UrugoWOC
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 xl:space-x-12">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`font-medium text-sm font-semibold ${
                    isActive(item.link)
                      ? "text-primary border-b-2 border-b-primary text-lg"
                      : "text-gray-600 hover:text-gray-800"
                  } transition-colors duration-200`}
                >
                  {item.name.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-6">
              <button
                onClick={() => openModal("auth")}
                className="hidden lg:block font-medium border-2 btn-primary-outline hover:text-white text-gray-500 px-6 lg:px-12 py-2 rounded-full transition-colors duration-200"
              >
                Join Us
              </button>

              <button
                onClick={() => openModal("donation")}
                className="font-medium border-2 btn-primary hover:text-white text-gray-500 px-4 sm:px-8 lg:px-12 py-2 rounded-full transition-colors duration-200 text-sm sm:text-base"
              >
                Donate
              </button>

              <button
                onClick={() => openModal("cart")}
                className="p-2 m-0 bg-transparent border-none hover:bg-gray-100 rounded-full relative transition-colors duration-200"
              >
                <ShoppingCartIcon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems() > 99 ? "99+" : getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                ) : (
                  <Bars3Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-50">
            <div className="px-4 py-6 h-full overflow-y-auto">
              <div className="flex flex-col space-y-6">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-medium ${
                      isActive(item.link)
                        ? "text-primary"
                        : "text-gray-600 hover:text-gray-800"
                    } transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    openModal("auth");
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-4 w-full font-medium border-2 btn-primary-outline text-gray-500 px-4 py-3 rounded-full transition-colors duration-200"
                >
                  Join Us
                </button>
              </div>
            </div>
          </div>
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
