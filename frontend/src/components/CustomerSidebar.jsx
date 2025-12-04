import { VStack, Box, Text, Link as ChakraLink, HStack, Image, Icon } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaPaw, FaCalendarAlt, FaUser, FaHeart } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { label: "Dashboard", to: "/", icon: FaHome },
    { label: "Adopt", to: "/adopt", icon: FaPaw },
    { label: "My Adopted Pets", to: "/adopted-pets", icon: FaHeart },
    { label: "Rehome", to: "/rehome", icon: FaPaw },
    { label: "Book Appointment", to: "/book-appt", icon: FaCalendarAlt },
    { label: "Profile", to: "/profile", icon: FaUser },
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
      {/* Logo and Title */}
      <VStack spacing={3} mb={10}>
        <Image src="/logo.png" height="50px" />
        <Text fontSize="2xl" fontWeight="600" textAlign="center">
          FurEver
        </Text>
      </VStack>

      {/* Navigation Links */}
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
            display="flex"
            alignItems="center"
          >
            <Icon as={link.icon} mr={3} boxSize={5} />
            {link.label}
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
