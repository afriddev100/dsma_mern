import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import { getDashboardData } from '../controllers/dashboardController.js';



const router = express.Router();

// Public route for saving a new enrollment
router.route('/')
  .get(getDashboardData) // Public access

  export default router;