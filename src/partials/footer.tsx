import axios from "axios";
import { useState, useEffect } from "react";
import { ABT_ENDPOINTS } from "../configs/configs";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "../assets/urugo.svg";

interface ContactProps {
  phone_number: string;
  email: string;
  address: string;
}

const Footer = () => {
  const [contact, setContact] = useState<ContactProps | null>(null);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`${ABT_ENDPOINTS.CONTACT}/?page=1`);
      if (response.data.results) {
        setContact(response.data.results[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-200 pt-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img src={Logo} alt="UrugoWOC" className="h-20 w-20" />
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              Empowering women in Rwanda through education, skills training, and
              community support. Building sustainable futures, one woman at a
              time.
            </p>
            <div className="flex space-x-4">
              <div className="flex space-x-4 mt-4 justify-center">
                <SocialIcon Icon={FaFacebookF} aria-label="Facebook" />
                <SocialIcon Icon={FaWhatsapp} aria-label="WhatsApp" />
                <SocialIcon Icon={FaInstagram} aria-label="Instagram" />
                <SocialIcon Icon={FaYoutube} aria-label="YouTube" />
                <SocialIcon Icon={FaXTwitter} aria-label="Twitter" />
                <SocialIcon Icon={FaLinkedinIn} aria-label="LinkedIn" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-100">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/accommodations"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Accommodations
                </Link>
              </li>
              <li>
                <Link
                  to="/dining"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Dining
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-100">
              Contact Info
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>{contact?.address}</p>
              <p>{contact?.email}</p>
              <p>{contact?.phone_number}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Urugo Women's Opportunity Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

type SocialIconProps = {
  Icon: React.ElementType;
  ariaLabel?: string;
};

const SocialIcon = ({ Icon, ariaLabel }: SocialIconProps) => (
  <div
    className="p-2 btn-primary rounded-full cursor-pointer transition"
    aria-label={ariaLabel}
  >
    <Icon className="text-white h-4 w-4" />
  </div>
);

export default Footer;
