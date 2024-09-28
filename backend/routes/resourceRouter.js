import express from "express";
import {
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
    saveResource
} from "../controllers/resourceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/")
    .get(getAllResources) // Fetch random questions
    .post(protect, admin, saveResource); // Create a new question

router.route("/:id")
    .get(getResourceById)
    .put(protect, admin, checkObjectId, updateResource) // Update a question
    .delete(protect, admin, checkObjectId, deleteResource); // Delete a question

export default router;
