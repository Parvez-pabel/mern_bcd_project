// const nodemailer = require("nodemailer");

// //sent email function
// const EmailSend = async (EmailTo, EmailText, EmailSubject) => {

//         let transporter = nodemailer.createTransport({
//             host: "mail.teamrabbil.com",
//             port: 465,
//             secure: false,
//             auth: {
//                 user: "info@teamrabbil.com",
//                 pass: "~sR4[bhaC[Qs",
//                 tls: { rejectUnauthorized: false },
//             },

//         });
//         let mailOption = {
//             from: "MERN E-commerce Solution <info@teamrabbil.com>",
//             to: EmailTo,
//             subject: EmailSubject,
//             text: EmailText,
//     };
//     return await transporter.sendMail(mailOption)
// }
// module.exports = EmailSend;

const nodemailer = require("nodemailer");

// Send email function
const EmailSend = async (EmailTo, EmailSubject, EmailText) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6e499bbddc88a2",
        pass: "06eb58873d6803",
      },
      tls: {
        rejectUnauthorized: false, // Ignore SSL certificate issues
      },
    });

    let mailOption = {
      from: "MERN E-commerce Solution <parvez.10ms@gmail.com>",
      to: EmailTo,
      subject: EmailSubject,
      text: EmailText,
    };

    let info = await transporter.sendMail(mailOption);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = EmailSend;
