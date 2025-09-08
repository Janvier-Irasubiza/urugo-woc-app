import { Component, ErrorInfo, ReactNode } from 'react';
import { PALETTE } from '../configs/app';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class PageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('PageErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4" style={{ background: PALETTE.seasalt }}>
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-6xl text-primary mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-primary mb-4">Something went wrong</h2>
              <p className="text-gray-600 mb-6">
                We encountered an error while loading this page. Please try again or go back to the previous page.
              </p>
              
              {/* Error Details (only in development) */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                >
                  Try Again
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="btn-primary-outline px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;
