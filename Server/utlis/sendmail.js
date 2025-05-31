const nodemailer = require("nodemailer");
require("dotenv").config();
async function Sendmail(useremail, htmltemplate,subject) {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.HOST,
      pass: process.env.HOST_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.HOST,
    to: useremail,
    subject: subject,
 
    html: htmltemplate,
  });

  return info;
}

module.exports = Sendmail;
