import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  VerifyOtpStart,
  VerifyOtpSuccess,
  VerifyOtpError,
} from "../Redux/auth/userSlice";

const SignupForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(state?.otp || "");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: state?.email || "",
    code: "",
    firstName: "",
    surname: "",
    password: "",
    shoppingPreference: "",
    dateOfBirth: {
      day: "",
      month: "",
      year: "",
    },
    location: "India",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["day", "month", "year"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        dateOfBirth: {
          ...prev.dateOfBirth,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignup = async () => {
  const { day, month, year } = form.dateOfBirth;
  const dob = `${year}-${month}-${day}`;

  if (
    !form.email ||
    !form.firstName ||
    !form.surname ||
    !form.password ||
    !otp ||
    !form.shoppingPreference ||
    !day || !month || !year
  ) {
    alert("Please fill all the required fields.");
    return;
  }

  try {
    console.log({
      ...form,
      dateOfBirth: dob,
      otp
    });

    await axios.post(
  `${import.meta.env.VITE_BaseUrl}/user/signup`,
  {
    ...form,
    dateOfBirth: dob,
    otp,
    token: localStorage.getItem("otpToken"), // ✅ Include token here
  },
  { withCredentials: true }
);
    navigate("/CheckEmail", { state: { email: form.email } });
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Signup failed");
  }
};


  const handleVerifyOtp = async () => {
    try {
      dispatch(VerifyOtpStart());
      const res = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/user/validateotp`,
        {
          email: form.email,
          otp,
          token: localStorage.getItem("otpToken"),
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(VerifyOtpSuccess());
      alert("OTP Verified!");
    } catch (err) {
      dispatch(
        VerifyOtpError(err.response?.data?.message || "OTP verification failed")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-bold">Create Your Account</h2>

        {/* Code (Referral/Promo Code or Optional) */}
        <div className="relative">
          <input
            name="code"
            placeholder="Code (Optional)"
            value={form.code}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <div className="absolute right-3 top-2 text-gray-500 text-xl cursor-pointer">
            ↻
          </div>
        </div>

        {/* First Name & Surname */}
        <div className="flex gap-2">
          <input
            name="firstName"
            placeholder="First Name*"
            value={form.firstName}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
          />
          <input
            name="surname"
            placeholder="Surname*"
            value={form.surname}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password*"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <span
            className="absolute right-3 top-2 text-gray-500 text-xl cursor-pointer select-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Shopping Preference */}
        <select
          name="shoppingPreference"
          value={form.shoppingPreference}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Shopping Preference*</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="day"
              placeholder="Day*"
              value={form.dateOfBirth.day}
              onChange={handleChange}
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              name="month"
              placeholder="Month*"
              value={form.dateOfBirth.month}
              onChange={handleChange}
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              name="year"
              placeholder="Year*"
              value={form.dateOfBirth.year}
              onChange={handleChange}
              className="border p-2 rounded w-1/3"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Get a Nike Member Reward on your birthday.
          </p>
        </div>

        {/* OTP Field & Verify Button (optional display) */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP*"
            className="border p-2 rounded w-2/3"
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-gray-800 text-white px-3 py-2 rounded w-1/3 text-sm"
          >
            Verify OTP
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleSignup}
          className="bg-black text-white w-full py-2 rounded mt-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
