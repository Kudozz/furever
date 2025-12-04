import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const CustomerNotificationBell = ({ customerId }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(`/api/customer-notifications/${customerId}/unread-count`);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  // Fetch unread notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/customer-notifications/${customerId}?unreadOnly=true`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(`/api/customer-notifications/${notificationId}/read`);
      
      // Update local state
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await axios.patch(`/api/customer-notifications/${customerId}/read-all`);
      setNotifications([]);
      setUnreadCount(0);
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  // Toggle popup
  const togglePopup = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Poll for unread count
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [customerId]);

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ea580c';
      case 'medium': return '#2563eb';
      case 'low': return '#64748b';
      default: return '#2563eb';
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'appointment_confirmed': return '✅';
      case 'appointment_reminder': return '⏰';
      case 'appointment_cancelled': return '❌';
      case 'appointment_rescheduled': return '📅';
      case 'payment_received': return '💳';
      case 'payment_due': return '💰';
      case 'order_status': return '📦';
      case 'promotional': return '🎉';
      default: return '📢';
    }
  };

  return (
    <div style={{ position: "relative" }} ref={popupRef}>
      {/* Bell Icon */}
      <div
        onClick={togglePopup}
        style={{
          position: "relative",
          cursor: "pointer",
          fontSize: "24px",
          color: "white",
          padding: "8px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "11px",
              fontWeight: "bold",
              minWidth: "18px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>

      {/* Notification Popup */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
            marginTop: "8px",
            width: "380px",
            maxHeight: "500px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 1000,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f9fafb"
            }}
          >
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#111827" }}>
              Notifications
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "500",
                  padding: "4px 8px",
                  borderRadius: "4px"
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div style={{ overflowY: "auto", maxHeight: "420px", flex: 1 }}>
            {loading ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
                Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔕</div>
                <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                  No unread notifications
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid #f3f4f6",
                    cursor: "pointer",
                    backgroundColor: "white",
                    position: "relative"
                  }}
                  onClick={() => markAsRead(notification._id)}
                >
                  {/* Priority Indicator */}
                  {notification.priority && notification.priority !== 'low' && (
                    <div
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "0",
                        bottom: "0",
                        width: "3px",
                        backgroundColor: getPriorityColor(notification.priority)
                      }}
                    />
                  )}

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    {/* Icon */}
                    <div style={{ fontSize: "24px", flexShrink: 0 }}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ marginBottom: "6px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            backgroundColor: "#dbeafe",
                            color: "#1e40af"
                          }}
                        >
                          {notification.type.replace(/_/g, " ")}
                        </span>
                      </div>

                      <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#111827", lineHeight: "1.5" }}>
                        {notification.message}
                      </p>

                      <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                        {formatTime(notification.createdAt)}
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification._id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#9ca3af",
                        cursor: "pointer",
                        fontSize: "18px",
                        padding: "4px",
                        flexShrink: 0
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerNotificationBell;