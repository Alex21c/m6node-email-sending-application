import nodemailer from 'nodemailer';
import quotes from '../quotes.mjs'

function getStockMarketQuote(){
  const randomQuoteNo = Math.floor(Math.random()*quotes.length);
  // console.log();
  const quote =quotes[randomQuoteNo];
// console.log(quote.quote);
  return `

<div class="blockquote">
    <p class="quote">${quote.quote}</p>
    <p class="interpretation"><strong>Interpretation: </strong>${quote.interpretation}</p>
    <p class="author">&mdash; ${quote.author}</p>
</div>



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
            from: `devatalex21c.in <${process.env.GMAIL_EMAIL_ID}>`,
            to: req.body.email,
            subject: `${req.body.firstName}, Yours Stock Market Quote`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .blockquote {
                        padding: 20px;
                        margin: 20px 0;
                        background-color: #f9f9f9;
                        border-left: 10px solid #ccc;
                        border-radius: 5px;
                    }
                    .quote, .normalText {
                        font-size: 18px;
                        color: #555;
                    }
                    .interpretation {
                        margin-top: 10px;
                        font-size: 16px;
                        color: #333;
                    }
                    .author {
                        margin-top: 20px;
                        font-size: 14px;
                        color: #777;
                        text-align: right;
                    }
                    footer {
                        margin-top: 30px;
                        font-size: 12px;
                        color: #aaa;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
            <div class="email-container">            
              <p class='normalText'>hello ${req.body.firstName}, Here is Yours Stock Market Quote:</p>
              ${getStockMarketQuote()}
              <footer>
              © 2024 <a href="http://alex21c.com/">Alex21C</a>. All rights reserved. | <a href="#">Un-Subscribe Link</a>
              </footer>              
            </div>
            
        
            </body>
            </html>
            
            

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

