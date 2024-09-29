import Notification from '../models/notificationModel.js';
import moment from 'moment';

// Create a new notification
 const createNotification = async (req, res) => {
  const { message, expiry } = req.body;

  try {
    const notification = new Notification({
      message,
      expiry
    });

    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);
  } catch (error) {
    res.status(400).json({ message: 'Error creating notification', error });
  }
};

// Edit a notification
 const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { message, expiry } = req.body;

  try {
    const notification = await Notification.findById(id);
    if (notification) {
      notification.message = message || notification.message;
      notification.expiry = expiry || notification.expiry;

      const updatedNotification = await notification.save();
      res.json(updatedNotification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating notification', error });
  }
};

// Delete a notification
 const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);
    if (notification) {
      await notification.deleteOne();
      res.json({ message: 'Notification removed' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error deleting notification', error });
  }
};

// Get list of all notifications
 const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching notifications', error });
  }
};

// Get list of all notifications
const getNotificationById = async (req, res) => {

  try {
    
    const notifications = await Notification.findById(req.params.id);
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching notifications', error });
  }
};

// Get active notifications where expiry is a string and greater than or equal to today
 const getActiveNotifications = async (req, res) => {
    try {
      const today = moment().format('YYYY-MM-DD'); // Get today's date in the same string format
  
      // Find notifications where expiry is greater than or equal to today's date
      const activeNotifications = await Notification.find({
        expiry: { $gte: today }
      });
  
      res.json(activeNotifications);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error fetching active notifications', error });
    }
  };

export {
    createNotification,
    updateNotification,
    deleteNotification,
    getNotifications,
    getActiveNotifications,
    getNotificationById


}; 
