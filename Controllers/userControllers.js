import User from "../Models/Usermodels.js";
import errorHandler from "./Utils/Error.js";
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
        const isPasswordCorrect =  bcryptjs.compareSync(password, user.password);
        if (!user) {
            return next(errorHandler(404, 'Invalid credentials'));
        }

        
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

export const google = async (req, res, next) => {
    const { email, name, profilePic } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET_KEY
        );
  
        const { password: passkey, ...rest } = user._doc;
  
        res
          .status(200)
          .json({ message: "User LoggedIn Successfully", rest, token });
      } else {
        const generatePassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: profilePic,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.JWT_SECRET_KEY
        );
  
        const { password: passkey, ...rest } = newUser._doc;
  
        res
          .status(200)
          .json({ message: "User LoggedIn Successfully", rest, token });
      }
    } catch (error) {
      next(error);
    }
  };