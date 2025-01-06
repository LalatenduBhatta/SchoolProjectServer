import { Router } from "express";

const adminRouter = Router()

//api

//demo
adminRouter.get("/", (req, res) => res.send("admin router is working"))


export default adminRouter