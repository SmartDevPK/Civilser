import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use another service like SendGrid, Mailgun, etc.
    auth: {
      user: process.env.EMAIL_USERNAME,   // Your email address
      pass: process.env.EMAIL_PASSWORD,   // Your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error('Email sending failed: ' + err.message);
  }
};

export default sendEmail;
