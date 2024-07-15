import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  temperament: { type: String, required: true },
  specialNeeds: { type: String },
 
  photos: [{ type: String }],
  adopted: { type: Boolean, default: false },
  adoptionApplications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Adoption' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;
