import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Image,
  Text,
  Input,
  Textarea,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  IconButton,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { EditIcon, BellIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Sidebar from "../../components/vet/VetSidebar";
import Header from "../../components/Header";
import API from "../../services/api";

function Profile() {
  const [vetData, setVetData] = useState(null);
  const [editData, setEditData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const toast = useToast();

  // Get current vet user from localStorage
  const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user;
  };

  // Fetch vet profile from database
  const fetchVetProfile = async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();
      
      if (!currentUser._id) {
        throw new Error("No user found in localStorage");
      }

      // Get all vets and find the one with matching user ID
      const response = await API.get("/vets");
      const allVets = response.data.data;
      
      // Find vet profile for current user
      const myVet = allVets.find(vet => vet.user._id === currentUser._id);
      
      if (!myVet) {
        throw new Error("Vet profile not found");
      }

      setVetData(myVet);
      setEditData({
        speciality: myVet.speciality || "",
        experienceYears: myVet.experienceYears || 0,
        bio: myVet.bio || "",
        profilePicture: myVet.profilePicture || "",
        phoneNumber: myVet.phoneNumber || "",
        qualifications: myVet.qualifications || "",
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to load profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications from database
  const fetchNotifications = async () => {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser._id) return;

      // Fetch notifications for this user
      const response = await API.get(`/notifications/${currentUser._id}`);
      setNotifications(response.data.data || response.data || []);
      
      // Fetch unread count
      const countResponse = await API.get(`/notifications/${currentUser._id}/unread-count`);
      setUnreadCount(countResponse.data.count || countResponse.data.unreadCount || 0);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  // Update profile in database
  const handleUpdateProfile = async () => {
    try {
      if (!vetData?._id) {
        toast({
          title: "Error",
          description: "Vet profile not found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Make PUT request to update vet
      const response = await API.put(`/vets/${vetData._id}`, editData);
      
      if (response.data.success) {
        // Refresh profile data
        await fetchVetProfile();
        
        onEditClose();
        toast({
          title: "Success",
          description: "Profile updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle appointment decision (accept/reject)
  const handleDecision = async (appointmentId, status, notificationId) => {
    try {
      // Update appointment status in database
      await API.patch(`/appointments/${appointmentId}/status`, { 
        status: status 
      });

      // Mark notification as read
      await API.patch(`/notifications/read/${notificationId}`);
      
      // Refresh notifications
      await fetchNotifications();
      
      toast({
        title: "Success",
        description: `Appointment ${status}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Decision error:", err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update appointment",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Mark notification as read without action
  const markNotificationAsRead = async (notificationId) => {
    try {
      await API.patch(`/notifications/read/${notificationId}`);
      await fetchNotifications();
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  useEffect(() => {
    fetchVetProfile();
    fetchNotifications();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box bgImage="url('/background.jpg')" bgSize="cover" minH="100vh">
        <Sidebar />
        <Box ml={{ base: 0, md: "230px" }} p={6}>
          <Center h="80vh">
            <Spinner size="xl" color="white" thickness="4px" />
          </Center>
        </Box>
      </Box>
    );
  }

  if (!vetData) {
    return (
      <Box bgImage="url('/background.jpg')" bgSize="cover" minH="100vh">
        <Sidebar />
        <Box ml={{ base: 0, md: "230px" }} p={6}>
          <Header title="Profile" />
          <Center h="60vh">
            <Text color="white" fontSize="xl" bg="rgba(0,0,0,0.5)" p={4} borderRadius="md">
              Vet profile not found
            </Text>
          </Center>
        </Box>
      </Box>
    );
  }

  return (
    <Box bgImage="url('/background.jpg')" bgSize="cover" minH="100vh">
      <Sidebar />
      
      <Box ml={{ base: 0, md: "230px" }} p={6}>
        {/* Header with Notification Bell */}
        <Flex justify="space-between" align="center" mb={6}>
          <Header title="My Profile" />
          
          <Box position="relative">
            <IconButton
              icon={<BellIcon />}
              onClick={() => setShowNotifications(!showNotifications)}
              bg="white"
              color="#3a2f2f"
              size="lg"
              borderRadius="full"
              _hover={{ bg: "gray.100" }}
              aria-label="Notifications"
            />
            {unreadCount > 0 && (
              <Badge
                position="absolute"
                top="-5px"
                right="-5px"
                colorScheme="red"
                borderRadius="full"
                fontSize="xs"
                px={2}
              >
                {unreadCount}
              </Badge>
            )}

            {/* Notifications Popup */}
            {showNotifications && (
              <Box
                position="absolute"
                top="60px"
                right="0"
                width="400px"
                maxH="500px"
                overflowY="auto"
                bg="white"
                borderRadius="15px"
                boxShadow="2xl"
                zIndex={1000}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  p={4}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  bg="#c09a7f"
                  borderTopRadius="15px"
                >
                  <Text fontWeight="bold" fontSize="lg" color="white">
                    Notifications
                  </Text>
                  <IconButton
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={() => setShowNotifications(false)}
                    bg="transparent"
                    color="white"
                    _hover={{ bg: "rgba(255,255,255,0.2)" }}
                    aria-label="Close notifications"
                  />
                </Flex>

                {notifications.length === 0 ? (
                  <Text p={4} textAlign="center" color="gray.500">
                    No notifications
                  </Text>
                ) : (
                  notifications.map((notif) => (
                    <Box
                      key={notif._id}
                      p={4}
                      borderBottom="1px solid"
                      borderColor="gray.100"
                      bg={notif.isRead ? "white" : "#e6f7ff"}
                      cursor="pointer"
                      onClick={() => !notif.isRead && markNotificationAsRead(notif._id)}
                    >
                      <Text fontSize="sm" mb={2} color="#3a2f2f">
                        {notif.message}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(notif.createdAt).toLocaleString()}
                      </Text>
                      {!notif.isRead && notif.type === "appointment_request" && notif.relatedId && (
                        <HStack spacing={2} mt={3}>
                          <Button
                            size="sm"
                            bg="#4CAF50"
                            color="white"
                            _hover={{ bg: "#45a049" }}
                            leftIcon={<CheckIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecision(notif.relatedId, "accepted", notif._id);
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            bg="#f44336"
                            color="white"
                            _hover={{ bg: "#da190b" }}
                            leftIcon={<CloseIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecision(notif.relatedId, "rejected", notif._id);
                            }}
                          >
                            Reject
                          </Button>
                        </HStack>
                      )}
                    </Box>
                  ))
                )}
              </Box>
            )}
          </Box>
        </Flex>

        {/* Profile Card */}
        <Box
          bg="white"
          borderRadius="18px"
          p={8}
          boxShadow="md"
        >
          <Flex direction={{ base: "column", md: "row" }} gap={8}>
            {/* Profile Picture Section */}
            <VStack spacing={4} align="center" minW="250px">
              <Image
                src={vetData?.profilePicture || "https://via.placeholder.com/250"}
                alt={vetData?.user?.name || "Veterinarian"}
                borderRadius="20px"
                boxSize="250px"
                objectFit="cover"
                boxShadow="lg"
              />
              <Badge
                colorScheme={vetData?.status ? "green" : "red"}
                fontSize="md"
                px={4}
                py={1}
                borderRadius="full"
              >
                {vetData?.status ? "Active" : "Inactive"}
              </Badge>
            </VStack>

            {/* Profile Information */}
            <VStack flex={1} align="stretch" spacing={6}>
              <Flex justify="space-between" align="start">
                <VStack align="start" spacing={2}>
                  <Text fontSize="3xl" fontWeight="bold" color="#3a2f2f">
                    {vetData?.user?.name || "Unknown"}
                  </Text>
                  <Text fontSize="lg" color="gray.600">
                    {vetData?.user?.email || "No email"}
                  </Text>
                  {vetData?.phoneNumber && (
                    <Text fontSize="lg" color="gray.600">
                      📞 {vetData.phoneNumber}
                    </Text>
                  )}
                </VStack>

                <IconButton
                  icon={<EditIcon />}
                  onClick={onEditOpen}
                  bg="#c09a7f"
                  color="white"
                  size="lg"
                  _hover={{ bg: "#a57e63" }}
                  aria-label="Edit profile"
                />
              </Flex>

              <HStack spacing={4} flexWrap="wrap">
                <Badge colorScheme="blue" fontSize="md" px={4} py={2} borderRadius="full">
                  {vetData?.speciality || "General Practice"}
                </Badge>
                <Badge colorScheme="green" fontSize="md" px={4} py={2} borderRadius="full">
                  {vetData?.experienceYears || 0} years experience
                </Badge>
              </HStack>

              {vetData?.qualifications && (
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" color="#3a2f2f" mb={2}>
                    Qualifications:
                  </Text>
                  <Text fontSize="md" color="gray.700">
                    {vetData.qualifications}
                  </Text>
                </Box>
              )}

              {vetData?.bio && (
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" color="#3a2f2f" mb={2}>
                    About Me:
                  </Text>
                  <Text fontSize="md" color="gray.700" lineHeight="tall">
                    {vetData.bio}
                  </Text>
                </Box>
              )}
            </VStack>
          </Flex>
        </Box>
      </Box>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#c09a7f" color="white" borderTopRadius="md">
            Edit Profile
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel color="#3a2f2f">Speciality</FormLabel>
                <Input
                  value={editData.speciality}
                  onChange={(e) =>
                    setEditData({ ...editData, speciality: e.target.value })
                  }
                  placeholder="e.g., Small Animal Surgery"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="#3a2f2f">Qualifications</FormLabel>
                <Input
                  value={editData.qualifications}
                  onChange={(e) =>
                    setEditData({ ...editData, qualifications: e.target.value })
                  }
                  placeholder="e.g., DVM, Board Certified"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="#3a2f2f">Years of Experience</FormLabel>
                <Input
                  type="number"
                  value={editData.experienceYears}
                  onChange={(e) =>
                    setEditData({ ...editData, experienceYears: Number(e.target.value) })
                  }
                  min="0"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="#3a2f2f">Phone Number</FormLabel>
                <Input
                  value={editData.phoneNumber}
                  onChange={(e) =>
                    setEditData({ ...editData, phoneNumber: e.target.value })
                  }
                  placeholder="+1 234 567 8900"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="#3a2f2f">Profile Picture URL</FormLabel>
                <Input
                  value={editData.profilePicture}
                  onChange={(e) =>
                    setEditData({ ...editData, profilePicture: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="#3a2f2f">Bio / Description</FormLabel>
                <Textarea
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData({ ...editData, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                  rows={5}
                />
              </FormControl>
            </VStack>

            <HStack spacing={3} mt={6} justify="flex-end">
              <Button variant="ghost" onClick={onEditClose}>
                Cancel
              </Button>
              <Button
                bg="#c09a7f"
                color="white"
                _hover={{ bg: "#a57e63" }}
                onClick={handleUpdateProfile}
              >
                Save Changes
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Profile;