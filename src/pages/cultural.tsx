import App from "../layouts/app";

const Cultural = () => {
  const craftItems = [
    {
      title: "Craft Demonstrations",
      description:
        "Discover Rwanda through the eyes of local women artisans and entrepreneurs. The Urugo Women’s Opportunity Center provides training and space for women to learn, demonstrate and sell traditional crafts, artwork and food products.",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fit=crop&w=600&h=400",
    },
    {
      title: "Craft Demonstrations",
      description:
        "Discover Rwanda through the eyes of local women artisans and entrepreneurs. The Urugo Women’s Opportunity Center provides training and space for women to learn, demonstrate and sell traditional crafts, artwork and food products.",
      image:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?fit=crop&w=600&h=400",
    },
  ];

  return (
    <App>
      <div className="px-4 md:px-20 md:py-10 space-y-10 bg-[#F7F9FB]">
        {/* Heading Section */}
        <h1 className="text-4xl font-extrabold text-[#1B4965]">African Dish</h1>

        {/* Craft Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {craftItems.map((item, index) => (
            <CraftCard key={index} item={item} />
          ))}
        </div>
      </div>
    </App>
  );
};

// Craft Card Component
const CraftCard = ({ item }: { item: any }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#E0E0E0]">
      {/* Green Top Border with Rounded Corners */}
      <div className="bg-[#4F772D] rounded-t-3xl overflow-hidden">
        {/* Image */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-60 object-cover rounded-t-3xl"
        />
      </div>

      {/* Content Section */}
      <div className="bg-[#F0E9E0] px-6 py-4 text-center">
        <h3 className="text-2xl font-bold text-[#D18D18] mb-3">{item.title}</h3>
        <p className="text-[#34495E] text-md leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default Cultural;
