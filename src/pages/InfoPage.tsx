
import React from 'react';
import Navigation from '../components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share, Mail, Phone, Info } from 'lucide-react';

const InfoPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-background min-h-screen pb-20">
      <div className="bg-gradient-to-r from-shg-primary to-shg-secondary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Information</h1>
      </div>
      
      <div className="px-4 py-6">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="about" className="flex gap-2 items-center">
              <Info size={16} />
              <span>About</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex gap-2 items-center">
              <Phone size={16} />
              <span>Contact</span>
            </TabsTrigger>
            <TabsTrigger value="share" className="flex gap-2 items-center">
              <Share size={16} />
              <span>Share</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-md p-5">
              <div className="rounded-full bg-shg-light w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Info size={36} className="text-shg-primary" />
              </div>
              
              <h2 className="text-xl font-bold text-shg-primary text-center mb-4">About SHG App</h2>
              <p className="mb-4 text-gray-700">
                Self-Help Group (SHG) App is designed to help local communities manage their financial activities efficiently.
              </p>
              
              <h3 className="font-semibold text-lg text-shg-secondary mb-2">Our Mission</h3>
              <p className="mb-4 text-gray-700">
                To empower small communities by providing easy-to-use digital tools for financial management and collaboration.
              </p>
              
              <h3 className="font-semibold text-lg text-shg-secondary mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Saving and loan management</li>
                <li>Expense tracking</li>
                <li>Member management</li>
                <li>Financial reports</li>
                <li>Government scheme information</li>
              </ul>
              
              <div className="mt-6 p-4 bg-shg-light rounded-lg">
                <p className="text-shg-primary font-medium">
                  Version 2.0.1 | Last Updated: May 2024
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-md p-5">
              <div className="rounded-full bg-shg-light w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Phone size={36} className="text-shg-primary" />
              </div>
              
              <h2 className="text-xl font-bold text-shg-primary text-center mb-4">Contact Us</h2>
              <p className="mb-4 text-gray-700 text-center">
                Have questions or need assistance? We're here to help!
              </p>
              
              <div className="space-y-5">
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <div className="rounded-full bg-shg-light p-3 mr-3">
                    <Phone size={24} className="text-shg-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Support</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <div className="rounded-full bg-shg-light p-3 mr-3">
                    <Mail size={24} className="text-shg-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Support</p>
                    <p className="font-medium">support@shgapp.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg text-shg-secondary mb-3">Send us a message</h3>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full shg-input"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full shg-input"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full shg-input"
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-shg-primary to-shg-secondary text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="share" className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-md p-5">
              <div className="rounded-full bg-shg-light w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Share size={36} className="text-shg-primary" />
              </div>
              
              <h2 className="text-xl font-bold text-shg-primary text-center mb-4">Share with Others</h2>
              <p className="mb-6 text-gray-700 text-center">
                Help others discover this SHG app and invite new members to join our community.
              </p>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-medium py-3.5 px-4 rounded-lg hover:opacity-90 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" /><path d="M9 14a5 5 0 0 0 6 0" /></svg>
                  Share via WhatsApp
                </button>
                
                <button className="w-full flex items-center justify-center gap-3 bg-[#3b5998] text-white font-medium py-3.5 px-4 rounded-lg hover:opacity-90 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  Share via Facebook
                </button>
                
                <button className="w-full flex items-center justify-center gap-3 bg-shg-primary text-white font-medium py-3.5 px-4 rounded-lg hover:opacity-90 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7.33v9.34c0 1.1-.89 1.99-1.99 1.99H3.98C2.89 18.66 2 17.77 2 16.67V7.33C2 6.23 2.89 5.34 3.98 5.34h16.03c1.1 0 1.99.89 1.99 1.99z" /><path d="m8 10 4 4 4-4" /></svg>
                  Share via SMS
                </button>
                
                <button className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-800 border border-gray-300 font-medium py-3.5 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                  Copy Referral Link
                </button>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="font-semibold text-shg-accent mb-2">Earn Rewards!</h3>
                <p className="text-sm text-gray-700">
                  Earn ₹500 for every new SHG that joins through your referral!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default InfoPage;
