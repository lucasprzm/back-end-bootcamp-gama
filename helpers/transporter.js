const nodemailer = require("nodemailer");
require("dotenv/config");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

module.exports = transporter;
