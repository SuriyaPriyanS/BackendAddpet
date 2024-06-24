// // server/schemas/AdoptionRequestSchema.js
// import mongoose from "mongoose";

// const AdoptionRequestSchema = new Schema({
//   petId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Pet', // Reference to the Pet model
//     required: true
//   },
//   userEmail: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });
//   const  email = mongoose.model('email', AdoptionRequestSchema);
// export default email;