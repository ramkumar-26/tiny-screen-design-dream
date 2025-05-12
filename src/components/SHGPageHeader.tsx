
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SHGPageHeaderProps {
  title: string;
  date?: string;
}

const SHGPageHeader: React.FC<SHGPageHeaderProps> = ({ title, date }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-shg-primary to-shg-secondary text-white p-4 shadow-md relative">
      <div className="flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="absolute left-3 p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold w-full text-center">{title}</h1>
        {date && (
          <span className="absolute right-4 text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium">
            {date}
          </span>
        )}
      </div>
    </div>
  );
};

export default SHGPageHeader;
