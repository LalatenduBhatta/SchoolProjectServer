import { model } from "mongoose";
import adminSchema from "../schema/admin.schema.js";


const Admin = model("admin", adminSchema)

export default Admin