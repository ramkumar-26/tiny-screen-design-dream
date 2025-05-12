
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGStatusDisplay from '../components/SHGStatusDisplay';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGFormInput from '../components/SHGFormInput';
import SHGActionButton from '../components/SHGActionButton';
import { useToast } from '@/components/ui/use-toast';

const MonthlySavingSetting: React.FC = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    monthlySaving: "",
    penaltyAmount: "",
    paymentDay: ""
  });
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleSaveChanges = (type: string) => {
    toast({
      title: "Setting Updated",
      description: `${type} has been updated successfully.`
    });
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Penalty & Monthly Saving Setting" />
      
      {/* Status Banner */}
      <div className="bg-gradient-to-b from-shg-primary to-shg-secondary text-white p-4">
        <SHGStatusDisplay label="Monthly Saving" value="₹10 per Month" />
        <SHGStatusDisplay label="Penalty" value="Not Set" />
        <SHGStatusDisplay label="Payment Date" value="Not Set" />
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        {/* Monthly Saving Setting */}
        <SHGInfoCard title="Add New Monthly Saving">
          <div className="p-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="p-3 bg-gray-100 font-medium border-r border-gray-300">
                    Monthly Saving:
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <span className="px-2">₹</span>
                      <input
                        className="flex-1 h-10 rounded-md border border-input px-3 py-1"
                        type="number" 
                        value={settings.monthlySaving}
                        onChange={handleInputChange('monthlySaving')}
                        required
                      />
                      <span className="px-2">per Month</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="my-3">
              <SHGActionButton color="primary" onClick={() => handleSaveChanges('Monthly saving')}>
                Save Changes
              </SHGActionButton>
            </div>
          </div>
        </SHGInfoCard>
        
        {/* Penalty Amount Setting */}
        <SHGInfoCard title="Add New Penalty Amount">
          <div className="p-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="p-3 bg-gray-100 font-medium border-r border-gray-300">
                    Penalty Amount:
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <span className="px-2">₹</span>
                      <input
                        className="flex-1 h-10 rounded-md border border-input px-3 py-1"
                        type="number" 
                        value={settings.penaltyAmount}
                        onChange={handleInputChange('penaltyAmount')}
                        required
                      />
                      <span className="px-2">per Day</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="my-3">
              <SHGActionButton color="primary" onClick={() => handleSaveChanges('Penalty amount')}>
                Save Changes
              </SHGActionButton>
            </div>
          </div>
        </SHGInfoCard>
        
        {/* Payment Day Setting */}
        <SHGInfoCard title="Add New Payment Day">
          <div className="p-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="p-3 bg-gray-100 font-medium border-r border-gray-300">
                    Payment Day:
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <input
                        className="flex-1 h-10 rounded-md border border-input px-3 py-1"
                        type="number" 
                        min="1"
                        max="31"
                        value={settings.paymentDay}
                        onChange={handleInputChange('paymentDay')}
                        required
                      />
                      <span className="px-2">of Each Month</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="my-3">
              <SHGActionButton color="primary" onClick={() => handleSaveChanges('Payment day')}>
                Save Changes
              </SHGActionButton>
            </div>
          </div>
        </SHGInfoCard>
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default MonthlySavingSetting;
