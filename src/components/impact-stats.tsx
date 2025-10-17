import { PALETTE } from "../configs/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { impactStats } from "./data";

function ImpactStats() {
  return (
    <>
      {/* Impact Stats Section */}
      <section
        id="stats"
        data-animate
        className="py-20 relative overflow-hidden transform transition-all duration-1000"
        style={{ background: PALETTE.antiFlashWhite }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Making a difference in women's lives across Rwanda
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className={`text-5xl mb-4 ${stat.color} group-hover:scale-125 transition-transform duration-300`}
                  />
                  <h3 className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-lg text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ImpactStats;
