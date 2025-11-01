import { VStack, Box, Text, Link as ChakraLink, Icon } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaPaw, FaUser, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ scrollToSection, refs }) => {
    const location = useLocation();

    const links = [
        { label: "Dashboard", to: "/", icon: FaHome, isRoute: true },
        { label: "Appointments", icon: FaCalendarAlt, ref: refs?.appointmentsRef },
        { label: "Pet Profiles", icon: FaPaw, ref: refs?.petProfilesRef },
        { label: "Vet Profile", icon: FaUser, ref: refs?.vetProfileRef },
        { label: "Logout", icon: FaSignOutAlt, ref: refs?.logoutRef },
    ];

    const handleClick = (link, e) => {
        e.preventDefault();

        if (link.isRoute) {
            return;
        }

        if (link.ref && scrollToSection) {
            scrollToSection(link.ref);
        }
    };

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
            <Text fontSize="2xl" fontWeight="600" textAlign="center" mb={10}>
                Furever Vet
            </Text>

            <VStack align="stretch" spacing={2}>
                {links.map((link, index) => (
                    link.isRoute ? (
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
                    ) : (
                        <Box
                            key={index}
                            px={6}
                            py={3}
                            borderRadius="md"
                            bg="transparent"
                            _hover={{
                                bg: "rgba(255,255,255,0.2)",
                                color: "#625050",
                            }}
                            display="flex"
                            alignItems="center"
                            onClick={(e) => handleClick(link, e)}
                            cursor="pointer"
                        >
                            <Icon as={link.icon} mr={3} boxSize={5} />
                            {link.label}
                        </Box>
                    )
                ))}
            </VStack>
        </Box>
    );
};

export default Sidebar;