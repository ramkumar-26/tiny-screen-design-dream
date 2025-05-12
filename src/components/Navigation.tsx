
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, Phone, Share } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-shg-primary text-white shadow-lg z-10">
      <div className="flex justify-between">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-1 flex-col items-center py-3 ${isActive ? 'bg-shg-accent' : ''}`
          }
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `flex flex-1 flex-col items-center py-3 ${isActive ? 'bg-shg-accent' : ''}`
          }
        >
          <Info size={20} />
          <span className="text-xs mt-1">About Us</span>
        </NavLink>
        
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `flex flex-1 flex-col items-center py-3 ${isActive ? 'bg-shg-accent' : ''}`
          }
        >
          <Phone size={20} />
          <span className="text-xs mt-1">Contact Us</span>
        </NavLink>
        
        <NavLink 
          to="/share" 
          className={({ isActive }) => 
            `flex flex-1 flex-col items-center py-3 ${isActive ? 'bg-shg-accent text-yellow-300 font-medium' : ''}`
          }
        >
          <Share size={20} />
          <span className="text-xs mt-1">SHARE</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
