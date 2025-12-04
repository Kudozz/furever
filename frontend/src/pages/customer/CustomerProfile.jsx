import {
  Box,
  Heading,
  Text,
  Avatar,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import CustomerNotificationBell from "../../components/CustomerNotificationBell";

const CustomerProfile = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
    address: savedUser?.address || "",
    profilePic: savedUser?.profilePic || "",
  });

  // Handle form updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    `/api/customers/update-profile/${savedUser._id}`,
    localStorage.setItem("user", JSON.stringify({ ...savedUser, ...formData }));
    setEditMode(false);
  };

  return (
    <Box
      mt="70px"
      ml="230px"
      p={8}
      minH="100vh"
      bgImage="url('/bg.png')"
      bgSize="cover"
      bgPosition="center"
      color="#3a2f2f"
      position="relative"
    >
      {/* Notification Bell (Left of Profile Pic) */}
      <Box position="absolute" top="20px" right="120px">
        <CustomerNotificationBell customerId={savedUser?._id} />
      </Box>

      {/*  Profile Picture */}
      <Box position="absolute" top="10px" right="20px">
        <Avatar
          size="xl"
          name={formData.name}
          src={formData.profilePic}
          border="3px solid white"
          boxShadow="lg"
        />
      </Box>

      <Heading fontSize="3xl" mb={6} color="#3a2f2f">
        My Profile
      </Heading>

      <Box
        bg="rgba(255,255,255,0.9)"
        p={6}
        borderRadius="18px"
        boxShadow="lg"
        w="60%"
      >
        {!editMode ? (
          <>
            <Text fontSize="lg" mb={2}>
              <strong>Name:</strong> {formData.name}
            </Text>

            <Text fontSize="lg" mb={2}>
              <strong>Email:</strong> {formData.email}
            </Text>

            <Text fontSize="lg" mb={2}>
              <strong>Phone:</strong> {formData.phone || "Not set"}
            </Text>

            <Text fontSize="lg" mb={2}>
              <strong>Address:</strong> {formData.address || "Not set"}
            </Text>

            <Button
              mt={4}
              bg="#b89f7e"
              color="white"
              _hover={{ bg: "#a08968" }}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          </>
        ) : (
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Profile Picture URL</FormLabel>
              <Input
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                bg="white"
              />
            </FormControl>

            <Box display="flex" gap={4} mt={4}>
              <Button
                bg="#b89f7e"
                color="white"
                _hover={{ bg: "#a08968" }}
                onClick={handleSave}
              >
                Save
              </Button>

              <Button onClick={() => setEditMode(false)}>Cancel</Button>
            </Box>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default CustomerProfile;
