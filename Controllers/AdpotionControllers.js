import Adoption from '../Models/AdptionModel.js';
import Pet from '../Models/Petmodel.js';
//import User from '../Models/Usermodels.js';

export const applyForAdoption = async (req, res) => {
  const { petId, meetingDate } = req.body;
  const adopterId = req.user;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const adoption = new Adoption({ pet: petId, adopter: adopterId, meetingDate });
    await adoption.save();

    res.status(201).json(adoption);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAdoptionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const adoption = await Adoption.findById(id);
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption application not found' });
    }

    adoption.status = status;
    await adoption.save();

    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAdoptionsByUser = async (req, res) => {
  const userId = req.user;

  try {
    const adoptions = await Adoption.find({ adopter: userId }).populate('pet');
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
