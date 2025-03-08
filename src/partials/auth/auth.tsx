import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

function Auth() {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
      {/* Left Section - Image */}
      <div className="hidden md:block md:w-1/2 rounded-l-2xl overflow-hidden">
        <img
          src="https://source.unsplash.com/600x600/?community,helping"
          alt="Join Community"
          className="object-cover w-full h-full border"
        />
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 p-8 space-y-6">
        <h2 className="text-3xl font-bold text-blue-900">
          Join Helping Community
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

          {/* Phone Input */}
          <div className="flex items-center bg-gray-100 p-3 rounded-full">
            <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder="Phone number"
              className="flex-1 bg-transparent outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition"
          >
            Continue
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span className="font-bold text-gray-800 hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
