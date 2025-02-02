import { DarkThemeToggle } from "flowbite-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./modules/Home";
import Otp from "./modules/Otp/";
import Welcome from "./modules/welcome";
import MemberRegistration from "./modules/MemberRegistrations";
import MemberPref from "./modules/MemeberPref";
import PaymentGateway from "./modules/PaymentGateway";
import SlpRegistration from "./modules/SlpRegistration";
import SlpPref from "./modules/SlpPref";
import Dashboard from "./modules/Dashboard";
import PaymentSuccessful from "./modules/PaymentSuccessful";
import TransactionDetails from "./modules/TransactionDetails";
import Transactions from "./modules/TransactionDetails/transactions";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    // <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
    //   <h1 className="text-2xl dark:text-white">hello</h1>
    //   <DarkThemeToggle />
    // </main>

    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/otp-verify" element={<Otp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/member-registration" element={<MemberRegistration />} />
        <Route path="/member-preferences" element={<MemberPref />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />
        <Route path="/slp-info" element={<SlpRegistration />} />
        <Route path="/slp-preferences" element={<SlpPref />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/refund-and-transfer" element={<RefundAndTransfer />} /> */}
        <Route path="/payment-status" element={<PaymentSuccessful />} />
        {/* <Route path="/thank-you" element={<ThankYou />} /> */}
        <Route path="/transaction-details" element={<TransactionDetails />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
