import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  adopter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  meetingDate: { type: Date, required: true },
});

const Adoption = mongoose.model('Adoption', adoptionSchema);
export default Adoption;
