import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Define your base URL (S3 bucket, Cloudinary, etc.)
const baseURL = process.env.IMAGE_BASE_URL;
console.log(baseURL +"-baseURL")

const trainingPackageSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    name:{
        type:String,
        required:true

    },
    
    description:{
        type:String,
        required:true

    },
    price:{
        type:String,
        required:true

    },
    duration:{
        type:String,
        required:true

    },
    image:{
        type:String,
        required:false
    }

},{timestamps:true

});

// Create a virtual field for the full image URL
trainingPackageSchema.virtual("imageUrl").get(function () {
    if (this.image) {
      return `${baseURL}${this.image}`;
    }
    return null; // Or return a default image URL if needed
  });
  
  // Enable virtual fields to be included in the response
  trainingPackageSchema.set("toObject", { virtuals: true });
  trainingPackageSchema.set("toJSON", { virtuals: true });

const TrainingPackage=mongoose.model("TrainingPackage",trainingPackageSchema);

export default TrainingPackage;