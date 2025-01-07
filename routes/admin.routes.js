import { Router } from "express";
import { adminLogin } from "../auth/admin.auth.js";

const adminRouter = Router()

//api

//demo
adminRouter.get("/", (req, res) => res.send("admin router is working"))

//login
adminRouter.post("/login", adminLogin)

//forget password(generate OTP)


//change password


//add student


//add teacher

export default adminRouter