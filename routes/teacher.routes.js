import { Router } from "express";

const teacherRouter = Router()

//api

//demo
teacherRouter.get("/", (req, res) => res.send("teacher router is working"))


export default teacherRouter