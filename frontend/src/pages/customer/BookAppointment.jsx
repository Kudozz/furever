import { useState, useEffect } from "react";
import {
  Container, VStack, Box, Heading,
  Input, Textarea, Button, useToast, FormControl, FormLabel,
  SimpleGrid, Text, Select, Flex
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../../assets/background.png";

const BookAppointment = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // Multi-step form state
  const [step, setStep] = useState(1);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableVets, setAvailableVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [form, setForm] = useState({
    reason: "",
    medicalHistory: ""
  });

  // Fetch adopted pets on mount
  useEffect(() => {
    const fetchAdoptedPets = async () => {
      try {
        const res = await axios.get(`/api/pets/adopted/${userId}`);
        setAdoptedPets(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to fetch adopted pets",
          status: "error",
          isClosable: true,
        });
      }
    };
    if (userId) fetchAdoptedPets();
  }, [userId, toast]);

  // Filter vets based on search and speciality
  useEffect(() => {
    let filtered = availableVets;
    if (searchTerm) {
      filtered = filtered.filter((vet) =>
        vet.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (specialityFilter) {
      filtered = filtered.filter((vet) => vet.speciality === specialityFilter);
    }
    setFilteredVets(filtered);
  }, [searchTerm, specialityFilter, availableVets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setStep(2);
  };

  const handleDateTimeSubmit = async () => {
    if (!date || !startTime || !endTime) {
      toast({
        title: "Error",
        description: "Please select date and time range",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (startTime >= endTime) {
      toast({
        title: "Error",
        description: "End time must be after start time",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      // Fetch available vets for the selected time range
      const timeslot = new Date(`${date}T${startTime}`).toISOString();
      const res = await axios.post("http://localhost:5000/api/appointments/available", {
        timeslot,
      });
      setAvailableVets(res.data || []);
      setFilteredVets(res.data || []);
      setStep(3);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch available vets",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleVetSelect = (vet) => {
    setSelectedVet(vet);
    setStep(4);
  };

  const handleSubmit = async () => {
    if (!form.reason) {
      toast({
        title: "Error",
        description: "Please provide a reason for the appointment",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      const timeslot = new Date(`${date}T${startTime}`).toISOString();

      await axios.post("http://localhost:5000/api/appointments", {
        user: userId,
        vet: selectedVet._id,
        petId: selectedPet._id,
        petName: selectedPet.name,
        timeslot,
        reason: form.reason,
        medicalHistory: form.medicalHistory,
      });

      toast({
        title: "Success",
        description: "Appointment booked successfully!",
        status: "success",
        isClosable: true,
      });

      navigate("/upcoming-appt");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to book appointment",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={6}
      bgImage={`url(${bgImage})`}
      bgSize="cover"
      minH="100vh"
    >
      <Container maxW={"container.md"} mt={10}>
        <VStack spacing={8}>
          <Heading size={"2xl"} textAlign="center" mb={9} color="white">
            Book Appointment
          </Heading>

          {/* STEP 1: Select Pet */}
          {step === 1 && (
            <Box w={"full"} bg="white" p={6} rounded={"lg"} shadow={"md"}>
              <Heading size={"md"} mb={4} color="#3a2f2f">
                Step 1: Select Your Pet
              </Heading>
              {adoptedPets.length === 0 ? (
                <Text color="#555">You have no adopted pets yet.</Text>
              ) : (
                <SimpleGrid columns={[1, 2]} spacing={4}>
                  {adoptedPets.map((pet) => (
                    <Box
                      key={pet._id}
                      p={4}
                      borderRadius="12px"
                      border="2px solid #b89f7e"
                      cursor="pointer"
                      _hover={{ bg: "#f5f5f5", transform: "scale(1.02)" }}
                      transition="all 0.2s"
                      onClick={() => handlePetSelect(pet)}
                    >
                      <Text fontWeight="bold" color="#3a2f2f" fontSize="lg">
                        {pet.name}
                      </Text>
                      <Text color="#555">Breed: {pet.breed}</Text>
                      <Text color="#555">Age: {pet.age} years</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          )}

          {/* STEP 2: Select Date and Time */}
          {step === 2 && (
            <Box w={"full"} bg="white" p={6} rounded={"lg"} shadow={"md"}>
              <Heading size={"md"} mb={4} color="#3a2f2f">
                Step 2: Select Date and Time Range
              </Heading>
              <Text mb={4} color="#555">
                Selected Pet: <strong>{selectedPet?.name}</strong>
              </Text>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </FormControl>

                <Flex gap={2} w="full">
                  <Button
                    bg="#d3d3d3"
                    color="#3a2f2f"
                    _hover={{ bg: "#c0c0c0" }}
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    bg="#b89f7e"
                    color="white"
                    _hover={{ bg: "#977053ff" }}
                    flex={1}
                    onClick={handleDateTimeSubmit}
                  >
                    Find Available Vets
                  </Button>
                </Flex>
              </VStack>
            </Box>
          )}

          {/* STEP 3: View and Filter Available Vets */}
          {step === 3 && (
            <Box w={"full"} bg="white" p={6} rounded={"lg"} shadow={"md"}>
              <Heading size={"md"} mb={4} color="#3a2f2f">
                Step 3: Select a Vet
              </Heading>
              <Text mb={4} color="#555">
                Available vets on {date} from {startTime} to {endTime}
              </Text>

              {/* Filters */}
              <Flex gap={4} mb={4}>
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                  placeholder="Filter by speciality"
                  value={specialityFilter}
                  onChange={(e) => setSpecialityFilter(e.target.value)}
                >
                  {[...new Set(availableVets.map((v) => v.speciality))].map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </Select>
              </Flex>

              {filteredVets.length === 0 ? (
                <Text color="#555">No vets available for this time slot.</Text>
              ) : (
                <SimpleGrid columns={[1, 2]} spacing={4} mb={4}>
                  {filteredVets.map((vet) => (
                    <Box
                      key={vet._id}
                      p={4}
                      borderRadius="12px"
                      border="2px solid #b89f7e"
                      cursor="pointer"
                      _hover={{ bg: "#f5f5f5", transform: "scale(1.02)" }}
                      transition="all 0.2s"
                      onClick={() => handleVetSelect(vet)}
                    >
                      <Text fontWeight="bold" color="#3a2f2f" fontSize="lg">
                        {vet.user?.name || "N/A"}
                      </Text>
                      <Text color="#555">Speciality: {vet.speciality || "N/A"}</Text>
                      <Text color="#555">Experience: {vet.experienceYears || "N/A"} years</Text>
                      {vet.bio && (
                        <Text color="#555" fontSize="sm" mt={2}>
                          {vet.bio}
                        </Text>
                      )}
                    </Box>
                  ))}
                </SimpleGrid>
              )}

              <Button
                bg="#d3d3d3"
                color="#3a2f2f"
                _hover={{ bg: "#c0c0c0" }}
                onClick={() => setStep(2)}
              >
                Back
              </Button>
            </Box>
          )}

          {/* STEP 4: Enter Details */}
          {step === 4 && (
            <Box w={"full"} bg="white" p={6} rounded={"lg"} shadow={"md"}>
              <Heading size={"md"} mb={4} color="#3a2f2f">
                Step 4: Appointment Details
              </Heading>
              <Text mb={4} color="#555">
                Pet: <strong>{selectedPet?.name}</strong> | Vet:{" "}
                <strong>{selectedVet?.user?.name}</strong>
              </Text>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Reason for Appointment</FormLabel>
                  <Textarea
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    placeholder="Describe the reason for the appointment"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Medical History (optional)</FormLabel>
                  <Textarea
                    name="medicalHistory"
                    value={form.medicalHistory}
                    onChange={handleChange}
                    placeholder="Enter pet's medical history if any"
                  />
                </FormControl>

                <Flex gap={2} w="full">
                  <Button
                    bg="#d3d3d3"
                    color="#3a2f2f"
                    _hover={{ bg: "#c0c0c0" }}
                    onClick={() => setStep(3)}
                  >
                    Back
                  </Button>
                  <Button
                    bg="#b89f7e"
                    color="white"
                    _hover={{ bg: "#977053ff" }}
                    flex={1}
                    onClick={handleSubmit}
                  >
                    Book Appointment ♡
                  </Button>
                </Flex>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default BookAppointment;
