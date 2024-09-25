import express from 'express';
import { 
  getEnrollments,
  getEnrollmentById,
  saveEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
  checkEnrollmentStatus,
} from '../controllers/enrollmentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

// Public route for saving a new enrollment
router.route('/')
  .post(saveEnrollment) // Public access

router.route('/status/:identifier')
.get(checkEnrollmentStatus)

// Admin routes for managing enrollments
router.route('/')
  .get(protect, admin, getEnrollments); // Get all enrollments (Admin access only)

router.route('/:id')
  .get(protect, admin, checkObjectId, getEnrollmentById) // Get an enrollment by ID (Admin access only)
  .put(protect, admin, checkObjectId, updateEnrollmentStatus) // Update enrollment status (Admin access only)
  .delete(protect, admin, checkObjectId, deleteEnrollment); // Delete an enrollment (Admin access only)

export default router;
