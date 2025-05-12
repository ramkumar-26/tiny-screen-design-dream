
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Share from "./pages/Share";
import EnterInfo from "./pages/EnterInfo";
import NotFound from "./pages/NotFound";
import GroupInfo from "./pages/GroupInfo";
import AddMember from "./pages/AddMember";
import ProfileSettings from "./pages/ProfileSettings";
import MonthlySavingSetting from "./pages/MonthlySavingSetting";
import AddRules from "./pages/AddRules";
import InterestRateSetting from "./pages/InterestRateSetting";
import MonthlySavings from "./pages/MonthlySavings";
import ProvideLoan from "./pages/ProvideLoan";
import CollectLoan from "./pages/CollectLoan";
import AddExpense from "./pages/AddExpense";
import AddIncome from "./pages/AddIncome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/share" element={<Share />} />
          <Route path="/enter-info" element={<EnterInfo />} />
          
          {/* SHG Management Pages */}
          <Route path="/group-info" element={<GroupInfo />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/monthly-saving-setting" element={<MonthlySavingSetting />} />
          <Route path="/add-rules" element={<AddRules />} />
          <Route path="/interest-rate-setting" element={<InterestRateSetting />} />
          <Route path="/monthly-savings" element={<MonthlySavings />} />
          <Route path="/provide-loan" element={<ProvideLoan />} />
          <Route path="/collect-loan" element={<CollectLoan />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/add-income" element={<AddIncome />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
