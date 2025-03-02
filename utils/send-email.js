import transporter, {appUserEmail} from "../config/nodemailer.js";



const sendMailAsync = async ({to,subject,message})=>{

    const mailOptions = {
        from: appUserEmail,
        to: to,
        subject: subject,
        text: message,
    };
    await transporter.sendMail(mailOptions,(err,info)=> {
        if (err) throw new Error(err || err.message)
        console.log(`Email sent to ${info.envelope.to}`);
        return info
    })

}

export default sendMailAsync

