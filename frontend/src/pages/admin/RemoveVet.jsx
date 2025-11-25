import {
    Box,
    Container,
    VStack,
    Text,
    Input,
    Button,
    useToast,
    HStack,
    Divider
} from "@chakra-ui/react";
import bgImage from "../../assets/background.png";
import { useState } from "react";
import { useVetInventory } from "../../../store/vet";

const AdminRemoveVet = () => {
    const [vetId, setVetId] = useState("");
    const [vet, setVet] = useState(null);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { checkVetAppointments, deleteVet } = useVetInventory();

    const handleSearch = async () => {
        if (!vetId.trim()) {
            toast({
                title: "Enter Vet ID",
                status: "warning",
                duration: 2000
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/vets/${vetId}`);
            if (!res.ok) throw new Error("Vet not found");

            const data = await res.json();
            setVet(data);

            toast({
                title: "Vet found",
                status: "success",
                duration: 2000
            });
        } catch (err) {
            setVet(null);
            toast({
                title: "Vet not found",
                status: "error",
                duration: 2000
            });
        }

        setLoading(false);
    };

    const handleDeactivate = async () => {
        if (!vet) return;

        setLoading(true);

        try {
            const hasPending = await checkVetAppointments(vetId);

            if (hasPending) {
                toast({
                    title: "Cannot deactivate vet",
                    description: "Vet has pending appointments.",
                    status: "error",
                    duration: 2500
                });
                setLoading(false);
                return;
            }

            await deleteVet(vetId, true); // soft delete only

            toast({
                title: "Vet Deactivated",
                description: "Vet successfully deactivated.",
                status: "success",
                duration: 2500
            });

            setVet(null);
            setVetId("");

        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to deactivate vet.",
                status: "error",
                duration: 2000
            });
        }

        setLoading(false);
    };

    return (
     
        <Box bg="gray.50" minH="100vh" py={10}>
            <Box
                bgImage={`url(${bgImage})`}
                bgSize="cover"
                bgPosition="center"
                minH="100vh"
                color="#3a2f2f"
            >  
            <Container maxW="lg">
                <VStack spacing={6} bg="white" p={6} shadow="lg" borderRadius="md">
                    <Text fontSize="3xl" fontWeight="bold">
                        Remove / Deactivate Vet
                    </Text>

                    {/* Search section */}
                    <Input
                        placeholder="Enter Vet ID"
                        value={vetId}
                        onChange={(e) => setVetId(e.target.value)}
                        bg="white"
                    />

                    <Button
                        onClick={handleSearch}
                        isLoading={loading}
                        w="full"
                        colorScheme="blue"
                    >
                        Search Vet
                    </Button>

                    <Divider />

                    {/* Vet Info */}
                    {vet && (
                        <Box w="full" p={4} border="1px solid #ddd" borderRadius="md">
                            <Text><b>Name:</b> {vet.user?.name}</Text>
                            <Text><b>Email:</b> {vet.user?.email}</Text>
                            <Text><b>Speciality:</b> {vet.speciality}</Text>
                            <Text><b>Experience:</b> {vet.experienceYears} years</Text>

                            <Button
                                mt={4}
                                colorScheme="red"
                                w="full"
                                onClick={handleDeactivate}
                                isLoading={loading}
                            >
                                Deactivate Vet
                            </Button>
                        </Box>
                    )}

                    {!vet && (
                        <Text color="gray.500">Search a vet by ID to proceed</Text>
                    )}
                </VStack>
            </Container>
        </Box>
        </Box>
    );
};

export default AdminRemoveVet;
