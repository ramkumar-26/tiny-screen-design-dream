
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, PiggyBank, BarChart3 } from 'lucide-react';
import SHGHeader from '../components/SHGHeader';
import FinancialSummary from '../components/FinancialSummary';
import MenuGrid from '../components/MenuGrid';
import Navigation from '../components/Navigation';

const Index: React.FC = () => {
  // Financial summary data
  const financialData = {
    totalAmount: '13,040.00',
    shareAmount: '6,520.00',
    currentBalance: '12,240.00',
    totalLoanGiven: '800.00',
    loanTakenByYou: '800.00',
  };

  // Menu items for personal reports
  const personalReportItems = [
    {
      title: "Month Summary",
      icon: <Calendar size={20} className="text-shg-secondary" />,
      route: "/month-summary",
    },
    {
      title: "Govt. Schemes",
      count: "28",
      icon: <Users size={20} className="text-shg-secondary" />,
      route: "/govt-schemes",
    },
    {
      title: "Your Loan",
      value: "800.00",
      icon: <PiggyBank size={20} className="text-shg-secondary" />,
      route: "/your-loan",
    },
    {
      title: "Monthly Loans",
      value: "0.00",
      count: "0",
      icon: <BarChart3 size={20} className="text-shg-secondary" />,
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
      title: "Expenses",
      value: "0.00",
      count: "0",
      route: "/other-expenses",
    },
    {
      title: "Income",
      value: "6,520.00",
      count: "1", 
      route: "/other-income",
    },
  ];

  // Menu items for loans and sheets
  const loansAndSheetsItems = [
    {
      title: "Loan Risk-Ratio",
      route: "/loan-risk",
    },
    {
      title: "All Loans",
      value: "800.00",
      count: "1",
      route: "/all-loans",
    },
    {
      title: "SHG Balance",
      route: "/my-shg-balance",
    },
    {
      title: "Member Balance",
      route: "/members-balance",
    },
  ];

  // Menu items for settings
  const settingsItems = [
    {
      title: "Profile",
      route: "/profile-settings",
    },
    {
      title: "Rules & Notices",
      route: "/rules-notice",
    },
    {
      title: "Group Details",
      route: "/detail-info",
    },
    {
      title: "Logout",
      route: "/logout",
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-20">
      {/* Header Section */}
      <SHGHeader
        groupName="Thiruvalluvar Women SHG"
        shgCode="SHG2865C"
        president="Mrs. Sumathi D (President)"
        month="Jun"
        year="2024"
      />

      {/* Main Content */}
      <div className="px-4 py-3">
        {/* Quick Action Cards */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
          <Link 
            to="/monthly-savings" 
            className="flex-shrink-0 w-40 bg-gradient-to-br from-green-500 to-teal-600 p-4 rounded-xl text-white font-medium flex flex-col justify-between h-32 snap-start shg-card-hover"
          >
            <PiggyBank size={24} />
            <div>
              <span className="block text-xs text-white/80">Monthly</span>
              <span className="text-lg">Add Savings</span>
            </div>
          </Link>
          
          <Link
            to="/provide-loan" 
            className="flex-shrink-0 w-40 bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl text-white font-medium flex flex-col justify-between h-32 snap-start shg-card-hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h6a4 4 0 0 1 4 4v4H5v-8Z"/><path d="M9 12V6.5a2.5 2.5 0 0 1 5 0V12"/><path d="M13 21h2a4 4 0 0 0 4-4v-3a3 3 0 0 0-3-3h-2"/></svg>
            <div>
              <span className="block text-xs text-white/80">Manage</span>
              <span className="text-lg">Loans</span>
            </div>
          </Link>
          
          <Link
            to="/enter-info" 
            className="flex-shrink-0 w-40 bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-xl text-white font-medium flex flex-col justify-between h-32 snap-start shg-card-hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
            <div>
              <span className="block text-xs text-white/80">Record</span>
              <span className="text-lg">Transactions</span>
            </div>
          </Link>
        </div>
      
        {/* Financial Summary */}
        <FinancialSummary {...financialData} />

        {/* Personal Reports Section */}
        <div className="mt-7">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-shg-primary">Reports & Schemes</h2>
            <Link to="/reports" className="flex items-center text-sm text-shg-secondary">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <MenuGrid items={personalReportItems} />
        </div>

        {/* Account Management Section */}
        <div className="mt-7">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-shg-primary">Accounts</h2>
            <Link to="/accounts" className="flex items-center text-sm text-shg-secondary">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <MenuGrid items={accountItems} />
        </div>

        {/* Loans and Sheets Section */}
        <div className="mt-7">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-shg-primary">Loans & Balance Sheets</h2>
            <Link to="/loans-sheets" className="flex items-center text-sm text-shg-secondary">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <MenuGrid items={loansAndSheetsItems} />
        </div>

        {/* Settings Section */}
        <div className="mt-7 mb-16">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-shg-primary">Settings</h2>
          </div>
          <MenuGrid items={settingsItems} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
