import React from "react";
import Navigation from "../components/Navigation";
import MenuGrid from "../components/MenuGrid";

const Group: React.FC = () => {
  // Member management items
  const memberItems = [
    {
      title: "Add Member",
      route: "/add-member",
    },
    {
      title: "View Members",
      route: "/view-members",
    },
    {
      title: "Member Role Management",
      route: "/member-roles",
    },
    {
      title: "Remove Member",
      route: "/remove-member",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-shg-primary text-white p-4 text-center">
        <h1 className="text-xl font-bold">Group Management</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 py-3">
        <div className="mt-6 mb-16">
          <h2 className="text-lg font-semibold text-shg-primary mb-2">
            Member Management
          </h2>
          <MenuGrid items={memberItems} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Group;
