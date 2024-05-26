import nodemailer from 'nodemailer';

const sendEmail = async(req, res, next)=>{
  try {  
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  
    async function main(req){
      try {        
        // throw new Error('testing is the thing')
        const info = await transporter.sendMail(
          {
            from: `${process.env.GMAIL_USERNAME} <${process.env.GMAIL_EMAIL_ID}>`,
            to: req.body.email,
            subject: "Testing",
            html: "<b>testing</b>"
          }
        );
        return info.messageId;
      } catch (error) {
        const err = new Error("Unable to send email");
        err.status = 500;    
        next(err);
      }
    }
    
    const messageID= await main();
    res.json({
      success: true,
      messageID, 
      message: "Email sent !"

    });


  } catch (error) {
    const err = new Error("Unable to send email");
    err.status = 500;    
    next(err);
  }

}


const sendEmailController = {
  sendEmail
};

export default sendEmailController;

