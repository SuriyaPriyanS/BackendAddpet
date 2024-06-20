import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Databases/config.js";
import authRouter from "./Routes/authRouter.js";
import auctionRouter from "./Routes/auctionRouter.js";
import { errorMiddleware } from "./Utils/Error.js";

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

// Error handling middleware should be the last middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
