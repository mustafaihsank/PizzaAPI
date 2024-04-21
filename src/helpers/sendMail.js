"use strict";
/* -------------------------------------------------------
    SEND MAIL
------------------------------------------------------- */
const nodemailer = require("nodemailer");
/* ------------------------------------------------------- */
// sendMail(to, subject, message):
module.exports = function (to, subject, text) {
  // * GoogleMail (gmail)
  // * Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mustafa@gmail.com",
      pass: "asas asas asas asas", //  Gmail'de uygulama sifreleri bölümünden al
    },
  });
  transporter.sendMail(
    {
      to,
      subject,
      text,
      html: text,
    },
    (error, success) => console.log(success, error)
  );
};

// EMAIL :
// https://www.nodemailer.com/
// https://www.npmjs.com/package/nodemailer
// https://ethereal.email/

// const nodemailer = require("nodemailer");

// Create Test (Fake) Account:
/*
nodemailer.createTestAccount().then((data) => console.log(data));
{
  user: 'zcegdg3j4ki3ud5f@ethereal.email',
  pass: '3e6ndUpPYJPXx1u4pr',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false }, // send mail
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },  // get mail
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },  // get mail
  web: 'https://ethereal.email'
}
*/

// Connect to mail server
// const transporter = nodemailer.createTransport({
//   // SMTP:
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // Cna be ssl, tls
//   auth: {
//     user: "zcegdg3j4ki3ud5f@ethereal.email",
//     pass: "3e6ndUpPYJPXx1u4pr",
//   },
// });
// console.log(transporter); // See Transporter Object

// Sample - Send Mail
// transporter.sendMail(
//   {
//     from: "zcegdg3j4ki3ud5f@ethereal.email",
//     to: "mustafa@clarusway.com", // a@b.com, c@d.com
//     subject: "Hello",
//     text: "Hello There. How are you?",
//     html: "<b>Hello There.</b> <p>How are you?</p>",
//   },
//   (error, success) => {
//     success ? console.log("Success", success) : console.log("Error", error);
//   }
// );

// //? YandexMail (yandex):
// const transporter = nodemailer.createTransport({
//     service: 'Yandex',
//     auth: {
//         user: 'username@yandex.com',
//         pass: 'password' // your emailPassword
//     }
// })
