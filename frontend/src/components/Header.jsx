// import { Flex, Text, HStack, IconButton, Avatar, Box } from "@chakra-ui/react";
// import { BellIcon } from "@chakra-ui/icons";

// const Header = ({ title }) => {
//   return (
//     <Flex justify="space-between" align="center" mb={6}>
//       {/*page title */}
//       <Text fontSize="2xl" fontWeight="bold" color="white">
//         {title}
//       </Text>

//       {/*icons and profile */}
//       <HStack spacing={4}>
//         {/*notif. bell */}
//         <IconButton
//           icon={<BellIcon />}
//           aria-label="Notifications"
//           bg="whiteAlpha.200"
//           color="white"
//           _hover={{ bg: "whiteAlpha.300" }} 
//         />


//         <Box>
//           <Avatar
//             size="sm"
//             name="Dr. HAHAHAH"
//             src="profile.jpg" 
//             cursor="pointer"
//             border="2px solid white"
//           />
//         </Box>
//       </HStack>
//     </Flex>
//   );
// };

// export default Header;

// Header.jsx
import React from "react";
import { Flex, Text, HStack, Avatar, Box } from "@chakra-ui/react";
import VetNotificationBell from "./VetNotificationBell"; // import the bell component

const Header = ({ title }) => {
  // Get logged-in user from localStorage
  const savedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <Flex
      justify="space-between"
      align="center"
      mb={6}
      px={6}
      py={4}
      bg="teal.500"
      borderRadius="md"
    >
      {/* Page title */}
      <Text fontSize="2xl" fontWeight="bold" color="white">
        {title}
      </Text>

      {/* Icons and profile */}
      <HStack spacing={4}>
        {/* Vet Notification Bell */}
        {savedUser?.role === "vet" && <VetNotificationBell />}

        {/* Vet Profile Avatar */}
        <Box>
          <Avatar
            size="sm"
            name={savedUser?.name || "Vet"}
            src={savedUser?.profilePic || ""}
            cursor="pointer"
            border="2px solid white"
          />
        </Box>
      </HStack>
    </Flex>
  );
};

export default Header;
