import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGStatusDisplay from '../components/SHGStatusDisplay';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGTable from '../components/SHGTable';
import SHGFormInput from '../components/SHGFormInput';
import SHGActionButton from '../components/SHGActionButton';
import { useToast } from '@/components/ui/use-toast';

const AddMember: React.FC = () => {
  const { toast } = useToast();
  const [memberForm, setMemberForm] = useState({
    prefix: "Mr",
    fullName: "",
    role: "Member",
    month: "June",
    year: "2019",
    deposit: "10.00",
    mobile: "",
    email: "",
    password: ""
  });
  
  // Current month members
  const currentMonthMembers = [
    ["Mr. Testing", "₹10", "President", "", "-"]
  ];
  
  // Other months members (empty for demo)
  const otherMonthsMembers: string[][] = [];
  
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Member Added",
      description: `${memberForm.prefix} ${memberForm.fullName} has been added successfully.`
    });
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="Add & Modify Member" />
      
      {/* Status Banner */}
      <div className="bg-gradient-to-b from-shg-primary to-shg-secondary text-white p-4">
        <SHGStatusDisplay label="Saving Month" value="June 2019" />
        <SHGStatusDisplay label="This month added members" value="1/1" />
      </div>
      
      {/* Main Content */}
      <div className="p-4">
        {/* Add New Member Form */}
        <SHGInfoCard title="Add New Member">
          <form onSubmit={handleSubmit} className="p-2">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="p-3 bg-gray-100 font-medium border-r border-gray-300 w-1/3">
                    Full Name:
                  </td>
                  <td className="p-2">
                    <div className="flex">
                      <select 
                        className="w-24 h-10 rounded-md border border-input mr-1 px-3 py-1"
                        value={memberForm.prefix}
                        onChange={(e) => setMemberForm(prev => ({ ...prev, prefix: e.target.value }))}
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </select>
                      <input
                        className="flex-1 h-10 rounded-md border border-input px-3 py-1"
                        type="text" 
                        placeholder="Write the full name"
                        value={memberForm.fullName}
                        onChange={handleInputChange('fullName')}
                        required
                      />
                    </div>
                  </td>
                </tr>
                
                <SHGFormInput
                  label="Role"
                  inputType="select"
                  value={memberForm.role}
                  onChange={(e) => setMemberForm(prev => ({ ...prev, role: e.target.value }))}
                  options={[
                    { value: "Member", label: "Member" },
                    { value: "President", label: "President" },
                    { value: "Secretary", label: "Secretary" },
                    { value: "Treasurer", label: "Treasurer" }
                  ]}
                />
                
                <tr className="border border-gray-300">
                  <td className="p-3 bg-gray-100 font-medium border-r border-gray-300 w-1/3">
                    Entry Month:
                  </td>
                  <td className="p-2">
                    <div className="flex">
                      <select 
                        className="flex-1 h-10 rounded-md border border-input mr-1 px-3 py-1"
                        value={memberForm.month}
                        onChange={(e) => setMemberForm(prev => ({ ...prev, month: e.target.value }))}
                      >
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                      </select>
                      <select
                        className="flex-1 h-10 rounded-md border border-input px-3 py-1"
                        value={memberForm.year}
                        onChange={(e) => setMemberForm(prev => ({ ...prev, year: e.target.value }))}
                      >
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                      </select>
                    </div>
                  </td>
                </tr>
                
                <SHGFormInput
                  label="Deposit"
                  inputType="text"
                  value={memberForm.deposit}
                  onChange={handleInputChange('deposit')}
                  prefix="₹"
                  required
                />
                
                <SHGFormInput
                  label="Mobile"
                  inputType="tel"
                  value={memberForm.mobile}
                  onChange={handleInputChange('mobile')}
                  placeholder="Optional..."
                />
                
                <SHGFormInput
                  label="E-mail"
                  inputType="email"
                  value={memberForm.email}
                  onChange={handleInputChange('email')}
                  placeholder="Optional..."
                />
                
                <SHGFormInput
                  label="Password"
                  inputType="password"
                  value={memberForm.password}
                  onChange={handleInputChange('password')}
                  placeholder=""
                />
              </tbody>
            </table>
            
            <div className="my-4">
              <SHGActionButton type="submit">Add a Member</SHGActionButton>
            </div>
          </form>
        </SHGInfoCard>
        
        {/* Current Month Members */}
        <SHGInfoCard title="ADDED MEMBERS IN CURRENT MONTHS">
          <SHGTable 
            columns={[
              { header: "Members", width: "w-2/5" },
              { header: "Deposit", width: "w-1/5" },
              { header: "Role", width: "w-1/5" },
              { header: "", width: "w-3" },
            ]}
            data={currentMonthMembers}
            showDelete={true}
          />
        </SHGInfoCard>
        
        {/* Other Month Members */}
        <SHGInfoCard title="ADDED MEMBERS IN OTHER MONTHS">
          <SHGTable 
            columns={[
              { header: "Members", width: "w-2/5" },
              { header: "Deposit", width: "w-1/5" },
              { header: "Role", width: "w-1/5" },
              { header: "Status", width: "w-1/5" },
              { header: "", width: "w-1/10" },
            ]}
            data={otherMonthsMembers}
          />
        </SHGInfoCard>
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default AddMember;
