import React from "react";
import Navigation from "../components/Navigation";
import MenuGrid from "../components/MenuGrid";

const Savings: React.FC = () => {
  // Savings management items
  const savingsItems = [
    {
      title: "Add Monthly Savings",
      route: "/add-savings",
    },
    {
      title: "View My Savings",
      route: "/my-savings",
    },
    {
      title: "View Group Savings",
      route: "/group-savings",
    },
    {
      title: "Monthly Savings Report",
      route: "/savings-report",
    },
  ];

  // Loan management items
  const loanItems = [
    {
      title: "Manage Loans",
      route: "/manage-loans",
    },
    {
      title: "Request Loan",
      route: "/request-loan",
    },
    {
      title: "Record Loan Payment",
      route: "/loan-payment",
    },
    {
      title: "Loan Reports",
      route: "/loan-reports",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-shg-primary text-white p-4 text-center">
        <h1 className="text-xl font-bold">Savings & Loans</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 py-3">
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-shg-primary mb-2">
            Savings Management
          </h2>
          <MenuGrid items={savingsItems} />
        </div>

        <div className="mt-6 mb-16">
          <h2 className="text-lg font-semibold text-shg-primary mb-2">
            Loan Management
          </h2>
          <MenuGrid items={loanItems} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Savings;
