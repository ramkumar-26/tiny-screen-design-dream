
import React from 'react';
import Navigation from '../components/Navigation';

const About: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <div className="shg-header text-center">
        <h1 className="text-xl font-bold">About Us</h1>
      </div>
      
      <div className="px-4 py-6">
        <div className="shg-card">
          <h2 className="text-xl font-bold text-shg-primary mb-4">About Self Help Groups</h2>
          <p className="mb-4">
            Self Help Groups (SHGs) are informal associations of people who choose to come together to find ways to improve their living conditions. They help their members to achieve collective and individual goals.
          </p>
          <p className="mb-4">
            SHGs comprise mainly women members, enabling them to be financially independent and encouraging entrepreneurship while creating community support.
          </p>
          <h3 className="text-lg font-semibold text-shg-primary mt-6 mb-2">Our Mission</h3>
          <p>
            To empower women through financial inclusion and community support, creating sustainable livelihoods and promoting economic independence.
          </p>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default About;
