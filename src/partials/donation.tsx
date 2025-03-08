import { UserIcon, EnvelopeIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Donation() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = [100, 250, 500, 1000];

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom input
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
      {/* Left Section - Image */}
      <div className="hidden md:block md:w-1/2 rounded-l-2xl overflow-hidden">
        <img
          src="https://source.unsplash.com/600x600/?help,donation"
          alt="Donation Community"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Section - Donation Form */}
      <div className="md:w-1/2 p-8 space-y-6">
        <h2 className="text-3xl font-bold text-blue-900">
          Helping To Make Our World Better Living
        </h2>

        {/* Form Fields */}
        <form className="space-y-4">
          {/* Name Input */}
          <div className="flex items-center bg-gray-100 p-3 rounded-full">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Names"
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center bg-gray-100 p-3 rounded-full">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          {/* Donation Amount Section */}
          <div className="space-y-2">
            <label className="block text-gray-600 font-medium">Amount</label>
            <div className="flex flex-wrap gap-2">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountClick(amount)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full border transition ${
                    selectedAmount === amount
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{amount}</span>
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="flex items-center bg-gray-100 p-3 rounded-full mt-2">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="number"
                placeholder="Custom amount..."
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Donation;    