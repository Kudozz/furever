import { useState } from "react";
import {
  Container, VStack, Box, Heading,
  Input, Textarea, Button, useToast, FormControl, FormLabel
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../../assets/background.png";

const BookAppointment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [form, setForm] = useState({
    petName: "",
    reason: "",
    medicalText: "",
    medicalFile: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "medicalFile") {
      setForm({ ...form, medicalFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("user", userId);
      data.append("vet", state.vetId);
      data.append("date", state.timeslot.split("T")[0]);
      data.append("time", state.timeslot.split("T")[1]);
      data.append("petName", form.petName);
      data.append("reason", form.reason);
      if (form.medicalText) data.append("medicalText", form.medicalText);
      if (form.medicalFile) data.append("medicalFile", form.medicalFile);

      await axios.post("/api/appointments", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Success",
        description: "Appointment booked!",
        status: "success",
        isClosable: true,
      });

      navigate("/appointments/upcoming");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to book appointment",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={6}
      bgImage={`url(${bgImage})`}
      bgSize="cover"
      minH="100vh"
    >
      <Container maxW={"container.sm"} mt={10}>
        <VStack spacing={8}>
          <Heading size={"2xl"} textAlign="center" mb={9} color="white">
            Book Appointment
          </Heading>

          <Box
            w={"full"}
            bg="white"
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Pet Name</FormLabel>
                <Input
                  name="petName"
                  value={form.petName}
                  onChange={handleChange}
                  placeholder="Enter your pet's name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Reason</FormLabel>
                <Textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Reason for appointment"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Medical History (Text, optional)</FormLabel>
                <Textarea
                  name="medicalText"
                  value={form.medicalText}
                  onChange={handleChange}
                  placeholder="Enter medical history if any"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Medical History (File, optional)</FormLabel>
                <Input
                  type="file"
                  name="medicalFile"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.png"
                />
              </FormControl>

              <Button bg="#b89f7e" w="full" onClick={handleSubmit}>
                Submit ♡
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default BookAppointment;
