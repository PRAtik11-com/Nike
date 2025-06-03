import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CheckEmail from "../pages/CheckEmail";
import LoginPassword from "../pages/LoginPassword";
import SignupOtp from "../pages/SignupOtp";
import SignupForm from "../pages/SignupForm";


function Allroutes() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CheckEmail" element={<CheckEmail />} />
        <Route path="/login-password" element={<LoginPassword />} />
        {/* <Route path="/signup-otp" element={<SignupOtp />} /> */}
        <Route path="/signup-form" element={<SignupForm />} />
      </Routes>
   
  );
}

export default Allroutes;
