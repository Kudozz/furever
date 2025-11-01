import { VStack, Box, Text, Link as ChakraLink, HStack, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", to: "/" },
    { label: "Adopt", to: "/adopt" },
    { label: "Rehome", to: "/rehome" },
    { label: "Book appointment", to: "/book-appt" },
    { label: "Profile", to: "/profile" },
  ];

  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      w="230px"
      h="100vh"
      bg="rgba(255, 255, 246, 0.1)"
      color="white"
      px={6}
      py={10}
      backdropFilter="blur(5px)"
      zIndex="10"
    >
      <HStack align={"normal"} spacing={2}>
        <Image src="/logo.png" height={"50px"}></Image>
      <Text fontSize="2xl" fontWeight="600" textAlign="center" mb={10}>
        Furever
      </Text>
      </HStack>

      <VStack align="stretch" spacing={2}>
        {links.map((link) => (
          <ChakraLink
            key={link.to}
            as={Link}
            to={link.to}
            px={6}
            py={3}
            borderRadius="md"
            bg={location.pathname === link.to ? "rgba(255,255,255,0.2)" : "transparent"}
            fontWeight={location.pathname === link.to ? "bold" : "normal"}
            _hover={{
              bg: "rgba(255,255,255,0.2)",
              color: "#625050",
            }}
          >
            {link.label}
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
