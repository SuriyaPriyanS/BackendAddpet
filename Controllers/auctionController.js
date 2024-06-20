import Pet from '../Models/authModel.js'; // Ensure correct path and file name

const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPetById = async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.id);
        if (foundPet) {
            res.json(foundPet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addPet = async (req, res) => {
    const { id, name, breed, age, temperament, specialNeeds, description, photos, isAdopted } = req.body;

    try {
        const newPet = new Pet({
            id,
            name,
            breed,
            age,
            temperament,
            specialNeeds,
            description,
            photos,
            isAdopted
        });

        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePet = async (req, res) => {
    const { name, breed, age, temperament, specialNeeds, description, photos, isAdopted } = req.body;

    try {
        const petToUpdate = await Pet.findById(req.params.id); // Change variable name
        if (petToUpdate) {
            petToUpdate.name = name || petToUpdate.name;
            petToUpdate.breed = breed || petToUpdate.breed;
            petToUpdate.age = age || petToUpdate.age;
            petToUpdate.temperament = temperament || petToUpdate.temperament;
            petToUpdate.specialNeeds = specialNeeds || petToUpdate.specialNeeds;
            petToUpdate.description = description || petToUpdate.description; // Corrected variable name
            petToUpdate.photos = photos || petToUpdate.photos;
            petToUpdate.isAdopted = isAdopted || petToUpdate.isAdopted;

            const updatedPet = await petToUpdate.save();
            res.json(updatedPet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePet = async (req, res) => {
    try {
        const petToDelete = await Pet.findById(req.params.id);
        if (petToDelete) {
            await petToDelete.remove();
            res.json({ message: 'Pet removed' });
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllPets, getPetById, addPet, updatePet, deletePet };
