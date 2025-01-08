import nodemailer from "nodemailer"
import { config } from "dotenv";
config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME, //host email address
        pass: process.env.EMAIL_PASSKEY
    }
});

export const sendOtpMail = async ({ to, otp }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to,
            subject: 'mySchoolApp OTP',
            text: `Your One Time Password is ${otp}.
                  Do not share it with anyone.
                  Use the otp before 5min`
        };
        await transporter.sendMail(mailOptions) //sending the mail to users
    } catch (error) {
        throw new Error(error.messages)
    }
}