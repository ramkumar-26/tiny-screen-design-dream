
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
      <div className={`flex items-center justify-center ${color}`}>
        <span className="font-medium mr-1">{label}:</span>
        <span className="font-bold">{value}</span>
        {editLabel && (
          <button 
            onClick={onEdit}
            className="ml-2 bg-yellow-400 text-shg-primary hover:bg-yellow-300 px-2 py-0.5 rounded-full text-xs font-medium transition-colors"
          >
            {editLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default SHGStatusDisplay;
