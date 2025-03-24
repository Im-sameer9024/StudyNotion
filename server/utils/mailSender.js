import nodeMailer from 'nodemailer'
import 'dotenv/config.js'

const mailSender = async(email,title,body) =>{
    try {

        const transporter = nodeMailer.createTransport({
          host: process.env.MAIL_HOST,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        }); 

        const info = transporter.sendMail({
            from:"StudyNotion Pvt. Ltd. Company",
            to:email,
            subject:title,
            html:body
        });

        console.log("information of mail",info)

        return info 
        
    } catch (error) {

        console.log("error occur in mailSender function",error)

        return res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
        
    }
}

export default mailSender
