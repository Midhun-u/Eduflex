import nodemailer from 'nodemailer'

//configuration 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_USER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
})

//function for send OTP
export const sendOTP = async (otp: string, email: string) => {

    try {

        await transporter.sendMail({
            from: process.env.NODEMAILER_USER_EMAIL,
            to: email,
            subject: 'Email Verification',
            html: `<h1>OTP ${otp} . OTP expires in 5 minutes</h1>`
        })

    } catch (error) {
        console.log(`Error in send email error : ${error}`)
    }
}