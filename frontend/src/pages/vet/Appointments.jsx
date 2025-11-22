// src/pages/vet/Appointments.jsx
import { Box, SimpleGrid, Heading, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar"; // your sidebar component

const Appointments = () => {
  const navigate = useNavigate();

  return (
    <Box bg="url('/background.png')" bgSize="cover" minH="100vh">
      <Sidebar />

      <Box ml="230px" p={6}>
        <Heading color="#3a2f2f" mb={6}>Appointments</Heading>

        <SimpleGrid columns={[1, 2]} spacing={6}>
          <Box
            bg="rgba(255,255,255,0.9)"
            borderRadius="18px"
            p={6}
            boxShadow="lg"
          >
            <Heading fontSize="xl" mb={2} color="#3a2f2f">Upcoming / Pending</Heading>
            <Text mb={4} color="#555">View or manage upcoming appointments</Text>
            <Button
              bg="#c09a7f"
              color="white"
              _hover={{ bg: "#a57e63" }}
              onClick={() => navigate("/appointments/pending")}
            >
              View
            </Button>
          </Box>

          <Box
            bg="rgba(255,255,255,0.9)"
            borderRadius="18px"
            p={6}
            boxShadow="lg"
          >
            <Heading fontSize="xl" mb={2} color="#3a2f2f">Past Appointments</Heading>
            <Text mb={4} color="#555">View completed appointments and pet notes</Text>
            <Button
              bg="#c09a7f"
              color="white"
              _hover={{ bg: "#a57e63" }}
              onClick={() => navigate("/appointments/past")}
            >
              View
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Appointments;
