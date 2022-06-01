const nodemailer = require("nodemailer");
require("dotenv/config");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.MAILGUN_SMTP_SERVER,
  port: process.env.MAILGUN_SMTP_PORT,
  auth: {
    user: process.env.MAILGUN_SMTP_LOGIN,
    pass: process.env.MAILGUN_SMTP_PASSWORD,
  },
});

module.exports = transporter;
