import express from 'express';
import { getAllPets, getAllApplications, getAllUsers } from '../Controllers/AdminControllers.js'
const router = express.Router();

// Fetch all pets
router.get('/pet', getAllPets);

// Fetch all adoption applications
router.get('/Adoption', getAllApplications);

// Fetch all users
router.get('/users', getAllUsers);

export default router;
