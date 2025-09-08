import { Component, ErrorInfo, ReactNode } from "react";
import { PALETTE } from "../configs/app";
import Logo from "../assets/urugo.svg";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen" style={{ background: PALETTE.seasalt }}>
          <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="max-w-md w-full text-center">
              {/* Logo */}
              <div className="mb-8">
                <img
                  src={Logo}
                  alt="UrugoWOC"
                  className="h-20 w-20 mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-primary">
                  Urugo Women's Opportunity Center
                </h1>
              </div>

              {/* Error Message */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <div className="text-6xl text-primary mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Something went wrong
                </h2>
                <p className="text-gray-600 mb-6">
                  We're sorry, but something unexpected happened. Our team has
                  been notified and is working to fix this issue.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="btn-primary px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="btn-primary-outline px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-center"
                  >
                    Go Home
                  </button>
                </div>
              </div>

              {/* Help Text */}
              <p className="text-sm text-gray-500">
                If this problem persists, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
