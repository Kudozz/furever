import React, { useEffect, useState } from "react";
import { Box, VStack, Text, Badge, Heading, Spinner, Center, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import bgImage from "../../assets/background.png";

const statusColors = {
  scheduled: "orange",
  pending: "orange",
  approved: "green",
  rejected: "red",
  canceled: "gray",
};

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?._id;
       const cardBg = useColorModeValue("white", "gray.800");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/appointments/user/${userId}`);
      setAppointments(res.data);
    } catch (error) {
      console.error("API ERROR:", error.response?.data || error.message);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <Center mt={20}><Spinner size="xl" /></Center>;

  // Filter to show only upcoming appointments (Pending and Approved, not Canceled or Done)
  const upcomingAppointments = appointments.filter(
    (appt) => appt.status === "Pending" || appt.status === "Approved"
  );

  if (upcomingAppointments.length === 0) {
    return (
      <Box p={6} bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
        <Center mt={20}>
          <Text color="white" fontSize="xl">No upcoming appointments found 😿</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box p={6} bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
      <VStack spacing={6} mt={10} maxW="800px" mx="auto">
        <Heading size="2xl" textAlign="center" mb={6} color="white">My Appointments</Heading>


        {upcomingAppointments.map((appt) => {
          const dateObj = new Date(appt.timeslot);
          const dateStr = dateObj.toISOString().split("T")[0];
          const timeStr = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

          return (
            <Box
              key={appt._id}
              w="full"
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
            bg={cardBg}
            >
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" fontSize="lg" color="#3a2f2f">{appt.petName}</Text>
                <Text color="#555"><strong>Date:</strong> {dateStr}</Text>
                <Text color="#555"><strong>Time:</strong> {timeStr}</Text>
                {appt.reason && <Text color="#555"><strong>Reason:</strong> {appt.reason}</Text>}
                {appt.medicalHistory && (
                  <Text color="#555"><strong>Medical History:</strong> {appt.medicalHistory}</Text>
                )}
                <Badge colorScheme={statusColors[appt.status.toLowerCase()] || "gray"}>
                  {appt.status}
                </Badge>
                {appt.status === "Pending" && (
                  <Text fontSize="sm" color="orange.500" fontStyle="italic">
                    Waiting for vet approval
                  </Text>
                )}
                {appt.status === "Approved" && (
                  <Text fontSize="sm" color="green.500" fontStyle="italic">
                    Confirmed - See you soon!
                  </Text>
                )}
              </VStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default UpcomingAppointments;
