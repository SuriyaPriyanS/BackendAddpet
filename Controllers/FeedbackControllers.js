import Feedback from '../Models/FeedbackModels.js';
import Pet from '../Models/Petmodel.js';

export const addFeedback = async (req, res) => {
  const { petId, rating, comment } = req.body;
  const userId = req.user;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const feedback = new Feedback({ user: userId, pet: petId, rating, comment });
    await feedback.save();

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFeedbackForPet = async (req, res) => {
  const { petId } = req.params;

  try {
    const feedbacks = await Feedback.find({ pet: petId }).populate('user', 'email');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
