
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Inbox, Menu } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-shg-primary to-shg-secondary text-white shadow-lg z-10">
      <div className="flex justify-between">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-1 flex-col items-center py-3 ${isActive ? 'bg-shg-accent' : 'hover:bg-white/10'}`
          }
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        <NavLink 
          to="/group-info" 
          className={({ isActive }) => 
            `flex flex-1 flex-col items-center py-3 ${isActive ? 'bg-shg-accent' : 'hover:bg-white/10'}`
          }
        >
          <Users size={20} />
          <span className="text-xs mt-1">Group</span>
        </NavLink>
        
        <NavLink 
          to="/monthly-savings" 
          className={({ isActive }) => 
            `flex flex-1 flex-col items-center py-3 ${isActive ? 'bg-shg-accent' : 'hover:bg-white/10'}`
          }
        >
          <Inbox size={20} />
          <span className="text-xs mt-1">Savings</span>
        </NavLink>
        
        <NavLink 
          to="/info" 
          className={({ isActive }) => 
            `flex flex-1 flex-col items-center py-3 ${isActive ? 'bg-shg-accent text-yellow-100 font-medium' : 'hover:bg-white/10'}`
          }
        >
          <Menu size={20} />
          <span className="text-xs mt-1">More</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
