import { Box, SimpleGrid, Heading, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/vet/VetSidebar"; 
import bgImage from "../../assets/background.png"; 
import VetNotificationBell from "./components/VetNotificationBell";


const Appointments = () => {
  const navigate = useNavigate();

  return (
    <Box bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
      <Sidebar /> 
      <Box ml="230px" p={6}>
        <Heading color="#3a2f2f" mb={6}>Appointments</Heading>

        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <Box
            bg="rgba(255,255,255,0.9)"
            borderRadius="18px"
            p={6}
            boxShadow="lg"
          >
            <Heading fontSize="xl" mb={2} color="#3a2f2f">Pending Appointments</Heading>
            <Text mb={4} color="#555">Pending appointments</Text>
            <Button
              bg="#c09a7f"
              color="white"
              _hover={{ bg: "#977053ff" }}
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
            <Text mb={4} color="#555">Past appointments</Text>
            <Button
              bg="#c09a7f"
              color="white"
              _hover={{ bg: "#977053ff" }}
              onClick={() => navigate("/appointments/past")}
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
            <Heading fontSize="xl" mb={2} color="#3a2f2f">Waiting Appointments</Heading>
            <Text mb={4} color="#555">Waiting appointments</Text>
            <Button
              bg="#c09a7f"
              color="white"
              _hover={{ bg: "#977053ff" }}
              onClick={() => navigate("/appointments/waiting")}
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
