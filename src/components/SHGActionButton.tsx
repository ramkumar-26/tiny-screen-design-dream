
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
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'red':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'primary':
      default:
        return 'bg-gradient-to-r from-shg-primary to-shg-secondary hover:from-shg-secondary hover:to-shg-primary text-white';
    }
  };
  
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${getButtonClasses()} text-base py-6 shadow-md transition-all duration-300 ${fullWidth ? 'w-full' : ''}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  );
};

export default SHGActionButton;
