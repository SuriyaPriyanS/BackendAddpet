import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
   
    date: { type: Date, default: Date.now },
    profilePicture:{
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
  }
});

  const User = mongoose.model('User', userSchema);

export default User;