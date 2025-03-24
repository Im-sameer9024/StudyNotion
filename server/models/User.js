import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  accountType:{
    type:String,
    enum:['Admin','Student','Instructor'],
    required:true
  },

  additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Profile'
  },

  courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  }],

  image:{
    type:String,
    required:true
  },

  token:{
    type:String,
  },

  resetPasswordExpires:{
    type:Date,
  },

  courseProgress:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"CourseProgress"
  }]

},{minimize:true});

export default mongoose.model("User", UserSchema) 