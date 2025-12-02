import React, { useEffect, useState } from "react";
import { Box, VStack, Text, Badge, HStack, Heading, Button, Spinner, Center, Input, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import bgImage from "../../assets/background.png";

const statusColors = {
  scheduled: "orange",
  pending: "orange",
  approved: "green",
  rejected: "red",
  canceled: "gray",
};

const ModifyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?._id;

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/appointments/user/${userId}`);
      setAppointments(res.data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`);
      toast({ title: "Canceled", description: "Appointment canceled", status: "info", isClosable: true });
      fetchAppointments();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to cancel", status: "error", isClosable: true });
    }
  };

  if (loading) return <Center mt={20}><Spinner size="xl" /></Center>;

  const pendingAppointments = appointments.filter((appt) => appt.status === "Pending");

  if (pendingAppointments.length === 0) {
    return (
      <Box p={6} bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
        <Center mt={20}>
          <Text color="white" fontSize="xl">No pending appointments that can be canceled 😿</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box p={6} bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
      <VStack spacing={6} mt={10} maxW="800px" mx="auto">
        <Heading size="2xl" textAlign="center" mb={6} color="white">Cancel Appointments</Heading>
        <Text color="white" textAlign="center" mb={4}>
          You can only cancel appointments that are pending vet approval
        </Text>

        {pendingAppointments.map((appt) => {
          const dateObj = new Date(appt.timeslot);
          const dateStr = dateObj.toISOString().split("T")[0];
          const timeStr = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

          return (
            <Box key={appt._id} w="full" p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
              <HStack justifyContent="space-between" mb={3}>
                <Text fontWeight="bold" fontSize="lg" color="#3a2f2f">{appt.petName}</Text>
                <Badge colorScheme="orange" fontSize="sm">Pending</Badge>
              </HStack>

              <VStack align="start" spacing={2}>
                <Text color="#555"><strong>Date:</strong> {dateStr}</Text>
                <Text color="#555"><strong>Time:</strong> {timeStr}</Text>
                <Text color="#555"><strong>Reason:</strong> {appt.reason || "N/A"}</Text>
                {appt.medicalHistory && (
                  <Text color="#555" fontSize="sm"><strong>Medical History:</strong> {appt.medicalHistory}</Text>
                )}
                <HStack spacing={3} mt={2}>
                  <Button
                    size="sm"
                    bg="#b89f7e"
                    color="white"
                    _hover={{ bg: "#977053ff" }}
                    onClick={() => handleCancel(appt._id)}
                  >
                    Cancel Appointment
                  </Button>
                </HStack>
              </VStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default ModifyAppointments;
