
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <div className="shg-header text-center">
        <h1 className="text-xl font-bold">Page Not Found</h1>
      </div>
      
      <div className="flex items-center justify-center flex-col px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center w-full">
          <h1 className="text-6xl font-bold text-shg-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
          <a href="/" className="bg-shg-primary hover:bg-shg-accent text-white font-medium py-3 px-6 rounded-md inline-block transition-colors">
            Return to Home
          </a>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default NotFound;
