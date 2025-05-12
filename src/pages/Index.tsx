import React from "react";
import SHGHeader from "../components/SHGHeader";
import FinancialSummary from "../components/FinancialSummary";
import MenuGrid from "../components/MenuGrid";
import Navigation from "../components/Navigation";

const Index: React.FC = () => {
  // Financial summary data
  const financialData = {
    totalAmount: "13,040.00",
    shareAmount: "6,520.00",
    currentBalance: "12,240.00",
    totalLoanGiven: "800.00",
    loanTakenByYou: "800.00",
  };

  // Menu items for personal reports
  const personalReportItems = [
    {
      title: "Month Wise Summary Report",
      route: "/month-summary",
    },
    {
      title: "Your Loan",
      value: "800.00",
      route: "/your-loan",
    },
    {
      title: "Loans In Month",
      value: "0.00",
      count: "0",
      route: "/loans-month",
    },
  ];

  // Menu items for account management
  const accountItems = [
    {
      title: "Savings Remains",
      count: "4",
      route: "/savings-remains",
    },
    {
      title: "Loans Remains",
      count: "0",
      route: "/loans-remains",
    },
    {
      title: "Other Expenses",
      value: "0.00",
      count: "0",
      route: "/other-expenses",
    },
    {
      title: "Other Income",
      value: "6,520.00",
      count: "1",
      route: "/other-income",
    },
  ];

  // Menu items for loans and sheets
  const loansAndSheetsItems = [
    {
      title: "Ask Loan & Loan Risk-Ratio",
      route: "/loan-risk",
    },
    {
      title: "All Loans",
      value: "800.00",
      count: "1",
      route: "/all-loans",
    },
    {
      title: "My SHG Balance-Sheet",
      route: "/my-shg-balance",
    },
    {
      title: "Members Balance-Sheet",
      route: "/members-balance",
    },
  ];

  // Menu items for additional information
  const additionalItems = [
    {
      title: "Other Expenses Balance-Sheet",
      route: "/other-expenses-sheet",
    },
    {
      title: "Other Income Balance-Sheet",
      route: "/other-income-sheet",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      {/* Header Section */}
      <SHGHeader
        groupName="Thiruvalluvar Women SHG"
        groupId="SHG2865C"
        president="Mrs. Sumathi D (President)"
        month="Jun"
        year="2024"
      />

      {/* Main Content */}
      <div className="px-4 py-3">
        {/* Financial Summary */}
        <FinancialSummary {...financialData} />

        {/* Personal Reports Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-shg-primary mb-2">
            Reports
          </h2>
          <MenuGrid items={personalReportItems} />
        </div>

        {/* Account Management Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-shg-primary mb-2">
            Accounts
          </h2>
          <MenuGrid items={accountItems} />
        </div>

        {/* Loans and Sheets Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-shg-primary mb-2">
            Loans & Balance Sheets
          </h2>
          <MenuGrid items={loansAndSheetsItems} />
        </div>

        {/* Additional Information Section */}
        <div className="mt-6 mb-16">
          <h2 className="text-lg font-semibold text-shg-primary mb-2">
            Information
          </h2>
          <MenuGrid items={additionalItems} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
