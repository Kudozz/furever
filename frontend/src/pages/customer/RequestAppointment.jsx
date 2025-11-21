import { useState } from "react";
import {
  Container,
  VStack,
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";

const RequestAppointment = () => {
  const [form, setForm] = useState({
    petName: "",
    date: "",
    time: "",
    reason: "",
    medicalHistory: null, // optional file
  });

  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "medicalHistory") {
      setForm({ ...form, medicalHistory: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("user", userId);
      data.append("petName", form.petName);
      data.append("date", form.date);
      data.append("time", form.time);
      data.append("reason", form.reason);
      if (form.medicalHistory) {
        data.append("medicalHistory", form.medicalHistory);
      }

   

      // RequestAppointment.jsx
      await axios.post(`${import.meta.env.VITE_API_URL}/api/appointments`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast({
        title: "Success",
        description: "Appointment booked!",
        status: "success",
        isClosable: true,
      });

      setForm({
        petName: "",
        date: "",
        time: "",
        reason: "",
        medicalHistory: null,
      });
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
    <Container maxW={"container.sm"} mt={10}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={9}
          color={"white"}
        >
          Book Appointment
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
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

            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" value={form.date} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                step={600} // 10 minutes
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
              <FormLabel>Medical History (Optional)</FormLabel>
              <Input
                type="file"
                name="medicalHistory"
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
  );
};

export default RequestAppointment;
