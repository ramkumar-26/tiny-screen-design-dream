
import React from 'react';
import Navigation from '../components/Navigation';
import SHGPageHeader from '../components/SHGPageHeader';
import SHGInfoCard from '../components/SHGInfoCard';
import SHGTable from '../components/SHGTable';

const GroupInfo: React.FC = () => {
  // SHG Information data
  const shgInfo = {
    name: "Testing",
    code: "SHG2874C",
    members: "1 members:",
    startMonth: "June 2019",
    president: "Mr. Testing",
    contact: "6383649920"
  };
  
  // Active members data
  const activeMembers = [
    ["Mr.Testing", "President", "₹10.00"]
  ];
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <SHGPageHeader title="My Self-Help Group Info" />
      
      {/* Main Content */}
      <div className="p-4">
        {/* SHG Information */}
        <div className="bg-white rounded-lg shadow-md mb-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3 bg-[#EFEED1] font-medium border-r border-gray-200">SHG Name:</td>
                <td className="p-3">{shgInfo.name}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 bg-[#EFEED1] font-medium border-r border-gray-200">SHG Code:</td>
                <td className="p-3">{shgInfo.code}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 bg-[#EFEED1] font-medium border-r border-gray-200">Members:</td>
                <td className="p-3">{shgInfo.members}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 bg-[#EFEED1] font-medium border-r border-gray-200">Start Month:</td>
                <td className="p-3">{shgInfo.startMonth}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 bg-[#EFEED1] font-medium border-r border-gray-200">President:</td>
                <td className="p-3">
                  <div>
                    {shgInfo.president}
                    <div className="text-sm text-gray-500 mt-1">📞 {shgInfo.contact}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Active Members */}
        <SHGInfoCard title="List of Active Members">
          <SHGTable 
            columns={[
              { header: "Member" },
              { header: "Role" },
              { header: "Deposit" },
            ]}
            data={activeMembers}
          />
        </SHGInfoCard>
      </div>
      
      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default GroupInfo;
