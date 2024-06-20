import User from "../Models/authModel.js";
import { errorHandler } from "../Utils/Error.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHandler(400, 'All the Fields Are Required'));
    }

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User Registered Successfully", result: newUser });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, 'All the Fields Are Required'));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, 'Invalid credentials'));
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(errorHandler(404, 'Invalid credentials'));
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: passkey, ...rest } = user.toObject();  // Convert user to plain object and exclude password
        res.status(200).json({ message: 'User logged in successfully', user: rest, token });

    } catch (error) {
        next(error);
    }
}
