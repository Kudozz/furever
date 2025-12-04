import express from "express";
import {
  getVetNotifications,
  getVetUnreadCount,
  markVetNotificationAsRead,
  markAllVetNotificationsAsRead,
  createVetNotification
} from "../controllers/vetNotificationController.js";

const router = express.Router();

// Get unread notifications count for vet
router.get("/:vetId/unread-count", getVetUnreadCount);

// Get all notifications for a vet (with optional filter for unread only)
router.get("/:vetId", getVetNotifications);

// Mark a single notification as read
router.patch("/:id/read", markVetNotificationAsRead);

// Mark all notifications as read for a vet
router.patch("/:vetId/read-all", markAllVetNotificationsAsRead);

// Create notification (for testing)
router.post("/", createVetNotification);

export default router;