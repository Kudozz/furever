//notificationroutes.js
import express from "express";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead
} from "../controllers/notificationController.js";

const router = express.Router();

// Get all notifications
router.get("/:userId", getNotifications);

// Get unread notifications count
router.get("/:userId/unread-count", getUnreadCount);

// Mark a single notification as read
router.patch("/read/:id", markAsRead);

// Mark all notifications as read
router.patch("/read-all/:userId", markAllAsRead);

export default router;
