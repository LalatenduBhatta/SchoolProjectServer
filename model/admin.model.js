import { model } from "mongoose";
import adminSchema from "../schema/admin.schema";


const Admin = model("admin", adminSchema)

export default Admin