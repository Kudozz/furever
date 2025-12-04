import {
    Box,
    Container,
    VStack,
    Text,
    Input,
    Button,
    useToast,
    Divider,
    SimpleGrid
} from "@chakra-ui/react";
import bgImage from "../../assets/background.png";
import { useState } from "react";
import { useVetInventory } from "../../../store/vet";

const AdminRemoveVet = () => {
    const [vetName, setVetName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedVet, setSelectedVet] = useState(null);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { searchVetsByName, deactivateVet } = useVetInventory();

    const handleSearch = async () => {
        if (!vetName.trim()) {
            toast({
                title: "Enter Vet Name",
                status: "warning",
                duration: 2000
            });
            return;
        }

        setLoading(true);
        setSelectedVet(null);
        setSearchResults([]);

        try {
            const result = await searchVetsByName(vetName);

            if (!result.success) {
                throw new Error(result.message);
            }

            setSearchResults(result.data);

            toast({
                title: `Found ${result.data.length} vet(s)`,
                status: "success",
                duration: 2000
            });
        } catch (err) {
            setSearchResults([]);
            toast({
                title: "No vets found",
                description: err.message || "No vets found with that name",
                status: "error",
                duration: 2000
            });
        }

        setLoading(false);
    };

    const handleSelectVet = (vet) => {
        setSelectedVet(vet);
    };

    const handleDeactivate = async () => {
        if (!selectedVet) return;

        setLoading(true);

        try {
            const result = await deactivateVet(selectedVet._id);

            if (!result.success) {
                throw new Error(result.message);
            }

            toast({
                title: "Vet Deactivated",
                description: "Vet successfully deactivated.",
                status: "success",
                duration: 2500
            });

            setSelectedVet(null);
            setSearchResults([]);
            setVetName("");

        } catch (err) {
            toast({
                title: "Cannot deactivate vet",
                description: err.message || "Vet has pending appointments.",
                status: "error",
                duration: 3000
            });
        }

        setLoading(false);
    };

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
                        Remove Veterinarian 
                    </Text>
                </Container>
            <Container maxW="3xl">
                <VStack spacing={6} bg="white" p={6} shadow="lg" borderRadius="md">
                    <Text fontSize="3xl" fontWeight="bold">
                        Deactivate Vet
                    </Text>

                    {/* Search section */}
                    <Input
                        placeholder="Enter Vet Name"
                        value={vetName}
                        onChange={(e) => setVetName(e.target.value)}
                        bg="white"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />

                    <Button
                        onClick={handleSearch}
                        isLoading={loading}
                        w="full"
                        bgColor="#b89f7e"
                    >
                        Search Vet
                    </Button>

                    <Divider />

                    {/* Search Results */}
                    {searchResults.length > 0 && !selectedVet && (
                        <Box w="full">
                            <Text fontSize="lg" fontWeight="semibold" mb={3}>
                                Search Results ({searchResults.length})
                            </Text>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                                {searchResults.map((vet) => (
                                    <Box
                                        key={vet._id}
                                        p={4}
                                        border="1px solid #ddd"
                                        borderRadius="md"
                                        cursor="pointer"
                                        _hover={{ bg: "gray.50", borderColor: "blue.400" }}
                                        onClick={() => handleSelectVet(vet)}
                                    >
                                        <Text><b>Name:</b> {vet.user?.name}</Text>
                                        <Text><b>Email:</b> {vet.user?.email}</Text>
                                        <Text><b>Speciality:</b> {vet.speciality}</Text>
                                        <Text><b>Experience:</b> {vet.experienceYears} years</Text>
                                        <Text mt={2} color={vet.status ? "green.600" : "red.600"} fontWeight="bold">
                                            Status: {vet.status ? "Active" : "Inactive"}
                                        </Text>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}

                    {/* Selected Vet */}
                    {selectedVet && (
                        <Box w="full">
                            <Text fontSize="lg" fontWeight="semibold" mb={3}>
                                Selected Vet
                            </Text>
                            <Box w="full" p={4} border="2px solid" borderColor="blue.400" borderRadius="md" bg="blue.50">
                                <Text><b>Name:</b> {selectedVet.user?.name}</Text>
                                <Text><b>Email:</b> {selectedVet.user?.email}</Text>
                                <Text><b>Speciality:</b> {selectedVet.speciality}</Text>
                                <Text><b>Experience:</b> {selectedVet.experienceYears} years</Text>
                                <Text mt={2} color={selectedVet.status ? "green.600" : "red.600"} fontWeight="bold">
                                    Status: {selectedVet.status ? "Active" : "Inactive"}
                                </Text>

                                <Button
                                    mt={4}
                                    colorScheme="red"
                                    w="full"
                                    onClick={handleDeactivate}
                                    isLoading={loading}
                                    isDisabled={!selectedVet.status}
                                >
                                    {selectedVet.status ? "Deactivate Vet" : "Already Inactive"}
                                </Button>

                                <Button
                                    mt={2}
                                    variant="outline"
                                    w="full"
                                    onClick={() => setSelectedVet(null)}
                                    isDisabled={loading}
                                >
                                    Back to Results
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {searchResults.length === 0 && !selectedVet && (
                        <Text color="gray.500">Search a vet by name to proceed</Text>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default AdminRemoveVet;
