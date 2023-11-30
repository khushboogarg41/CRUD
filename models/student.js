import mongoose from "mongoose";

const student=new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  roll:{
    type: Number,
    required: true,
  },
  marks:{
    type: Number,
    required: true,
  }
  
})

const Students=mongoose.model("Students",student);

export default Students;
