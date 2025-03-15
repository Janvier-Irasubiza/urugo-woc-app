import { CodeBracketIcon } from "@heroicons/react/16/solid";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ABT_ENDPOINTS } from "../configs/configs";

interface ContactProps {
  phone_number: string;
  email: string;
  address: string;
}

const Footer = () => {
  const [contact, setContact] = useState<ContactProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchContact = async () => {
    try {
      const response = await axios.get(`${ABT_ENDPOINTS.CONTACT}/?page=1`);
      console.log(response.data);
      if (response.data.results) {
        setContact(response.data.results[0]);
      } else {
        setError("No contact information found.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch contact information.");
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-200 pt-10 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Menu Links - Column 1 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">About Us</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/cultural">Cultural</Link>
            </li>
          </ul>
        </div>

        {/* Menu Links - Column 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Marketplace</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link to="/accommodations">Accommodations</Link>
            </li>
            <li>
              <Link to="/dining">Dining</Link>
            </li>
          </ul>
        </div>

        {/* Contact Information - Column 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : contact ? (
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                {contact.address}
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                {contact.phone_number}
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                {contact.email}
              </li>
            </ul>
          ) : (
            <p>Loading contact information...</p>
          )}
        </div>

        {/* Newsletter & Social Icons - Column 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Join Our Community</h4>
          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-grow"
              aria-label="Enter your email to join our community"
            />
            <button className="btn-primary text-white px-4 py-1 rounded-full hover:bg-orange-600 transition">
              Join
            </button>
          </div>

          {/* Social Media Icons */}
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
      <div className="border-t border-gray-700 mt-8 py-4 text-center flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} UrugoWoc. All Rights Reserved.</p>
        <p className="flex items-center gap-2">
          <CodeBracketIcon className="h-5 w-5" />{" "}
          <span className="font-semibold">RB-A</span>
        </p>
      </div>
    </footer>
  );
};

// Reusable Social Icon Component
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
