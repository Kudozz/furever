import { useEffect, useState } from "react";
import { Box, Heading, Text, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import background from "../../assets/background.png";
import { useAuth } from "../../context/AuthContext";

const WaitingAppointments = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();
  const vetId = user?._id;

  useEffect(() => {
    if (!vetId) return;

    const fetchWaitingAppointments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/appointments/waiting/${vetId}`);
        setAppointments(res.data || []);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error fetching waiting appointments",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };
    fetchWaitingAppointments();
  }, [vetId, toast]);

  // Approve appointment
  const handleApprove = async (appt) => {
    try {
      await axios.patch(`http://localhost:3000/api/appointments/${appt._id}/decision`, {
        status: "Approved", // consistent with backend
      });

      toast({
        title: "Appointment approved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Remove from waiting list
      setAppointments((prev) => prev.filter((a) => a._id !== appt._id));

      navigate("/vet/pending-appointments");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error approving appointment",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Reject appointment
  const handleReject = async (appt) => {
    try {
      await axios.patch(`http://localhost:3000/api/appointments/${appt._id}/decision`, {
        status: "Rejected",
      });

      toast({
        title: "Appointment rejected",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      setAppointments((prev) => prev.filter((a) => a._id !== appt._id));
    } catch (err) {
      console.error(err);
      toast({
        title: "Error rejecting appointment",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bgImage={`url(${background})`} bgSize="cover" minH="100vh">
      <Sidebar />
      <Box ml="230px" p={6} maxH="100vh" overflowY="auto">
        <Heading mb={6} color="#3a2f2f">Waiting Appointments</Heading>

        {appointments.length === 0 ? (
          <Text color="#555">No waiting appointments</Text>
        ) : (
          <SimpleGrid columns={[1, 2]} spacing={6}>
            {appointments.map((appt) => (
              <Box
                key={appt._id}
                bg="rgba(255,255,255,0.9)"
                borderRadius="18px"
                p={6}
                boxShadow="lg"
              >
                <Heading fontSize="lg" mb={2} color="#3a2f2f">{appt.petName}</Heading>
                <Text color="#555">Breed: {appt.breed}</Text>
                <Text color="#555">Age: {appt.age}</Text>
                <Text mt={2} color="#555">
                  Timeslot: {new Date(appt.timeslot).toLocaleString()}
                </Text>
                <Text mt={2} mb={4} color="#555">Reason: {appt.reason}</Text>

                <Button
                  mr={2}
                  bg="#917659ff"
                  color="white"
                  _hover={{ bg: "#3f3320ff" }}
                  onClick={() => handleApprove(appt)}
                >
                  Approve
                </Button>

                <Button
                  bg="#917659ff"
                  color="white"
                  _hover={{ bg: "#3f3320ff" }}
                  onClick={() => handleReject(appt)}
                >
                  Reject
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default WaitingAppointments;
