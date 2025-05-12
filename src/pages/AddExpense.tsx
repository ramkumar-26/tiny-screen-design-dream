import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGStatusDisplay from '../components/SHGStatusDisplay';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGTable from '../components/SHGTable';
import SHGActionButton from '../components/SHGActionButton';
import { WhatsappIcon } from '../components/WhatsappIcon';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const AddExpense: React.FC = () => {
  const { toast } = useToast();
  const currentDate = '12-05-2025';
  
  const [expenseForm, setExpenseForm] = useState({
    description: "",
    amount: "0"
  });
  
  // Existing expenses (empty for demo)
  const monthExpenses: string[][] = [];
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExpenseForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleAddExpense = () => {
    if (!expenseForm.description || expenseForm.amount === "0") {
      toast({
        title: "Validation Error",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Expense Added",
      description: `Expense of ₹${expenseForm.amount} has been added.`
    });
    
    // Reset form
    setExpenseForm({
      description: "",
      amount: "0"
    });
  };
  
  const handleShareWhatsApp = () => {
    toast({
      title: "WhatsApp Share",
      description: "Opening WhatsApp to share expense information..."
    });
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Add Other Expenses" date={currentDate} />
      
      {/* Status Banner */}
      <div className="bg-gradient-to-b from-shg-primary to-shg-secondary text-white">
        <div className="bg-shg-accent p-3">
          <SHGStatusDisplay label="Saving Month" value="June 2019" />
        </div>
        
        <div className="p-3 text-center text-yellow-300">
          <p>Note: Add other expenses only after all the members are added.</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        {/* Add Expense Form */}
        <SHGInfoCard title="Enter Other Expense Details">
          <div className="p-2">
            <table className="w-full border-collapse mb-3">
              <thead>
                <tr className="bg-shg-primary text-white">
                  <th className="p-2 border border-gray-300">Description</th>
                  <th className="p-2 border border-gray-300 w-1/3">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1">
                    <Textarea
                      className="min-h-[100px] w-full"
                      value={expenseForm.description}
                      onChange={handleInputChange('description')}
                      placeholder="Enter expense description"
                    />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <div className="flex items-center">
                      <span className="px-1">₹</span>
                      <input
                        className="w-full h-10 rounded-md border border-input px-2 py-1"
                        type="number"
                        value={expenseForm.amount}
                        onChange={handleInputChange('amount')}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <SHGActionButton color="green" onClick={handleAddExpense}>
              Add Other Expense
            </SHGActionButton>
          </div>
        </SHGInfoCard>
        
        {/* Existing Expenses */}
        <SHGInfoCard title="This Month All Other Expenses">
          <SHGTable 
            columns={[
              { header: "Expense Descriptions", width: "w-3/4" },
              { header: "Amount", width: "w-1/4" },
            ]}
            data={monthExpenses}
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

export default AddExpense;
