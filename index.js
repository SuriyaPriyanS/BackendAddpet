import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Databases/config.js";
import authRouter from "./Routes/authRouter.js";
import auctionRouter from "./Routes/auctionRouter.js";
import { errorMiddleware } from "./Utils/Error.js";
import nodemailer from "nodemailer";
// email from "./Routes/OwnerEmail.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Route handling
app.use("/api", authRouter);
app.use("/api", auctionRouter);
//app.use("/api", email);

// Error handling middleware should be the last middleware
app.use(errorMiddleware);
app.post('/api/send-verification-email', async (req, res) => {
  const { email } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "suriyapriyan0506gmail.com",
      subject: 'Pet Adoption Verification',
      text: 'Please verify your email to complete the pet adoption process.',
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    res.status(200).send({ message: 'Verification email sent.' });
  } catch (error) {
    console.log('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send verification email.' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
