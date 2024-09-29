import express from "express";
import { getCompany, updateCompany } from "../controllers/companyController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

// Routes for fetching and updating a company by ID
router
  .route("/")
  .get( getCompany) // Public route
  .put(protect, admin, updateCompany); // Admin-protected route

export default router;
