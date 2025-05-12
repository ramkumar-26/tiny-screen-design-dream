
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
    <div className="text-center py-2.5">
      <div className={`flex items-center justify-center ${color}`}>
        <span className="font-medium mr-2">{label}:</span>
        <span className="font-bold">{value}</span>
        {editLabel && (
          <button 
            onClick={onEdit}
            className="ml-3 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
            aria-label={editLabel}
          >
            {editLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default SHGStatusDisplay;
