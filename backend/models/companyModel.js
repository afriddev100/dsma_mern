import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Define your base URL (S3 bucket, Cloudinary, etc.)
const baseURL = process.env.IMAGE_BASE_URL;
console.log(baseURL +"-baseURL")

const companySchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
        required: false,
      },
    },
    {
      timestamps: true,
    }
  );

  // Create a virtual field for the full image URL
  companySchema.virtual("logoUrl").get(function () {
    if (this.logo) {
      return `${baseURL}${this.logo}`;
    }
    return null; // Or return a default image URL if needed
  });
  
  // Enable virtual fields to be included in the response
  companySchema.set("toObject", { virtuals: true });
  companySchema.set("toJSON", { virtuals: true });
  
  const Company = mongoose.model("Company", companySchema);

  
  
  export default Company;
  