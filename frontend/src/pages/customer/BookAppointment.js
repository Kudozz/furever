// src/pages/user/BookAppointment.js
import { useState } from "react";
import { Box, Input, Textarea, Button, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";

const BookAppointment = () => {
  const { state } = useLocation();
  const [petName, setPetName] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/appointments", {
        user: "USER_ID_HERE", // replace with logged-in user ID
        vet: state.vetId,
        date: state.timeslot.split("T")[0],
        time: state.timeslot.split("T")[1],
        petName,
        reason,
      });
      navigate("/appointments/view");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={6} bg="#fdfaf6" minH="100vh">
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          borderRadius="8px"
          borderColor="#ccc"
          _focus={{ borderColor: "#c09a7f" }}
        />
        <Textarea
          placeholder="Reason for appointment"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          borderRadius="8px"
          borderColor="#ccc"
          _focus={{ borderColor: "#c09a7f" }}
        />
        <Button bg="#c09a7f" color="white" _hover={{ bg: "#a57e63" }} onClick={handleSubmit}>
          Book Appointment
        </Button>
      </VStack>
    </Box>
  );
};

export default BookAppointment;
