import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationBell = ({ vetId, onClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(`/api/notifications/vet/${vetId}/unreadCount`);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    const interval = setInterval(fetchUnreadCount, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [vetId]);

  return (
    <div style={{ position: "relative", cursor: "pointer" }} onClick={onClick}>
      🔔
      {unreadCount > 0 && (
        <span style={{
          position: "absolute",
          top: -5,
          right: -5,
          background: "red",
          color: "white",
          borderRadius: "50%",
          padding: "2px 6px",
          fontSize: "12px"
        }}>
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
