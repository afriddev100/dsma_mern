import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Define your base URL (S3 bucket, Cloudinary, etc.)
const baseURL = process.env.IMAGE_BASE_URL;

console.log("Base URL:QUESTION MODEL", baseURL);


const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
  expiry:  {
        type:String,
        required:true
    }
}, { timestamps: true });


const Question = mongoose.model("Notification", notificationSchema);

export default Notification;
