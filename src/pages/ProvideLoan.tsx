import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGStatusDisplay from '../components/SHGStatusDisplay';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGTable from '../components/SHGTable';
import SHGActionButton from '../components/SHGActionButton';
import { WhatsappIcon } from '../components/WhatsappIcon';
import { useToast } from '@/components/ui/use-toast';

const ProvideLoan: React.FC = () => {
  const { toast } = useToast();
  
  const [loanForm, setLoanForm] = useState({
    member: "Select a Member",
    amount: "0",
    interestRate: "Select Interest"
  });
  
  // Existing loans (empty for demo)
  const existingLoans: string[][] = [];
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLoanForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleProvideLoan = () => {
    if (loanForm.member === "Select a Member" || loanForm.amount === "0" || loanForm.interestRate === "Select Interest") {
      toast({
        title: "Validation Error",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Loan Provided",
      description: `Loan of ₹${loanForm.amount} has been provided with ${loanForm.interestRate}% interest.`
    });
  };
  
  const handleShareWhatsApp = () => {
    toast({
      title: "WhatsApp Share",
      description: "Opening WhatsApp to share loan information..."
    });
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Provide This Month Loans" />
      
      {/* Status Banner */}
      <div className="bg-gradient-to-b from-shg-primary to-shg-secondary text-white p-4">
        <SHGStatusDisplay label="Interest Rate" value="Not Set" editLabel="Set" onEdit={() => {}} />
        <SHGStatusDisplay label="Current Balance" value="₹10.00" />
        
        <div className="bg-shg-accent p-3">
          <SHGStatusDisplay label="Saving Month" value="June 2019" />
        </div>
        
        <div className="p-3 text-center text-yellow-300">
          <p>Note: First add all members then provide loan.</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        {/* Provide Loan Form */}
        <SHGInfoCard title="Provide Loan by Selecting Member">
          <div className="p-2">
            <table className="w-full border-collapse mb-3">
              <thead>
                <tr className="bg-shg-primary text-white">
                  <th className="p-2 border border-gray-300">Member</th>
                  <th className="p-2 border border-gray-300">Loan</th>
                  <th className="p-2 border border-gray-300">%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1">
                    <select 
                      className="w-full h-10 rounded-md border border-input px-3 py-2"
                      value={loanForm.member}
                      onChange={handleInputChange('member')}
                    >
                      <option>Select a Member</option>
                      <option>Mr. Testing</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-1">
                    <div className="flex items-center">
                      <span className="px-1">₹</span>
                      <input
                        className="w-full h-10 rounded-md border border-input px-2 py-1"
                        type="number"
                        value={loanForm.amount}
                        onChange={handleInputChange('amount')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-1">
                    <select 
                      className="w-full h-10 rounded-md border border-input px-3 py-2"
                      value={loanForm.interestRate}
                      onChange={handleInputChange('interestRate')}
                    >
                      <option>Select Interest</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <SHGActionButton color="green" onClick={handleProvideLoan}>
              Provide Loan
            </SHGActionButton>
          </div>
        </SHGInfoCard>
        
        {/* Existing Loans */}
        <SHGInfoCard title="Loans provided in this month">
          <SHGTable 
            columns={[
              { header: "Member" },
              { header: "Loan" },
              { header: "%" },
              { header: "Int(M)" },
            ]}
            data={existingLoans}
            showDelete={true}
          />
        </SHGInfoCard>
        
        {/* WhatsApp Share Section */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <h2 className="text-xl font-bold text-red-500 text-center mb-4">
            Send information to members on WhatsApp
          </h2>
          
          <button 
            onClick={handleShareWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg mx-auto flex items-center justify-center"
          >
            <WhatsappIcon className="mr-2" />
            <span>WhatsApp Now</span>
          </button>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default ProvideLoan;
