import { Link } from "react-router-dom";
import { PALETTE } from "../configs/app";
import Logo from "../assets/urugo.svg";
import Footer from "../partials/footer";

function NotFound() {
  return (
    <div className="min-h-screen" style={{ background: PALETTE.seasalt }}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
        <div className="max-w-lg w-full text-center">
          {/* Logo */}
          <div className="mb-8">
            <img src={Logo} alt="UrugoWOC" className="h-20 w-20 mx-auto mb-4" />
          </div>

          {/* 404 Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="text-8xl text-primary mb-4">404</div>
            <h1 className="text-3xl font-bold text-primary mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="btn-primary px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-center"
              >
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-primary-outline px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Go Back
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Explore Our Site
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
              >
                About Us
              </Link>
              <Link
                to="/events"
                className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
              >
                Events
              </Link>
              <Link
                to="/accommodations"
                className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
              >
                Accommodations
              </Link>
              <Link
                to="/dining"
                className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
              >
                Dining
              </Link>
              <Link
                to="/marketplace"
                className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
              >
                Marketplace
              </Link>
              <Link
                to="/news"
                className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm"
              >
                News
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-6">
            Need help? Contact our support team for assistance.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NotFound;
