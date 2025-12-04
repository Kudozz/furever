import CustomerNotification from "../models/CustomerNotification.js";

// Get all notifications for a customer (or only unread)
export const getCustomerNotifications = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { unreadOnly } = req.query;

    const filter = { customerId };
    if (unreadOnly === 'true') {
      filter.isRead = false;
    }

    const notifications = await CustomerNotification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching customer notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Get unread count for customer
export const getCustomerUnreadCount = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    const unreadCount = await CustomerNotification.countDocuments({
      customerId,
      isRead: false
    });

    res.json({ unreadCount });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
};

// Mark single notification as read
export const markCustomerNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await CustomerNotification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Failed to mark as read" });
  }
};

// Mark all notifications as read for customer
export const markAllCustomerNotificationsAsRead = async (req, res) => {
  try {
    const { customerId } = req.params;

    await CustomerNotification.updateMany(
      { customerId, isRead: false },
      { isRead: true }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error marking all as read:", error);
    res.status(500).json({ message: "Failed to mark all as read" });
  }
};

// Create notification (for testing or system use)
export const createCustomerNotification = async (req, res) => {
  try {
    const notification = await CustomerNotification.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Failed to create notification" });
  }
};