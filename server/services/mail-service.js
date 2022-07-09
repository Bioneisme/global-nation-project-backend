const nodemailer = require('nodemailer')
require('dotenv').config()

class MailService{
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_APP_PASSWORD
            }
        })
    }
    async sendActivationCode(to, code) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation on ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>To activate your account write this code: </h1>
                        <a> ${code} </a>
                    </div>
                `
        })
    }
    async sendResetCode(to, code) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Reset password on ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>To reset your password write this code: </h1>
                        <p> ${code} </p>
                    </div>
                `
        })
    }
}

module.exports = new MailService()