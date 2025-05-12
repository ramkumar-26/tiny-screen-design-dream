
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
    <div className="bg-shg-primary text-white p-4 flex items-center">
      <button 
        onClick={() => navigate(-1)}
        className="mr-2 p-1 rounded-full hover:bg-white/20"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-lg font-semibold flex-1 text-center mr-8">{title}</h1>
      {date && <span className="text-sm font-medium text-green-300">{date}</span>}
    </div>
  );
};

export default SHGPageHeader;
