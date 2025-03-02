import nodeMailer from 'nodemailer'
import {NODEMAILER_PASSWORD} from "./env.config.js";

export const appUserEmail = 'dhivilearning@gmail.com';

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: appUserEmail,
        pass: NODEMAILER_PASSWORD
    },
})

export default transporter;