import Pet from '../Models/Petmodel.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addPet = async (req, res) => {
  const { name, breed, age, temperament, specialNeeds } = req.body;
  const owner = req.user;

  try {
    const newPet = new Pet({ name, breed, age, temperament, specialNeeds, owner });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePet = async (req, res) => {
  const { id } = req.params;
  const { name, breed, age, temperament, specialNeeds } = req.body;

  try {
    const updatedPet = await Pet.findByIdAndUpdate(id, { name, breed, age, temperament, specialNeeds }, { new: true });
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePet = async (req, res) => {
  const { id } = req.params;

  try {
    await Pet.findByIdAndDelete(id);
    res.json({ message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadPetPhoto = upload.single('photo');
