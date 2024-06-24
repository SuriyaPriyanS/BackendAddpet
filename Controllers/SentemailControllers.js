// // Backend/controllers/petController.js
// import Email from  "../Models/emailModel.js";
// import sendEmail from '../nodemailer/sendEmail.js'; // Ensure this path is correct

// export const adopat = async (req, res) => {
//   const { petId, userEmail } = req.body;

//   try {
//     // Fetch pet details from the database
//     const pet = await Email.findById(petId).populate('owner');
//     if (!pet) {
//       return res.status(404).json({ message: 'Pet not found' });
//     }

//     // Perform the adoption logic (e.g., update pet status, send confirmation email)
//     pet.adopted = true;
//     await pet.save();

//     // Send email to pet owner
//     const ownerEmail = pet.owner.email; // Assuming pet owner's email is stored in the pet document
//     const emailSubject = 'Adoption Request for Your Pet';
//     const emailContent = `
//       <p>Dear ${pet.owner.name},</p>
//       <p>We have received an adoption request for your pet ${pet.name}. Please contact the adopter at ${userEmail}.</p>
//       <p>Best regards,<br>Your Organization</p>
//     `;

//     await sendEmail(ownerEmail, emailSubject, emailContent);

//     res.status(200).json({ message: 'Adoption request processed successfully' });
//   } catch (error) {
//     console.log('Error adopting pet:', error);
//     res.status(500).json({ message: 'Failed to process adoption request' });
//   }
// };
