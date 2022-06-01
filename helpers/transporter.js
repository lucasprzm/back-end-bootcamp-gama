const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: "postmaster@sandbox652c28128a274d1b9d6dc0a961dc0673.mailgun.org",
    pass: "a3256932288b6980fab8cb7aa076a87e-27a562f9-cf8a182a",
  },
});

module.exports = transporter;
