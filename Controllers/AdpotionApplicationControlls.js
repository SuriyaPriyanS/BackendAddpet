import AdoptionApplication from "../Models/AdptionApllicationModels.js";

// Create a new adoption application
export const createAdoptionApplication = async (req, res) => {
  try {
    const { petId, applicantName, applicantEmail, applicantPhone, message, scheduledTime } = req.body;

    const newApplication = new AdoptionApplication({
      petId,
      applicantName,
      applicantEmail,
      applicantPhone,
      message,
      scheduledTime,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all adoption applications
export const getAllAdoptionApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find().populate('petId');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single adoption application by ID
export const getAdoptionApplicationById = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(req.params.id).populate('petId');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
   

    res.status(500).json({ message: error.message });
  }
};

// Update an adoption application by ID
export const updateAdoptionApplication = async (req, res) => {
  try {
    const { petId, applicantName, applicantEmail, applicantPhone, message, status, scheduledTime } = req.body;
    const updatedApplication = await AdoptionApplication.findByIdAndUpdate(
      req.params.id,
      { petId, applicantName, applicantEmail, applicantPhone, message, status, scheduledTime },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an adoption application by ID
export const deleteAdoptionApplication = async (req, res) => {
  try {
    const deletedApplication = await AdoptionApplication.findByIdAndDelete(req.params.id);

    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};