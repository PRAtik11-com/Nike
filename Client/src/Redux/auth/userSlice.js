import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading: false,
  isAuth: false,
};

const userSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    SignupStart: (state) => {
      state.loading = true;
    },
    SignupSuccess: (state) => {
      state.loading = false;
    },
    SignupError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    VerifyOtpStart: (state) => {
      state.loading = true;
    },
    VerifyOtpSuccess: (state) => {
      state.loading = false;
    },
    VerifyOtpError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    SignInStart: (state) => {
      state.loading = true;
    },
    SignInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    SignInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuth = false;
    },
    UpdateSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    ResetPaaswordStart: (state) => {
      state.loading = true;
    },
    ResetPaaswordSuccess: (state) => {
      state.loading = false;
    },
    ResetPaaswordError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ResetPaaswordVerifyOtpStart: (state) => {
      state.loading = true;
    },
    ResetPaaswordVerifyOtpSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    ResetPaaswordVerifyOtpError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  SignupStart,
  SignupSuccess,
  SignupError,
  VerifyOtpStart,
  VerifyOtpSuccess,
  VerifyOtpError,
  SignInStart,
  SignInSuccess,
  SignInError,
  logoutSuccess,
  UpdateSuccess,
  ResetPaaswordStart,
  ResetPaaswordSuccess,
  ResetPaaswordError,
  ResetPaaswordVerifyOtpStart,
  ResetPaaswordVerifyOtpSuccess,
  ResetPaaswordVerifyOtpError,
} = userSlice.actions;

export default userSlice.reducer;
