import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Define your base URL (S3 bucket, Cloudinary, etc.)
const baseURL = process.env.IMAGE_BASE_URL;

console.log("Base URL:QUESTION MODEL", baseURL);


const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    options: {
        type: String, // Store options as an array
        required: true
    },
    rightAnswer: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: "" // Default value for answer
    }
}, { timestamps: true });

// Create a virtual field for the full image URL
questionSchema.virtual("imageUrl").get(function () {
    if (this.image) {
        return `${baseURL}${this.image}`;
    }
    return null; // Or return a default image URL if needed
});

// Enable virtual fields to be included in the response
questionSchema.set("toObject", { virtuals: true });
questionSchema.set("toJSON", { virtuals: true });

const Question = mongoose.model("Question", questionSchema);

export default Question;
