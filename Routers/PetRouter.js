import express from 'express';
import { getAllPets, addPet, updatePet, deletePet, uploadPetPhoto } from '../Controllers/PetControllers.js';
import authMiddleware from '../Middlwares/AuthMiddlware.js';
import Pet from '../Models/Petmodel.js';

const router = express.Router();

router.get('/pet', getAllPets);
router.post('/pet', addPet);
router.put('/pet/:id', updatePet);
router.delete('/:id', authMiddleware, deletePet);
router.post('/:id/photo', authMiddleware, uploadPetPhoto, async (req, res) => {
  const { id } = req.params;
  const { buffer, mimetype } = req.file;

  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    pet.photos = { data: buffer, contentType: mimetype };
    await pet.save();

    res.json({ message: 'Photo uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
