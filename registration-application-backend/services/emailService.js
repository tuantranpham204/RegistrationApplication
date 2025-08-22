const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Wrap in an async IIFE so we can use await.
const emailLinkSender = async(subject, link, linkContent,  emailList) => {
  const info = await transporter.sendMail({
    from: `< ${process.env.SENDER_EMAIL} >`,
    to: emailList.toString(),
    subject: subject,
    html: `<a href=${link}>${linkContent}</a>`, // HTML body
  }, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
  });

};

const emailPlainTextSender = async(subject,content, emailList) => {
  const info = await transporter.sendMail({
    from: `< ${process.env.SENDER_EMAIL} >`,
    to:emailList.toString(),
    subject: subject,
    text: content, // HTML body
  }, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
  });

};

module.exports = {emailLinkSender, emailPlainTextSender}