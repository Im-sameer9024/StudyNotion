import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
    
})

export default mongoose.model("Tag", TagSchema);