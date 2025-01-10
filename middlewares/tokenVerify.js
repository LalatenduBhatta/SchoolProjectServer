import jwt from "jsonwebtoken"
import { config } from "dotenv"
config();


export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        if (!token) return res.status(400).send({ error: "token required" })
        //verify the token
        const data = jwt.verify(token, process.env.JWT_SECRET)
        if (!data.id) return res.status(400).send({ error: "token have invalid details" });
        //send the id for next middleware in request object
        req.id = data.id
        //call the next function to re-direct to the next middleware
        next()
    } catch (error) {
        return res.status(500).send({ error: "Something went Wrong", msg: error.message })
    }
}