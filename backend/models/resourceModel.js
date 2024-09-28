import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Define your base URL (S3 bucket, Cloudinary, etc.)
const baseURL = process.env.FILE_BASE_URL;
console.log(baseURL +"-baseURL")
const resourceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: String, // Just the filename
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
  }
);

// Create a virtual field for the full image URL
resourceSchema.virtual("fileUrl").get(function () {
    if (this.file) {
      return `${baseURL}${this.file}`;
    }
    return null; // Or return a default image URL if needed
  });
  
  // Enable virtual fields to be included in the response
  resourceSchema.set("toObject", { virtuals: true });
  resourceSchema.set("toJSON", { virtuals: true });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
