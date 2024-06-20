
import express from 'express';
import { login, register } from '../Controllers/authControllers.js';

const router = express.Router();

router.post('/login', login);
router.post('/register-user', register);

export default router;

