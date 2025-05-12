import React from "react";
import Navigation from "../components/Navigation";
import MenuGrid from "../components/MenuGrid";

const More: React.FC = () => {
  // Settings items
  const settingsItems = [
    {
      title: "Profile",
      route: "/profile",
    },
    {
      title: "Rules & Notices",
      route: "/rules-notice",
    },
    {
      title: "Group Details",
      route: "/group-details",
    },
    {
      title: "Logout",
      route: "/logout",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-shg-primary text-white p-4 text-center">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 py-3">
        {/* Settings Section */}
        <div className="mt-6 mb-16">
          <MenuGrid items={settingsItems} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default More;
