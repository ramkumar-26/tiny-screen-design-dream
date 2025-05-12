
import React from 'react';

interface SHGHeaderProps {
  groupName: string;
  shgCode: string;
  president: string;
  month: string;
  year: string;
}

const SHGHeader: React.FC<SHGHeaderProps> = ({ 
  groupName, 
  shgCode, 
  president, 
  month, 
  year 
}) => {
  return (
    <div className="shg-header text-center">
      <div className="bg-shg-accent text-white px-3 py-2 rounded-md mb-3 text-sm">
        Referral Offer: ₹500 per SHG!
      </div>
      
      <h1 className="text-xl font-bold mb-1">{groupName}</h1>
      <p className="text-sm mb-2">[ SHG Code: {shgCode} ]</p>
      <p className="text-sm italic mb-2">{president}</p>
      
      <div className="flex justify-between mt-4">
        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium flex-1 mr-2">
          View INFO
        </button>
        <button className="bg-white text-shg-primary px-4 py-2 rounded-md text-sm font-medium flex-1 ml-2">
          Enter INFO
        </button>
      </div>
      
      <p className="mt-4 text-sm">Saving Month: {month} {year}</p>
    </div>
  );
};

export default SHGHeader;
