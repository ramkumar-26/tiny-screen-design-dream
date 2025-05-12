
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
  title: string;
  value?: string;
  count?: string;
  route: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, value, count, route }) => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(route)} 
      className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center justify-center text-center h-24"
    >
      <p className="text-sm font-medium text-gray-800">{title}</p>
      {value && <p className="text-lg font-bold text-shg-primary mt-1">₹{value}</p>}
      {count && <p className="text-xs text-gray-500 mt-1">({count})</p>}
    </button>
  );
};

interface MenuGridProps {
  items: {
    title: string;
    value?: string;
    count?: string;
    route: string;
  }[];
}

const MenuGrid: React.FC<MenuGridProps> = ({ items }) => {
  return (
    <div className="shg-menu-grid">
      {items.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          value={item.value}
          count={item.count}
          route={item.route}
        />
      ))}
    </div>
  );
};

export default MenuGrid;
