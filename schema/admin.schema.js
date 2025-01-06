import { Schema } from "mongoose"

const adminSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, }
})

export default adminSchema;