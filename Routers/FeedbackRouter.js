import express from 'express';
import { addFeedback, getFeedbackForPet } from '../Controllers/FeedbackControllers.js';
import authMiddleware from '../Middlwares/AuthMiddlware.js';

const router = express.Router();

router.post('/', authMiddleware, addFeedback);
router.get('/:petId', getFeedbackForPet);

export default router;
