
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '../components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const EnterInfo: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('savings');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Information saved",
      description: "Your information has been saved successfully.",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      {/* Header Bar */}
      <div className="bg-shg-primary text-white p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-2 p-1 rounded-full hover:bg-white/20"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center mr-8">Enter Information</h1>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <Tabs defaultValue="savings" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          
          {/* Savings Tab */}
          <TabsContent value="savings">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-shg-primary">Enter Monthly Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Member Name</label>
                    <Input type="text" placeholder="Select Member" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <Input type="number" placeholder="₹0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Input type="text" placeholder="Optional notes" />
                  </div>
                  <Button type="submit" className="w-full bg-shg-primary hover:bg-shg-accent">
                    Save Information
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-shg-primary">Enter Loan Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Member Name</label>
                    <Input type="text" placeholder="Select Member" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <Input type="number" placeholder="₹0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interest Rate (%)</label>
                    <Input type="number" placeholder="2%" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration (months)</label>
                    <Input type="number" placeholder="12" />
                  </div>
                  <Button type="submit" className="w-full bg-shg-primary hover:bg-shg-accent">
                    Save Loan Details
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-shg-primary">Enter Expense Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expense Type</label>
                    <Input type="text" placeholder="Select Type" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <Input type="number" placeholder="₹0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input type="text" placeholder="Expense description" />
                  </div>
                  <Button type="submit" className="w-full bg-shg-primary hover:bg-shg-accent">
                    Save Expense
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Income Tab */}
          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-shg-primary">Enter Income Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Income Type</label>
                    <Input type="text" placeholder="Select Type" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount</label>
                    <Input type="number" placeholder="₹0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input type="text" placeholder="Income description" />
                  </div>
                  <Button type="submit" className="w-full bg-shg-primary hover:bg-shg-accent">
                    Save Income
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default EnterInfo;
