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

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/appointments/${userId}`);
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
  if (appointments.length === 0) return <Center mt={20}><Text color="white">No appointments found 😿</Text></Center>;

  return (
    <Box p={6} bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
      <VStack spacing={6} mt={10} maxW="800px" mx="auto">
        <Heading size="2xl" textAlign="center" mb={6} color="white">My Appointments</Heading>

        {appointments.map((appt) => (
          <Box key={appt._id} w="full" p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={useColorModeValue("white", "gray.800")}>
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" fontSize="lg">{appt.petName}</Text>
              <Text><strong>Date:</strong> {appt.date}</Text>
              <Text><strong>Time:</strong> {appt.time}</Text>
              {appt.reason && <Text><strong>Reason:</strong> {appt.reason}</Text>}
              {appt.medicalText && <Text><strong>Medical Notes:</strong> {appt.medicalText}</Text>}
              {appt.medicalFile && <Text><strong>Medical File:</strong> <a href={appt.medicalFile} target="_blank" rel="noopener noreferrer">View</a></Text>}
              <Badge colorScheme={statusColors[appt.status] || "gray"}>{appt.status}</Badge>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default UpcomingAppointments;
