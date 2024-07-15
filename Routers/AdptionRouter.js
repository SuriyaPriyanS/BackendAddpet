import express from 'express';
import { applyForAdoption, updateAdoptionStatus, getAdoptionsByUser } from '../Controllers/AdpotionControllers.js';
import authMiddleware from '../Middlwares/AuthMiddlware.js';

const router = express.Router();

router.post('/adoptions',  applyForAdoption);
router.put('/:id', authMiddleware, updateAdoptionStatus);
router.get('/', authMiddleware, getAdoptionsByUser);

export default router;
