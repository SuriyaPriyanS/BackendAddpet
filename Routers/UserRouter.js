import express from 'express';
import { register,login, google   } from '../Controllers/UserControllers.js';
import authMiddleware from '../Middlwares/AuthMiddlware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
//router.get('/profile', authMiddleware, getUserProfile);
router.post('/google', google);

export default router;
