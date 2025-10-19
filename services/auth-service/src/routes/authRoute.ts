import {Router} from 'express'
import { changePasswordController, checkEmailController, checkOtpController, getAuthUserController, getUserController, googleLoginController, googleSignController, loginController , logoutController , sendotpController, signController, updateUserDataController } from '../controllers/authController.js'
import { authMiddleware } from '../middlewares/auth.js'

//auth router instance
export const authRouter = Router()

//route for checking email
authRouter.post('/check-email' , checkEmailController)

//route for signing
authRouter.post("/sign" , signController)

//route for sending OTP
authRouter.post('/send-otp' , sendotpController)

//route for checking OTP
authRouter.post("/check-otp/:otp" , checkOtpController)

//route for google signing
authRouter.post('/google-sign' , googleSignController)

//route for login
authRouter.post('/login' , loginController)

//route for google login
authRouter.post('/google-login' , googleLoginController)

//route for logouting
authRouter.post("/logout" , authMiddleware , logoutController)

//route for getting user
authRouter.get("/get-user/:userId" , getUserController)

//route for getting auth user
authRouter.get("/get-authUser" , authMiddleware , getAuthUserController)

//route for updating user data
authRouter.put("/update-user" , authMiddleware , updateUserDataController)

//route for changing password
authRouter.put("/change-password" , authMiddleware , changePasswordController)