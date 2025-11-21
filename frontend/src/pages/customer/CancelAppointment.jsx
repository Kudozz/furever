import React, { useEffect, useState } from "react";
import {
  Container,
  VStack,
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const CancelAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const toast = useToast();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  const loadAppointments = async () => {
    try {
      const res = await axios.get(`/api/appointments/${userId}`);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        status: "error",
        isClosable: true,
      });
    }
  };

  const cancel = async (id) => {
    try {
      await axios.put(`/api/appointments/cancel/${id}`);
      toast({
        title: "Success",
        description: "Appointment canceled!",
        status: "success",
        isClosable: true,
      });
      loadAppointments();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <Container maxW={"container.sm"} mt={10}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={9}
          color={"white"}
        >
          Cancel Appointments
        </Heading>

        {appointments.filter((a) => a.status !== "canceled").length === 0 ? (
          <Text color="white">No active appointments found.</Text>
        ) : (
          <VStack spacing={4} w="full">
            {appointments
              .filter((a) => a.status !== "canceled")
              .map((a) => (
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
                    <Text fontWeight="bold">{a.petName}</Text>
                    <Text>Date: {a.date}</Text>
                    <Text>Time: {a.time}</Text>
                    {a.reason && <Text>Reason: {a.reason}</Text>}
                  </Box>
                  <Button
                    size="sm"
                    bg="#b89f7e"
                    color="white"
                    onClick={() => cancel(a._id)}
                  >
                    Cancel
                  </Button>
                </Box>
              ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default CancelAppointment;
