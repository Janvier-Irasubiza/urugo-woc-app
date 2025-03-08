import App from "../layouts/app";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

function About() {
  const staffMembers = Array(8).fill({
    name: "John Doe",
    position: "Accommodations Manager",
  });

  const moreInfo = [
    "A center for tourism. En-route to the gates to Akagera National Park, the Urugo Women’s Opportunity Center is well positioned to bring tourism.",
    "An innovative space for women’s empowerment, offering skills training and financial literacy for local women.",
    "A place where sustainability meets growth—using eco-friendly building materials and supporting local cooperatives.",
  ];

  return (
    <App>
      <div className="px-2 md:px-20 py-20 space-y-28 bg-gradient-to-b from-white to-gray-50">
        {/* About Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-100 to-orange-50 border-l-4 border-orange-500 shadow-md">
            <h2 className="text-4xl font-extrabold text-orange-600 mb-4 text-center">
              About
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg tracking-wide">
              The Urugo Women’s Opportunity Center, located in the Eastern
              province of Rwanda, is an innovative social enterprise founded by
              Women for Women International in 2013. The striking campus,
              conceived by architect Sharon Davis, was built using 450,000 clay
              bricks handcrafted by a local cooperative run by Women for Women
              program graduate Angelique Mukankubana.
            </p>
          </div>

          {/* More Info Section */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-orange-600 text-center">
              More
            </h2>
            {moreInfo.map((info, index) => (
              <div
                key={index}
                className="p-5 rounded-lg bg-white border border-orange-200 hover:bg-orange-50 transition-transform transform hover:scale-105 duration-300 flex items-start gap-4"
              >
                {/* Placeholder for the image/icon */}
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="text-gray-600 text-lg">{info}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Staff Section */}
        <section className="text-center">
          <h2 className="text-4xl font-extrabold text-orange-600 mb-10">
            Meet Our Staff
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {staffMembers.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white hover:bg-orange-50 transition-transform transform hover:scale-105 duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {/* Placeholder for staff image */}
                  <span className="text-4xl text-gray-600">👤</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-orange-600 mb-3">{member.position}</p>
                {/* Social Icons */}
                <div className="flex justify-center gap-4 mt-2">
                  <SocialIcon Icon={FaWhatsapp} />
                  <SocialIcon Icon={FaFacebookF} />
                  <SocialIcon Icon={FaTwitter} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </App>
  );
}

// Reusable Social Icon Component with Hover Effect
type SocialIconProps = {
  Icon: React.ElementType;
};

const SocialIcon = ({ Icon }: SocialIconProps) => (
  <div className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-all duration-300">
    <Icon className="text-orange-600 hover:text-white text-lg" />
  </div>
);

export default About;
