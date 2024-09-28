import express from "express";
import {
    getAllQuestions,
    getRandomQuestions,
    getQuestionById,
    saveQuestion,
    updateQuestion,
    deleteQuestion
} from "../controllers/questionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/")
    .get(getAllQuestions) // Fetch random questions
    .post(protect, admin, saveQuestion); // Create a new question

router.route("/random")
        .get(getRandomQuestions);

router.route("/:id")
    .get(getQuestionById)
    .put(protect, admin, checkObjectId, updateQuestion) // Update a question
    .delete(protect, admin, checkObjectId, deleteQuestion); // Delete a question

export default router;
