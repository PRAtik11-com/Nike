import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { VerifyOtpError, VerifyOtpStart, VerifyOtpSuccess } from "../Redux/auth/userSlice";


const SignupOtp = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerifyOtp = async () => {
    try {
      dispatch(VerifyOtpStart());
      const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/user/validateotp`, {
        email: state.email,
        otp,
        token: localStorage.getItem("otpToken"),
      },{
        withCredentials:true
      });
      console.log(res);
      
      dispatch(VerifyOtpSuccess());
      navigate("/signup-form", { state: { email: state.email, otp } });
    } catch (err) {
      dispatch(VerifyOtpError(err.response?.data?.message || "OTP verification failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">Enter OTP sent to {state.email}</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
          placeholder="Enter OTP"
        />
        <button onClick={handleVerifyOtp} className="bg-black text-white px-4 py-2 rounded">
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default SignupOtp;
