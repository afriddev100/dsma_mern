import express from 'express';
import {
  createNotification,
  updateNotification,
  deleteNotification,
  getNotifications,
  getActiveNotifications,
  getNotificationById
} from '../controllers/notificationController.js';

const router = express.Router();

// @route   POST /api/notifications
// @desc    Create a new notification
// @access  Public
router.post('/', createNotification);

// @route   PUT /api/notifications/:id
// @desc    Edit an existing notification
// @access  Public
router.put('/:id', updateNotification);

// @route   DELETE /api/notifications/:id
// @desc    Delete a notification
// @access  Public
router.delete('/:id', deleteNotification);

// @route   GET /api/notifications
// @desc    Get all notifications
// @access  Public
router.get('/', getNotifications);

router.get('/notify', getActiveNotifications);

// @route   GET /api/notifications
// @desc    Get all notifications
// @access  Public
router.get('/:id', getNotificationById);




export default router;
