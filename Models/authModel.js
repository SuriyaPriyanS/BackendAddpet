import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    temperament: {
        type: String,
        required: true
    },
    specialNeeds: {
        type: String,
        default: 'none'
    },
    description: {
        type: String,
        required: true
    },
    photos: [{
        type: String
    }],
    isAdopted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    lifeExpectancy: {
        type: Number,
        default: null
    }
}, { toJSON: { virtuals: true } });

// Define virtual field for id
PetSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Pet = mongoose.model('Pet', PetSchema);

export default Pet;
