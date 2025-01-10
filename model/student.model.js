import { model } from "mongoose";
import studentSchema from "../schema/stdudent.schema.js";

const Student = model("stduents", studentSchema)


export default Student