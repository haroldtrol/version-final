import mongoose from "mongoose";


export const connectDB = async () => {
 try {
    await mongoose.connect("mongodb://localhost/crudb");
    console.log("MongoDB is connected"); 
 } catch (error) {
    console.error("mal", error);  
 } 
  }