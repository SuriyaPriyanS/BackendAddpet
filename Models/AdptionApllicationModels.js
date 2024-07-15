import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AdoptionApplicationSchema = new Schema({
  petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantPhone: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  scheduledTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const AdoptionApplication = mongoose.model('AdoptionApplication', AdoptionApplicationSchema);

export default AdoptionApplication;

