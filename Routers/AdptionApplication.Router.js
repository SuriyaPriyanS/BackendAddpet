import express from 'express';
import {
  createAdoptionApplication,
  getAllAdoptionApplications,
  getAdoptionApplicationById,
  updateAdoptionApplication,
  deleteAdoptionApplication,
} from '../Controllers/AdpotionApplicationControlls.js';

const router = express.Router();

router.post('/Adoption', createAdoptionApplication);
router.get('/Adoption', getAllAdoptionApplications);
router.get('/:id', getAdoptionApplicationById);
router.put('/:id', updateAdoptionApplication);
router.delete('/:id', deleteAdoptionApplication);

export default router;
