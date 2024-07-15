import Pet from '../Models/Petmodel.js';
import AdoptionApplication from '../Models/AdptionApllicationModels.js';
import User from '../Models/Usermodels.js';

export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching adoption applications', error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
