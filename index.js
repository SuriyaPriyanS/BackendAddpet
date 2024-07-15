import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './Routers/UserRouter.js';
import petRoutes from './Routers/PetRouter.js';
import adoptionRoutes from './Routers/AdptionRouter.js';
import feedbackRoutes from './Routers/FeedbackRouter.js';
import Adption from './Routers/AdptionApplication.Router.js'
import connectDB from './Databases/config.js';

dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        error: {
            message: error.message || 'Internal Server Error',
        },
    });
});

// Routes
app.use('/api', authRoutes);
app.use('/api', petRoutes);
app.use('/api', adoptionRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api', Adption);

// MongoDB Connection


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
