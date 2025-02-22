import { ArrowLeft, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Error = () => {
  ;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <XCircle className="h-24 w-24 text-red-500" />
        </div>
        
        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Home Button */}
        <Link to={'/'}
          className="inline-flex items-center px-6 py-3 bg-[#3674B5] hover:border-white text-white font-medium rounded-lg transition-colors duration-200 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;