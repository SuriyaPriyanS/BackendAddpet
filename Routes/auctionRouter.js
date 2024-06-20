import express from 'express';
import { getAllPets, getPetById, addPet, updatePet, deletePet } from '../Controllers/auctionController.js';
import auction from '../Middlware/authMiddleware.js';
const router = express.Router();

// GET all pets
router.get('/pets', getAllPets);

// GET a single pet by ID
router.get('/pets/id', getPetById);

// POST add a new pet
router.post('/pets', addPet);

// PUT update a pet by ID
router.put('/pets/id', updatePet);

// DELETE a pet by ID
router.delete('/pets/id', deletePet);

export default router;
