import Notification from "../models/notificationModel.js";

// Get all notifications for a user (or vet)
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ receiverId: userId })
      .sort({ createdAt: -1 }); // latest first

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

// Get unread notifications count for a user
export const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const count = await Notification.countDocuments({ receiverId: userId, read: false });

    res.json({ unreadCount: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching unread notifications count" });
  }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notification) return res.status(404).json({ message: "Notification not found" });

    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking notification as read" });
  }
};

// Mark all notifications as read for a user and return updated notifications
export const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.updateMany({ receiverId: userId, read: false }, { read: true });

    // Return updated notifications list
    const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });

    res.json({ message: "All notifications marked as read", notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking all notifications as read" });
  }
};
