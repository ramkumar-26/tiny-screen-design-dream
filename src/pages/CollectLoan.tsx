
import React from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGStatusDisplay from '../components/SHGStatusDisplay';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGTable from '../components/SHGTable';
import { WhatsappIcon } from '../components/WhatsappIcon';
import { useToast } from '@/components/ui/use-toast';

const CollectLoan: React.FC = () => {
  const { toast } = useToast();
  
  // Loan installment data (empty for demo)
  const loanInstallments: string[][] = [];
  const loansPending: string[][] = [];
  
  const handleShareWhatsApp = () => {
    toast({
      title: "WhatsApp Share",
      description: "Opening WhatsApp to share loan collection information..."
    });
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Collect Loans & Interest" />
      
      {/* Status Banner */}
      <div className="bg-gradient-to-b from-shg-primary to-shg-secondary text-white p-4">
        <SHGStatusDisplay label="Penalty" value="Please Set" editLabel="Set" onEdit={() => {}} />
        <SHGStatusDisplay label="Payment Date" value="Not Set" editLabel="Edit" onEdit={() => {}} />
        
        <div className="bg-shg-accent p-3">
          <SHGStatusDisplay label="Saving Month" value="June 2019" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        {/* No Loan Notice */}
        <div className="bg-shg-primary text-white p-5 rounded-lg mb-4 text-center">
          <p className="text-lg font-semibold mb-1">
            There is no loan installment to collect in this Saving Month!
          </p>
          <p className="text-sm">
            Note: Loan provided in this saving month will be collected from next saving month.
          </p>
        </div>
        
        {/* Loan Installment Paid Members */}
        <SHGInfoCard title="Loan Installment Paid Members">
          <SHGTable 
            columns={[
              { header: "Member" },
              { header: "INSTL" },
              { header: "INT" },
              { header: "Penalty" },
              { header: "Loan Remains" },
            ]}
            data={loanInstallments}
            showDelete={true}
          />
        </SHGInfoCard>
        
        {/* Loans Marked as Pending */}
        <SHGInfoCard title="Loans Marked as Full Month Pending">
          <SHGTable 
            columns={[
              { header: "Member" },
              { header: "Loan(P)" },
              { header: "INT(P)" },
              { header: "Penalty(P)" },
            ]}
            data={loansPending}
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

export default CollectLoan;
