import nodeMailer from 'nodemailer'
import 'dotenv/config.js'

//This function sends an email using the nodeMailer library
const mailSender = async(email,title,body) =>{
    try {

        //Create a transporter object using the nodeMailer library
        const transporter = nodeMailer.createTransport({
          host: process.env.MAIL_HOST,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        }); 

        //Send the email using the transporter object
        const info = transporter.sendMail({
            from:"StudyNotion Pvt. Ltd. Company",
            to:email,
            subject:title,
            html:body
        });

        //Log the information of the email
        console.log("information of mail",info)

        //Return the information of the email
        return info 
        
    } catch (error) {

        //Log the error if it occurs
        console.log("error occur in mailSender function",error)

        //Return a status of 500 and a message of "Internal server Error"
        return res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
        
    }
}

export default mailSender
