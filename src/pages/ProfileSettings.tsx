
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGFormInput from '../components/SHGFormInput';
import SHGActionButton from '../components/SHGActionButton';
import { useToast } from '@/components/ui/use-toast';

const ProfileSettings: React.FC = () => {
  const { toast } = useToast();
  const currentDate = '12-05-2025';
  
  const [profileForm, setProfileForm] = useState({
    prefix: "Mr",
    name: "Testing",
    shgName: "Testing",
    mobile: "6383649920",
    email: "ndlkdkm@gmail.com",
    password: "••••••••••"
  });
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Profile Settings" date={currentDate} />
      
      {/* User Banner */}
      <div className="bg-gradient-to-b from-shg-primary to-shg-secondary text-white p-6">
        <h2 className="text-xl font-semibold text-center">Mr. Testing (President)</h2>
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <tbody>
              <SHGFormInput
                label="SHG Name"
                value={profileForm.shgName}
                onChange={handleInputChange('shgName')}
              />
              
              <tr className="border border-gray-300">
                <td className="p-3 bg-[#EFEED1] font-medium border-r border-gray-300 w-1/3">
                  Your Name:
                </td>
                <td className="p-2">
                  <div className="flex">
                    <select 
                      className="w-24 h-10 rounded-md border border-input mr-1 px-3 py-1"
                      value={profileForm.prefix}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, prefix: e.target.value }))}
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                    </select>
                    <input
                      className="flex-1 h-10 rounded-md border border-input px-3 py-1"
                      type="text" 
                      value={profileForm.name}
                      onChange={handleInputChange('name')}
                      required
                    />
                  </div>
                </td>
              </tr>
              
              <SHGFormInput
                label="Your Mobile"
                inputType="tel"
                value={profileForm.mobile}
                onChange={handleInputChange('mobile')}
              />
              
              <SHGFormInput
                label="Your E-mail"
                inputType="email"
                value={profileForm.email}
                onChange={handleInputChange('email')}
              />
              
              <SHGFormInput
                label="Set Password"
                inputType="password"
                value={profileForm.password}
                onChange={handleInputChange('password')}
              />
            </tbody>
          </table>
          
          <div className="bg-shg-primary py-4 px-4 mt-4 rounded-lg">
            <SHGActionButton type="submit" color="primary">Save Changes</SHGActionButton>
          </div>
        </form>
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default ProfileSettings;
