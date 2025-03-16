import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },

  dob: {
    type: String,
  },

  about: {
    type: String,
    trim: true,
  },

  contactNumber: {
    type: Number,
    trim: true,
  },
});

export default mongoose.model("Profile", ProfileSchema);
