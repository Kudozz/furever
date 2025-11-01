import { Box, Text } from "@chakra-ui/react";
import Sidebar from "../../components/vet/VetSidebar";
import Header from "../../components/Header";

function Prescriptions() {
  return (
    <Box bgImage="url('/background.jpg')" bgSize="cover" minH="100vh">
      <Sidebar />
      <Box ml={{ base: 0, md: "230px" }} p={6}>
        <Header title="Prescriptions" />
        <Box bg="white" p={6} borderRadius="18px" boxShadow="md">
          <Text>List of patients will appear here...</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Prescriptions; 
