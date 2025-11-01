import { Flex, Text, HStack, IconButton, Avatar, Box } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

const Header = ({ title }) => {
  return (
    <Flex justify="space-between" align="center" mb={6}>
      {/*page title */}
      <Text fontSize="2xl" fontWeight="bold" color="white">
        {title}
      </Text>

      {/*icons and profile */}
      <HStack spacing={4}>
        {/*notif. bell */}
        <IconButton
          icon={<BellIcon />}
          aria-label="Notifications"
          bg="whiteAlpha.200"
          color="white"
          _hover={{ bg: "whiteAlpha.300" }} 
        />


        <Box>
          <Avatar
            size="sm"
            name="Dr. HAHAHAH"
            src="profile.jpg" 
            cursor="pointer"
            border="2px solid white"
          />
        </Box>
      </HStack>
    </Flex>
  );
};

export default Header;