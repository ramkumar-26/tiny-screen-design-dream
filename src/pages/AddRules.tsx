import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGTable from '../components/SHGTable';
import SHGActionButton from '../components/SHGActionButton';
import { WhatsappIcon } from '../components/WhatsappIcon';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/input';

const AddRules: React.FC = () => {
  const { toast } = useToast();
  
  const [ruleForm, setRuleForm] = useState({
    description: "",
    type: "Select"
  });
  
  // Existing rules (empty for demo)
  const existingRules: string[][] = [];
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    setRuleForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleSubmit = () => {
    if (!ruleForm.description || ruleForm.type === "Select") {
      toast({
        title: "Validation Error",
        description: "Please fill in all the fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Rule Added",
      description: "New rule has been added successfully."
    });
    
    // Reset form
    setRuleForm({
      description: "",
      type: "Select"
    });
  };
  
  const handleShareWhatsApp = () => {
    // In a real app, this would open WhatsApp with prefilled content
    toast({
      title: "WhatsApp Share",
      description: "Opening WhatsApp to share SHG rules..."
    });
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Add Rules & Notice" />
      
      {/* Main Content */}
      <div className="p-4">
        {/* Add Rules Form */}
        <SHGInfoCard title="Add Rules & Notice of SHG">
          <div className="p-2">
            <table className="w-full border-collapse mb-3">
              <tbody>
                <tr>
                  <th className="p-3 bg-shg-primary text-white border border-gray-300">
                    Rules/Notice Description
                  </th>
                  <th className="p-3 bg-shg-primary text-white border border-gray-300 w-1/3">
                    Type
                  </th>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1">
                    <Textarea
                      className="min-h-[100px] w-full"
                      value={ruleForm.description}
                      onChange={handleInputChange('description') as any}
                      placeholder="Enter rule or notice description"
                    />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <select 
                      className="w-full h-10 rounded-md border border-input px-3 py-2"
                      value={ruleForm.type}
                      onChange={handleInputChange('type') as any}
                    >
                      <option value="Select">Select</option>
                      <option value="Rule">Rule</option>
                      <option value="Notice">Notice</option>
                      <option value="Important">Important</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <SHGActionButton color="green" onClick={handleSubmit}>
              ADD
            </SHGActionButton>
          </div>
        </SHGInfoCard>
        
        {/* Added Rules List */}
        <SHGInfoCard title="Added Rules and Notice">
          <SHGTable 
            columns={[
              { header: "Description", width: "w-3/4" },
              { header: "Type", width: "w-1/4" },
            ]}
            data={existingRules}
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

export default AddRules;
