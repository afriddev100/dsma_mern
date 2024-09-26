import express from 'express';
import { 
  getPaymentsByEnrollment, 
  addPayment, 
  deletePayment 
} from '../controllers/paymentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

// Admin routes for payments
router.route('/enrollment/:enrollmentId')
  .get(protect, admin, getPaymentsByEnrollment); // Get all payments under an enrollment (Admin access only)

router.route('/')
  .post(protect, admin, addPayment); // Add a payment (Admin access only)

router.route('/:id')
  .delete(protect, admin, deletePayment); // Delete a payment (Admin access only)

export default router;
