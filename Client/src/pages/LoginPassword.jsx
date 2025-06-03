import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SignInError, SignInStart, SignInSuccess } from "../Redux/auth/userSlice";


const LoginPassword = () => {
  const { state } = useLocation();
  console.log("Email from location.state:", state?.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  

  const handleLogin = async () => {
    try {
      dispatch(SignInStart());
      const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/user/login`, {
        email: state.email,
        password,
      },{
        withCredentials:true
      });
       console.log("Login response:", res.data);
      
      dispatch(SignInSuccess(res.data.token));
      navigate("/");
    } catch (err) {
      dispatch(SignInError(err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Welcome back!</h2>
        <p className="text-sm text-gray-500">Email: {state.email}</p>
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full max-w-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-black text-white px-4 py-2 rounded">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LoginPassword;
