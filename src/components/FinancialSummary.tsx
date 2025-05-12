
import React from 'react';

interface FinancialSummaryProps {
  totalAmount: string;
  shareAmount: string;
  currentBalance: string;
  totalLoanGiven: string;
  loanTakenByYou: string;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  totalAmount,
  shareAmount,
  currentBalance,
  totalLoanGiven,
  loanTakenByYou
}) => {
  return (
    <div className="space-y-3">
      <div className="shg-stat">
        <p className="text-sm font-medium">SHG Total Amount:</p>
        <p className="text-xl font-bold">₹{totalAmount}</p>
      </div>
      
      <div className="shg-stat">
        <p className="text-sm font-medium">Your Share in SHG:</p>
        <p className="text-xl font-bold">₹{shareAmount}</p>
      </div>
      
      <div className="shg-stat">
        <p className="text-sm font-medium">Current Balance:</p>
        <p className="text-xl font-bold">₹{currentBalance}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-shg-accent">
          <p className="text-xs text-gray-600">Total Loan Given:</p>
          <p className="text-lg font-bold text-shg-accent">₹{totalLoanGiven}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-md border-l-4 border-shg-accent">
          <p className="text-xs text-gray-600">Loan Taken By You:</p>
          <p className="text-lg font-bold text-shg-accent">₹{loanTakenByYou}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
