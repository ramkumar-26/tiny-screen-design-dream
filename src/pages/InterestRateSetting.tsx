
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGActionButton from '../components/SHGActionButton';
import { useToast } from '@/components/ui/use-toast';

const InterestRateSetting: React.FC = () => {
  const { toast } = useToast();
  const [interestRate, setInterestRate] = useState("");
  
  const handleSubmit = () => {
    if (!interestRate) {
      toast({
        title: "Validation Error",
        description: "Please enter an interest rate",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Interest Rate Updated",
      description: `New interest rate of ${interestRate}% per month has been set.`
    });
    
    // Reset form
    setInterestRate("");
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Monthly Interest Rates Setting" />
      
      {/* Main Content */}
      <div className="p-4">
        {/* Interest Rate Setting Form */}
        <SHGInfoCard title="Add Monthly Interest Rates">
          <div className="p-2">
            <table className="w-full border-collapse mb-3">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="p-3 bg-gray-100 font-medium border-r border-gray-300">
                    New Interest Rate:
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <input
                        className="flex-1 h-10 rounded-md border border-input px-3 py-1"
                        type="number" 
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                      />
                      <span className="px-2">% per Month</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <SHGActionButton color="primary" onClick={handleSubmit}>
              Add Interest Rate
            </SHGActionButton>
          </div>
        </SHGInfoCard>
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default InterestRateSetting;
