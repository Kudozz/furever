import express from "express";
import {
  getCustomerNotifications,
  getCustomerUnreadCount,
  markCustomerNotificationAsRead,
  markAllCustomerNotificationsAsRead,
  createCustomerNotification
} from "../controllers/customerNotificationController.js";

const router = express.Router();

// Get unread notifications count for customer
router.get("/:customerId/unread-count", getCustomerUnreadCount);

// Get all notifications for a customer (with optional filter for unread only)
router.get("/:customerId", getCustomerNotifications);

// Mark a single notification as read
router.patch("/:id/read", markCustomerNotificationAsRead);

// Mark all notifications as read for a customer
router.patch("/:customerId/read-all", markAllCustomerNotificationsAsRead);

// Create notification (for testing)
router.post("/", createCustomerNotification);

export default router;