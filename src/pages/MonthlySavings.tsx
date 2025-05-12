import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGStatusDisplay from '../components/SHGStatusDisplay';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGTable from '../components/SHGTable';
import SHGActionButton from '../components/SHGActionButton';
import { WhatsappIcon } from '../components/WhatsappIcon';
import { useToast } from '@/components/ui/use-toast';

const MonthlySavings: React.FC = () => {
  const { toast } = useToast();
  
  const [savingsForm, setSavingsForm] = useState({
    member: "Select a Member",
    saving: "0",
    penalty: "0"
  });
  
  const [pendingForm, setPendingForm] = useState({
    member: "Select a Member",
    saving: "0",
    penalty: "0"
  });
  
  // Existing submissions (empty for demo)
  const submittedSavings: string[][] = [];
  const pendingMembers: string[][] = [];
  
  const handleSavingsInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSavingsForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handlePendingInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPendingForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleAddSaving = () => {
    if (savingsForm.member === "Select a Member" || !savingsForm.saving) {
      toast({
        title: "Validation Error",
        description: "Please select a member and enter saving amount",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Saving Added",
      description: `Saving of ₹${savingsForm.saving} has been recorded.`
    });
  };
  
  const handleMarkPending = () => {
    if (pendingForm.member === "Select a Member") {
      toast({
        title: "Validation Error",
        description: "Please select a member",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Member Marked",
      description: `Member has been marked as pending for this month.`
    });
  };
  
  const handleShareWhatsApp = () => {
    toast({
      title: "WhatsApp Share",
      description: "Opening WhatsApp to share savings information..."
    });
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Collect Monthly Savings" />
      
      {/* Status Banner */}
      <div className="bg-gradient-to-b from-shg-primary to-shg-secondary text-white">
        <SHGStatusDisplay label="Monthly Saving" value="₹10/month" editLabel="Edit" />
        <SHGStatusDisplay label="Penalty" value="Not Set" editLabel="Set" />
        <SHGStatusDisplay label="Payment Date" value="Not Set" editLabel="Set" />
        
        <div className="bg-shg-accent p-3">
          <SHGStatusDisplay label="Saving Month" value="June 2019" />
        </div>
        
        <div className="p-3 text-center text-yellow-300">
          <p>Note: Collect monthly savings only after registration of all members.</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        {/* Collect Monthly Savings Form */}
        <SHGInfoCard title="Collect Monthly Savings">
          <div className="p-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-shg-primary text-white">
                  <th className="p-2 border border-gray-300">Member</th>
                  <th className="p-2 border border-gray-300">Saving</th>
                  <th className="p-2 border border-gray-300">Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1">
                    <select 
                      className="w-full h-10 rounded-md border border-input px-3 py-2"
                      value={savingsForm.member}
                      onChange={handleSavingsInputChange('member')}
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
                        value={savingsForm.saving}
                        onChange={handleSavingsInputChange('saving')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-1">
                    <div className="flex items-center">
                      <span className="px-1">₹</span>
                      <input
                        className="w-full h-10 rounded-md border border-input px-2 py-1"
                        type="number"
                        value={savingsForm.penalty}
                        onChange={handleSavingsInputChange('penalty')}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="my-3">
              <SHGActionButton color="green" onClick={handleAddSaving}>
                Add Saving
              </SHGActionButton>
            </div>
          </div>
        </SHGInfoCard>
        
        {/* Mark as Pending Form */}
        <SHGInfoCard title="Mark as Full Month Pending">
          <div className="p-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-shg-primary text-white">
                  <th className="p-2 border border-gray-300">Member</th>
                  <th className="p-2 border border-gray-300">Saving</th>
                  <th className="p-2 border border-gray-300">Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1">
                    <select 
                      className="w-full h-10 rounded-md border border-input px-3 py-2"
                      value={pendingForm.member}
                      onChange={handlePendingInputChange('member')}
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
                        value={pendingForm.saving}
                        onChange={handlePendingInputChange('saving')}
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-1">
                    <div className="flex items-center">
                      <span className="px-1">₹</span>
                      <input
                        className="w-full h-10 rounded-md border border-input px-2 py-1"
                        type="number"
                        value={pendingForm.penalty}
                        onChange={handlePendingInputChange('penalty')}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="my-3">
              <SHGActionButton color="green" onClick={handleMarkPending}>
                Mark as Pending
              </SHGActionButton>
            </div>
          </div>
        </SHGInfoCard>
        
        {/* Submitted Members */}
        <SHGInfoCard title="Savings Submitted Members">
          <SHGTable 
            columns={[
              { header: "Member" },
              { header: "Saving" },
              { header: "Penalty" },
            ]}
            data={submittedSavings}
            showDelete={true}
          />
        </SHGInfoCard>
        
        {/* Pending Members */}
        <SHGInfoCard title="Marked as Full Month Pending">
          <SHGTable 
            columns={[
              { header: "Member" },
              { header: "Saving" },
              { header: "Penalty" },
            ]}
            data={pendingMembers}
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

export default MonthlySavings;
