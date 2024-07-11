// server/utils/emailService.js

import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,  // Replace with your email address
    pass: EMAIL_PASS,   // Replace with your email password or app-specific password
  }
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: email,  // Replace with your email address
      to,
      subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.log('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;
