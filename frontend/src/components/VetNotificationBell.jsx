// VetNotificationBell.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import axios from "axios";

const VetNotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Get logged-in vet info from localStorage
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const vetId = savedUser?.vetId;

  // Fetch unread notifications
  const fetchNotifications = async () => {
    if (!vetId) return;
    try {
      const res = await axios.get(`/api/vet-notifications/${vetId}`);
      const unread = res.data.data.filter((n) => !n.isRead);
      setNotifications(unread);
      setUnreadCount(unread.length);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setLoading(false);
    }
  };

  // Real-time polling every 15s
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [vetId]);

  // Mark a notification as read
  const handleNotificationClick = async (notification) => {
    try {
      await axios.patch(`/api/vet-notifications/${notification._id}/read`);
      // Optionally navigate to actionUrl if exists
      if (notification.actionUrl) {
        window.location.href = notification.actionUrl;
      } else {
        fetchNotifications(); // Refresh notifications
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  if (!vetId) return null; // Only show for vets

  return (
    <Popover placement="bottom-end" isLazy>
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            icon={<BellIcon />}
            variant="ghost"
            aria-label="Notifications"
            colorScheme="gray"
          />
          {unreadCount > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="0"
              right="0"
              fontSize="0.6rem"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>

      <PopoverContent w="300px" maxH="350px" overflowY="auto">
        <PopoverHeader fontWeight="bold">Notifications</PopoverHeader>
        <PopoverBody>
          {loading ? (
            <Spinner size="sm" />
          ) : notifications.length === 0 ? (
            <Text fontSize="sm" color="gray.500">
              No unread notifications
            </Text>
          ) : (
            <VStack align="stretch" spacing={2}>
              {notifications.map((n) => (
                <Box
                  key={n._id}
                  p={2}
                  borderRadius="md"
                  bg="gray.50"
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => handleNotificationClick(n)}
                >
                  <Text fontSize="sm">{n.message}</Text>
                  <Text fontSize="xs" color="gray.400">
                    {new Date(n.createdAt).toLocaleString()}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default VetNotificationBell;
