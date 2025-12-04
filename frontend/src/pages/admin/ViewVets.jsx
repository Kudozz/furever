import { Container, VStack, Text, Input, Select, HStack, Button, Collapse, Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import bgImage from "../../assets/background.png";
import { Link } from "react-router-dom";
import { useVetInventory } from "../../../store/vet.js"
import VetCard from "../../components/VetCard";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const VetsPage = () => {
    const { fetchVets, vets } = useVetInventory();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("none");
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    useEffect(() => {
        fetchVets();
    }, [fetchVets]);

    // Filter and sort vets
    const filteredAndSortedVets = useMemo(() => {
        let result = [...vets];

        // Search filtering (case-insensitive, across name, speciality, and bio)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(vet => {
                const userName = vet.user?.name?.toLowerCase() || "";
                const email = vet.user?.email?.toLowerCase() || "";
                const speciality = vet.speciality?.toLowerCase() || "";
                const bio = vet.bio?.toLowerCase() || "";

                return userName.includes(query) ||
                    email.includes(query) ||
                    speciality.includes(query) ||
                    bio.includes(query);
            });
        }

        // Sorting
        switch (sortBy) {
            case "name-asc":
                result.sort((a, b) => (a.user?.name || "").localeCompare(b.user?.name || ""));
                break;
            case "name-desc":
                result.sort((a, b) => (b.user?.name || "").localeCompare(a.user?.name || ""));
                break;
            case "speciality-asc":
                result.sort((a, b) => (a.speciality || "").localeCompare(b.speciality || ""));
                break;
            case "speciality-desc":
                result.sort((a, b) => (b.speciality || "").localeCompare(a.speciality || ""));
                break;
            case "experience-asc":
                result.sort((a, b) => (a.experienceYears || 0) - (b.experienceYears || 0));
                break;
            case "experience-desc":
                result.sort((a, b) => (b.experienceYears || 0) - (a.experienceYears || 0));
                break;
            default:
                // No sorting
                break;
        }

        return result;
    }, [vets, searchQuery, sortBy]);

    return (
        <Box
            bgImage={`url(${bgImage})`}
            bgSize="cover"
            bgPosition="center"
            minH="100vh"
            color="#3a2f2f"
        >

            <Container maxW='container.xl' py={3}>
                <Text
                    fontSize={"60"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, #b89f7e, #a57d49ff)"}
                    bgClip={"text"}
                    textAlign={"center"}
                    mb={10}
                >
                    Veterinarians
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
                                        placeholder="Search by name, email, speciality, or bio..."
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
                                        <option value="speciality-asc">Speciality (A-Z)</option>
                                        <option value="speciality-desc">Speciality (Z-A)</option>
                                        <option value="experience-asc">Experience (Least)</option>
                                        <option value="experience-desc">Experience (Most)</option>
                                    </Select>
                                </HStack>
                            </VStack>
                        </Collapse>
                    </Box>

                    {/* Single column grid for wide cards */}
                    <SimpleGrid
                        columns={1}
                        spacing={6}
                        w={"full"}
                    >
                        {filteredAndSortedVets.map((vet) => (
                            <VetCard key={vet._id} vet={vet} />
                        ))}
                    </SimpleGrid>

                    {filteredAndSortedVets.length === 0 && vets.length > 0 && (
                        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                            No veterinarians match your search criteria.
                        </Text>
                    )}

                    {vets.length === 0 && (
                        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                            No veterinarians found!{" "}
                            <Link to={"/create-vet"}>
                                <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                    Add a veterinarian
                                </Text>
                            </Link>
                        </Text>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default VetsPage;