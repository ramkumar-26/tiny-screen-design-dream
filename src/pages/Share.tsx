
import React from 'react';
import Navigation from '../components/Navigation';
import { Share } from 'lucide-react';

const SharePage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <div className="shg-header text-center">
        <h1 className="text-xl font-bold">Share</h1>
      </div>
      
      <div className="px-4 py-6">
        <div className="shg-card text-center">
          <div className="bg-shg-light p-6 rounded-lg mb-6 inline-flex items-center justify-center">
            <Share size={48} className="text-shg-primary" />
          </div>
          
          <h2 className="text-xl font-bold text-shg-primary mb-4">Share with Others</h2>
          <p className="mb-6 text-gray-600">
            Help others discover this SHG app and invite new members to join our community.
          </p>
          
          <div className="space-y-3">
            <button className="w-full bg-[#25D366] text-white font-medium py-3 px-4 rounded-md">
              Share via WhatsApp
            </button>
            
            <button className="w-full bg-[#3b5998] text-white font-medium py-3 px-4 rounded-md">
              Share via Facebook
            </button>
            
            <button className="w-full bg-shg-primary text-white font-medium py-3 px-4 rounded-md">
              Share via SMS
            </button>
            
            <button className="w-full bg-gray-100 text-gray-800 border border-gray-300 font-medium py-3 px-4 rounded-md">
              Copy Referral Link
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <h3 className="font-semibold text-shg-accent mb-2">Earn Rewards!</h3>
            <p className="text-sm text-gray-700">
              Earn ₹500 for every new SHG that joins through your referral!
            </p>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default SharePage;
