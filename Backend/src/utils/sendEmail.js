import nodemailer from "nodemailer"

const sendEmail = async ({ to, subject, text }) => {
    try {
        const testAccount = await nodemailer.createTestAccount()

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        })

        const info = await transporter.sendMail({
            from: `"Virtual Interior Designer" <noreply@vid.com>`,
            to,
            subject,
            text
        })

        console.log(`Test email sent: ${nodemailer.getTestMessageUrl(info)}`)
        console.log(`Reset Link: ${text}`)
    } catch (error) {
        console.error("Email sending failed:", error)
        throw error
    }
}

export default sendEmail
