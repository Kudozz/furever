import { Container, VStack, Text, Box, SimpleGrid, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import bgImage from "../../assets/background.png";
import axios from "axios";

const BanCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/api/admin/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const toggleBan = async (id) => {
    try {
      await axios.patch(`/api/admin/customers/${id}/ban`);
      setCustomers((prev) =>
        prev.map((cust) =>
          cust._id === id ? { ...cust, banned: !cust.banned } : cust
        )
      );
    } catch (err) {
      console.error("Error banning customer:", err);
    }
  };

  return (
    <Box
      bgImage={`url(${bgImage})`}
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      color="#3a2f2f"
    >
      <Container maxW="container.xl" py={3}>
        <Text
          fontSize={"60"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, #b89f7e, #a57d49ff)"}
          bgClip={"text"}
          textAlign={"center"}
          mb={10}
        >
          Ban Customers
        </Text>

        <VStack spacing={10}>
          <SimpleGrid columns={1} spacing={6} w="full">
            {loading ? (
              <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                Loading customers...
              </Text>
            ) : customers.length > 0 ? (
              customers.map((cust) => (
                <Box
                  key={cust._id}
                  p={5}
                  bg={cust.banned ? "red.50" : "white"}
                  borderRadius="md"
                  shadow="md"
                  _hover={{ shadow: "lg" }}
                >
                  <Text fontWeight="bold" fontSize="xl">{cust.name}</Text>
                  <Text>Email: {cust.email}</Text>
                  <Text>Phone: {cust.phone || "-"}</Text>
                  <Text>Address: {cust.address || "-"}</Text>

                  <Button
                    mt={3}
                    colorScheme={cust.banned ? "green" : "red"}
                    onClick={() => toggleBan(cust._id)}
                  >
                    {cust.banned ? "Unban Customer" : "Ban Customer"}
                  </Button>
                </Box>
              ))
            ) : (
              <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                No customers found.
              </Text>
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default BanCustomersPage;
