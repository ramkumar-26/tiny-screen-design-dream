
import React from 'react';
import Navigation from '../components/Navigation';

const Contact: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <div className="shg-header text-center">
        <h1 className="text-xl font-bold">Contact Us</h1>
      </div>
      
      <div className="px-4 py-6">
        <div className="shg-card">
          <h2 className="text-xl font-bold text-shg-primary mb-4">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-shg-primary focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-shg-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-shg-primary focus:border-transparent"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-shg-primary hover:bg-shg-accent text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-shg-primary mb-3">Contact Information</h3>
            <p className="mb-2"><span className="font-medium">Address:</span> 123 SHG Street, Chennai, Tamil Nadu</p>
            <p className="mb-2"><span className="font-medium">Phone:</span> +91 98765 43210</p>
            <p><span className="font-medium">Email:</span> support@shgapp.com</p>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Contact;
