import { Router } from "express";
import { adminLogin, forgetPassword } from "../auth/admin.auth.js";

const adminRouter = Router()

//api

//demo
adminRouter.get("/", (req, res) => res.send("admin router is working"))

//login
adminRouter.post("/login", adminLogin)

//forget password(generate OTP)
adminRouter.post("/otp/create", forgetPassword)

//change password(verify OTP)


//add student


//add teacher

export default adminRouter