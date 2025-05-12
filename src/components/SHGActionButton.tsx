
import React from 'react';
import { Button } from '@/components/ui/button';

interface SHGActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'green' | 'red';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const SHGActionButton: React.FC<SHGActionButtonProps> = ({ 
  children, 
  onClick, 
  color = 'primary',
  fullWidth = true,
  type = 'button'
}) => {
  const getButtonClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'red':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'primary':
      default:
        return 'bg-shg-primary hover:bg-shg-accent text-white';
    }
  };
  
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${getButtonClasses()} text-base py-6 ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </Button>
  );
};

export default SHGActionButton;
