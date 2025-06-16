const nodemailer = require("nodemailer");

// Send email function
const EmailSend = async (EmailTo, EmailSubject, EmailText) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      port: 587, // port for secure SMTP
      auth: {
        user: "info.parvezservice@gmail.com",
        pass: "pyfr hyao yejh zgzt",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOption = {
      from: "Zawyah-your shopping corner <info.parvezservice@gmail.com>",
      to: EmailTo,
      subject: EmailSubject,
      text: EmailText,
    };

    let info = await transporter.sendMail(mailOption);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = EmailSend;
