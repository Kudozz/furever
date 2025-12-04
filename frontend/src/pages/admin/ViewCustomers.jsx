// pages/admin/ViewCustomersPage.jsx
import { Container, VStack, Text, Input, Select, HStack, Button, Collapse, Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import bgImage from "../../assets/background.png";
import axios from "axios";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";


const ViewCustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("none");
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await axios.get("/api/admin/customers");
                setCustomers(res.data);
            } catch (err) {
                console.error("Error fetching customers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const filteredAndSortedCustomers = useMemo(() => {
        let result = [...customers];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(cust => {
                const name = cust.name?.toLowerCase() || "";
                const email = cust.email?.toLowerCase() || "";
                const phone = cust.phone?.toLowerCase() || "";
                const address = cust.address?.toLowerCase() || "";

                return name.includes(query) || email.includes(query) || phone.includes(query) || address.includes(query);
            });
        }

        switch (sortBy) {
            case "name-asc":
                result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
                break;
            case "name-desc":
                result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
                break;
            case "email-asc":
                result.sort((a, b) => (a.email || "").localeCompare(b.email || ""));
                break;
            case "email-desc":
                result.sort((a, b) => (b.email || "").localeCompare(a.email || ""));
                break;
            default:
                break;
        }

        return result;
    }, [customers, searchQuery, sortBy]);

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
                    Customers
                </Text>

                <VStack spacing={10}>
                    {/* Collapsible Filter Section */}
                    <Box w="full" mb={5}>
                        <Button
                            color="rgba(255,255,255,0.9)"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            rightIcon={isFilterOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            mb={6}
                            w="full"
                        >
                            {isFilterOpen ? "Hide" : "Show"} Search & Sort
                        </Button>

                        <Collapse in={isFilterOpen} animateOpacity>
                            <VStack spacing={4} p={4} bg="gray.50" borderRadius="md" my={4}>
                                <HStack w="full" spacing={4}>
                                    <Input
                                        placeholder="Search by name, email, phone, or address..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        bg="white"
                                    />
                                    <Select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        bg="white"
                                        minW="250px"
                                    >
                                        <option value="none">No sorting</option>
                                        <option value="name-asc">Name (A-Z)</option>
                                        <option value="name-desc">Name (Z-A)</option>
                                        <option value="email-asc">Email (A-Z)</option>
                                        <option value="email-desc">Email (Z-A)</option>
                                    </Select>
                                </HStack>
                            </VStack>
                        </Collapse>
                    </Box>

                    {/* Grid for customer cards */}
                    <SimpleGrid columns={1} spacing={6} w="full">
                        {loading ? (
                            <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                                Loading customers...
                            </Text>
                        ) : filteredAndSortedCustomers.length > 0 ? (
                            filteredAndSortedCustomers.map((cust) => (
                                <Box
                                    key={cust._id}
                                    p={5}
                                    bg="white"
                                    borderRadius="md"
                                    shadow="md"
                                    _hover={{ shadow: "lg" }}
                                >
                                    <Text fontWeight="bold" fontSize="xl">{cust.name}</Text>
                                    <Text>Email: {cust.email}</Text>
                                    <Text>Phone: {cust.phone || "-"}</Text>
                                    <Text>Address: {cust.address || "-"}</Text>
                                </Box>
                            ))
                        ) : (
                            <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                                No customers match your search criteria.
                            </Text>
                        )}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
};

export default ViewCustomersPage;
