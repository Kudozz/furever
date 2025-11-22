import React, { useEffect, useState } from "react";
import axios from "axios";

const VetNotifications = ({ vetId, onClose }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch all notifications for vet
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`/api/notifications/vet/${vetId}`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  // Handle accept/reject
  const handleDecision = async (appointmentId, status, notificationId) => {
    try {
      // Update appointment status
      await axios.patch(`/api/appointments/${appointmentId}/decision`, { status });

      // Optionally mark notification as read
      await axios.patch(`/api/notifications/${notificationId}/read`);

      fetchNotifications(); // Refresh
    } catch (err) {
      console.error("Failed to update appointment:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div style={{
      position: "absolute",
      top: "40px",
      right: "0",
      width: "350px",
      maxHeight: "400px",
      overflowY: "auto",
      border: "1px solid #ccc",
      background: "#fff",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      zIndex: 1000
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #eee" }}>
        <strong>Notifications</strong>
        <button onClick={onClose}>X</button>
      </div>
      {notifications.length === 0 ? (
        <p style={{ padding: "10px" }}>No notifications</p>
      ) : (
        notifications.map((notif) => (
          <div key={notif._id} style={{
            borderBottom: "1px solid #eee",
            padding: "10px",
            background: notif.read ? "#f9f9f9" : "#e6f7ff"
          }}>
            <p>{notif.message}</p>
            {!notif.read && notif.type === "appointment" && (
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => handleDecision(notif.appointmentId, "accepted", notif._id)}>Accept</button>
                <button onClick={() => handleDecision(notif.appointmentId, "rejected", notif._id)}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default VetNotifications;
