import { useState } from "react";
import {
  Container,
  VStack,
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import axios from "axios";
import bgImage from "../../assets/background.png";

const RequestAppointment = () => {
  const [form, setForm] = useState({
    petName: "",
    date: "",
    time: "",
    reason: "",
    medicalText: "",
    medicalFile: null
  });

  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

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
      data.append("petName", form.petName);
      data.append("date", form.date);
      data.append("time", form.time);
      data.append("reason", form.reason);
      if (form.medicalText) data.append("medicalText", form.medicalText);
      if (form.medicalFile) data.append("medicalFile", form.medicalFile);

      await axios.post("/api/appointments", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast({
        title: "Success",
        description: "Appointment requested!",
        status: "success",
        isClosable: true
      });

      setForm({
        petName: "",
        date: "",
        time: "",
        reason: "",
        medicalText: "",
        medicalFile: null
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to request appointment",
        status: "error",
        isClosable: true
      });
    }
  };

  return (
    <Box p={6} bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
      <Container maxW={"container.sm"} mt={10}>
        <VStack spacing={8}>
          <Heading size={"2xl"} textAlign="center" mb={9} color="white">
            Request Appointment
          </Heading>

          <Box w={"full"} bg="white" p={6} rounded={"lg"} shadow={"md"}>
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
                <Input type="time" name="time" value={form.time} onChange={handleChange} step={600} />
              </FormControl>

              <FormControl>
                <FormLabel>Reason</FormLabel>
                <Textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Reason for appointment" />
              </FormControl>

              <FormControl>
                <FormLabel>Medical History (Text, optional)</FormLabel>
                <Textarea name="medicalText" value={form.medicalText} onChange={handleChange} placeholder="Enter medical history if any" />
              </FormControl>

              <FormControl>
                <FormLabel>Medical History (File, optional)</FormLabel>
                <Input type="file" name="medicalFile" onChange={handleChange} accept=".pdf,.jpg,.png" />
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

export default RequestAppointment;
