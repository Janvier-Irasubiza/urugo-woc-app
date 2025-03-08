import { CodeBracketIcon } from "@heroicons/react/16/solid";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 pt-10 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Menu Links - Column 1 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">About Us</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Events</li>
            <li>Cultural</li>
          </ul>
        </div>

        {/* Menu Links - Column 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Marketplace</h4>
          <ul className="space-y-2">
            <li>Accommodations</li>
            <li>Dining</li>
          </ul>
        </div>

        {/* Contact Information - Column 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
              Kayonza, Rwanda
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
              +250 712 345 678
            </li>
            <li className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              info@urugowoc.com
            </li>
          </ul>
        </div>

        {/* Newsletter & Social Icons - Column 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Join Our Community</h4>
          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-grow"
            />
            <button className="btn-primary text-white px-4 py-1 rounded-full hover:bg-orange-600 transition">
              Join
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 justify-center">
            <SocialIcon Icon={FaFacebookF} />
            <SocialIcon Icon={FaWhatsapp} />
            <SocialIcon Icon={FaInstagram} />
            <SocialIcon Icon={FaYoutube} />
            <SocialIcon Icon={FaXTwitter} />
            <SocialIcon Icon={FaLinkedinIn} />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 py-4 text-center flex justify-between items-center">
        <p>&copy; 2021 Urugo Woc. All Rights Reserved.</p>
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
};

const SocialIcon = ({ Icon }: SocialIconProps) => (
  <div className="p-2 btn-primary rounded-full cursor-pointer transition">
    <Icon className="text-white h-4 w-4" />
  </div>
);

export default Footer;
