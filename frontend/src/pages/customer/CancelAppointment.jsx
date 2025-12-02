import React, { useEffect, useState } from "react";
import { Container, VStack, Box, Heading, Text, Button, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import bgImage from "../../assets/background.png";

const CancelAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const toast = useToast();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  const loadAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/user/${userId}`);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        status: "error",
        isClosable: true
      });
    }
  };

  const cancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`);
      toast({
        title: "Success",
        description: "Appointment canceled!",
        status: "success",
        isClosable: true
      });
      loadAppointments();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        status: "error",
        isClosable: true
      });
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <Box p={6} bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
      <Container maxW={"container.sm"} mt={10}>
        <VStack spacing={8}>
          <Heading size={"2xl"} textAlign="center" mb={9} color="white">
            Cancel Appointments
          </Heading>

          {appointments.filter((a) => a.status === "Pending").length === 0 ? (
            <Text color="white">No pending appointments that can be canceled.</Text>
          ) : (
            <VStack spacing={4} w="full">
              {appointments
                .filter((a) => a.status === "Pending")
                .map((a) => {
                  const dateObj = new Date(a.timeslot);
                  const dateStr = dateObj.toISOString().split("T")[0];
                  const timeStr = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                  return (
                    <Box
                      key={a._id}
                      w="full"
                      bg={useColorModeValue("white", "gray.800")}
                      p={4}
                      rounded="lg"
                      shadow="md"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Text fontWeight="bold" color="#3a2f2f">{a.petName}</Text>
                        <Text color="#555">Date: {dateStr}</Text>
                        <Text color="#555">Time: {timeStr}</Text>
                        {a.reason && <Text color="#555">Reason: {a.reason}</Text>}
                        <Text color="orange.500" fontSize="sm" mt={1}>Status: Pending approval</Text>
                      </Box>
                      <Button
                        size="sm"
                        bg="#b89f7e"
                        color="white"
                        _hover={{ bg: "#977053ff" }}
                        onClick={() => cancel(a._id)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  );
                })}
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default CancelAppointment;
