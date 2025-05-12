
import React from 'react';
import { Button } from '@/components/ui/button';

interface SHGActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'green' | 'red';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

const SHGActionButton: React.FC<SHGActionButtonProps> = ({ 
  children, 
  onClick, 
  color = 'primary',
  fullWidth = true,
  type = 'button',
  icon
}) => {
  const getButtonClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white';
      case 'red':
        return 'bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-90 text-white';
      case 'primary':
      default:
        return 'bg-gradient-to-r from-shg-primary to-shg-secondary hover:opacity-90 text-white';
    }
  };
  
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${getButtonClasses()} text-base py-6 rounded-xl shadow-md transition-all duration-300 ${fullWidth ? 'w-full' : ''}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  );
};

export default SHGActionButton;
