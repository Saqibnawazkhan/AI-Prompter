'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Something went wrong
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            An unexpected error occurred. Please try again or refresh the page.
          </p>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-medium"
            >
              Refresh Page
            </motion.button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-8 text-left w-full max-w-lg">
              <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                Error Details (dev only)
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-auto">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </motion.div>
      );
    }

    return this.props.children;
  }
}
