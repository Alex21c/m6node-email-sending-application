import nodemailer from 'nodemailer';
import quotes from '../quotes.mjs'

function getStockMarketQuote(){
  const randomQuoteNo = Math.floor(Math.random()*quotes.length);
  // console.log();
  const quote =quotes[randomQuoteNo];
// console.log(quote.quote);
  return `
<blockquote>
  <p>${quote.quote}</p>
  <p><strong>Interpretation: </strong>${quote.interpretation}</p>
  <footer>&mdash;${quote.author}</footer>
</blockquote>
`;

}




const sendEmail = async(req, res, next)=>{
  // console.log(getStockMarketQuote());    
  // res.end('wait!')
  // return;
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
            from: process.env.GMAIL_EMAIL_ID,
            to: req.body.email,
            subject: "Yours Stock Market Quote",
            html: `
hello ${req.body.firstName},<br>
Here is Yours Stock Market Quote:<br>
${getStockMarketQuote()}
            `
          }
        );
        return info.messageId;
      } catch (error) {
        console.log(error.message);
        const err = new Error("Unable to send email INNER");        
        err.status = 500;    
        throw err; 
      }
    }
    
    const messageID= await main(req);
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

