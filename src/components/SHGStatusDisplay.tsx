
import React from 'react';

interface SHGStatusDisplayProps {
  label: string;
  value: string;
  editLabel?: string;
  onEdit?: () => void;
  color?: string;
}

const SHGStatusDisplay: React.FC<SHGStatusDisplayProps> = ({ 
  label, 
  value, 
  editLabel, 
  onEdit,
  color = "text-white" 
}) => {
  return (
    <div className="text-center py-2">
      <p className={`text-base mb-1 ${color}`}>
        {label}: {value} 
        {editLabel && (
          <button 
            onClick={onEdit}
            className="ml-2 text-yellow-300 hover:text-yellow-100 font-medium text-sm"
          >
            ({editLabel})
          </button>
        )}
      </p>
    </div>
  );
};

export default SHGStatusDisplay;
