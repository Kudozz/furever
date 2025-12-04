
import { Box, Text, Button } from "@chakra-ui/react";

const CardItem = ({ title, description, buttonText, onClick }) => {
  return (
    <Box
      bg="white"
      borderRadius="15px"
      p={5}
      boxShadow="md"
      _hover={{ transform: "translateY(-4px)", transition: "0.2s" }}
    >
      <Text fontSize="lg" fontWeight="600" mb={2} color="#3a2f2f">
        {title}
      </Text>
      <Text fontSize="sm" color="#555" mb={4}>
        {description}
      </Text>
      <Button bg="#c09a7f" color="white" _hover={{ bg: "#a57e63" }} onClick={onClick}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default CardItem;