import { Router } from "express";

const studentRouter = Router()

//api

//demo
studentRouter.get("/", (req, res) => res.send("student router is working"))


export default studentRouter