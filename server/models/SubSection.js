import mongoose from "mongoose";

const SubSectionSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },

    timeDuration:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    videoUrl:{
        type:String,
        required:true
    }
    
})

export default mongoose.model("SubSection", SubSectionSchema);