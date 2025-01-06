import mongoose from "mongoose";
import { config } from "dotenv";
config();

const URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/SchoolBackend"

const dbConnect = async () => {
    try {
        await mongoose.connect(URL)
        console.log("database connected");
    } catch (error) {
        console.log("db connection error", error.message)
    }
}

export default dbConnect;