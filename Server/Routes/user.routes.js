const express = require("express");
const usercontroller = require("../Controllers/user.controller");
const Auth = require("../middleware/auth");
const upload = require("../config/multer");
const CheckRole = require("../middleware/admin");


const userRouter = express.Router()

userRouter.post("/checkemail",usercontroller.checkemail)
userRouter.post("/validateotp",usercontroller.validateotp)
userRouter.post("/signup",usercontroller.signup)
userRouter.post("/login",usercontroller.login)
userRouter.get("/getuserinfo/:userId", Auth, usercontroller.getUserData);
userRouter.patch(
  "/updateuserinfo/:userId",
  Auth,
  upload.single("profileImage"),
  usercontroller.updateUserInfo
);

// password-reset-fun....
userRouter.post(
  "/resetpassword",
  usercontroller.resetPasswordByEmail
); // for create token ,otp and sending reset-password-email

userRouter.patch(
  "/verifypassword",
  usercontroller.verifyPasswordByOtp
); // for verify token and reset password

userRouter.get("/logout", Auth, usercontroller.logout); // for logout

// users data get by admin
userRouter.get("/getallusers", Auth,CheckRole ,usercontroller.getAllUsers); 

userRouter.delete(
  "/deleteuser/:userId",
  Auth,
  CheckRole,
  usercontroller.deleteUserByAdmin
);


module.exports = userRouter;