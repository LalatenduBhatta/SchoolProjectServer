import Admin from "../model/admin.model.js"
import { generateToken } from "../utils/jwt.js"
import { sendOtpMail } from "../utils/nodemailer.js"
import { generateOTP } from "../utils/otp.js"

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        //check all fileds
        if (!email || !password) {
            return res.status(400).send({ error: "provide all required fileds" })
        }
        else {
            //check the admin is available or not
            let isAdmin = await Admin.findOne({ email })
            if (isAdmin) {
                //match the passwords
                if (isAdmin.password == password) {
                    //send the auth token
                    let token = generateToken({ id: isAdmin._id })
                    return res.status(200).send({ token })
                }
                else {
                    return res.status(401).send({ error: "password is not matching" })
                }
            }
            else {
                return res.status(400).send({ error: "Email address not matched" })
            }
        }
    } catch (error) {
        res.status(500).send({ error: "Something Went Worng", msg: error.message })
    }
}


export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.status(400).send({ error: "Provide the email address" })
        const isAdmin = await Admin.findOne({ email })
        if (isAdmin) {
            //if otp is already created wait for 30sec before creting next one
            if (isAdmin.otp) {
                const timelimit = (30 * 1000) >= (Date.now() - isAdmin.otpCreatedAt)
                if (timelimit) {
                    return res.status(429).send({ error: "Too many otp requests wait for 30sec before next" })
                }
            }
            //generate the otp
            let otp = generateOTP()

            //send the otp in user Email
            await sendOtpMail({ to: isAdmin.email, otp })

            //save the otp in database
            isAdmin.otp = otp;
            isAdmin.otpCreatedAt = Date.now();
            await isAdmin.save()
            res.status(201).send({ message: "Otp sent to the email address" })
        } else {
            res.status(400).send({ error: "Admin email not found" })
        }
    } catch (error) {
        res.status(500).send({ error: "Something Went Worng", msg: error.message })
    }
}


export const verifyOTP = async (req, res) => {
    try {
        const { otp, email } = req.body
        if (!email || !otp) return res.status(400).send({ error: "Provide all fields" })
        const isAdmin = await Admin.findOne({ email })
        if (!isAdmin) return res.status(401).send({ error: "Admin email not found" });
        else {
            if (!isAdmin.otp) return res.status(400).send({ error: "Generate the otp first" });
            else {
                const isExpired = (Date.now() - isAdmin.otpCreatedAt) >= (1000 * 60 * 5)
                if (isExpired) return res.status(403).send({ error: "Otp expired generate again" });
                else {
                    if (isAdmin.otp === otp) {
                        //remove the otp and otpCreatedAt from database
                        isAdmin.otp = null;
                        isAdmin.otpCreatedAt = null;
                        await isAdmin.save()
                        //send the auth token to the user
                        const token = generateToken({ id: isAdmin._id })
                        return res.status(200).send({ token })
                    }
                    else {
                        return res.status(400).send({ error: "Invalid otp" })
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).send({ error: "Something Went Wrong", msg: error.message })
    }
}


export const changePassword = async (req, res) => {
    try {
        const { id } = req
        const { newPassword } = req.body
        if (!id || !newPassword) return res.status(400).send({ error: "provide all required fileds" });
        else {
            const isAdmin = await Admin.findById(id)
            if (!isAdmin) return res.status(401).send({ error: "admin data not matched" });
            else {
                //update the admin password
                isAdmin.$set({ password: newPassword })
                await isAdmin.save()
                return res.status(200).send({ message: "password updated successfully" })
            }
        }
    } catch (error) {
        res.status(500).send({ error: "Something Went Wrong", msg: error.message })
    }
}