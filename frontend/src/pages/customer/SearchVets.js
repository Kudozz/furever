// src/pages/user/SearchVets.js
import { useState } from "react";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const SearchVets = () => {
  const [timeslot, setTimeslot] = useState("");
  const [availableVets, setAvailableVets] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await API.post("/appointments/available", { timeslot });
      setAvailableVets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={6} bg="#fdfaf6" minH="100vh">
      <VStack spacing={4} align="stretch">
        <Input
          type="datetime-local"
          value={timeslot}
          onChange={(e) => setTimeslot(e.target.value)}
          borderRadius="8px"
          borderColor="#ccc"
          _focus={{ borderColor: "#c09a7f" }}
        />
        <Button bg="#c09a7f" color="white" _hover={{ bg: "#a57e63" }} onClick={handleSearch}>
          Search Available Vets
        </Button>

        {availableVets.map((vet) => (
          <Box
            key={vet._id}
            p={4}
            bg="white"
            borderRadius="15px"
            boxShadow="md"
            _hover={{ transform: "translateY(-4px)", transition: "0.2s" }}
          >
            <Text fontWeight="600" color="#3a2f2f">{vet.user.name || "Vet Name"}</Text>
            <Text color="#555">Specialty: {vet.speciality}</Text>
            <Button
              mt={2}
              bg="#c09a7f"
              color="white"
              _hover={{ bg: "#a57e63" }}
              onClick={() =>
                navigate("/appointments/book", { state: { vetId: vet._id, timeslot } })
              }
            >
              Book Appointment
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SearchVets;
