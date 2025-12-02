import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/vet/VetSidebar";
import background from "../../assets/background.png";

const PastAppointments = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("user"));
  const vetId = user?.vetId;


  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (!vetId) return;

    const fetchPastAppointments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/appointments/past/${vetId}`);
        const data = await res.json();

        const formattedData = data
          .filter((appt) => appt.status === "Done") // only Done appointments
          .map((appt) => {
            const dateObj = new Date(appt.timeslot);
            return {
              ...appt,
              date: dateObj.toISOString().split("T")[0], // Use ISO format for consistent filtering
              displayDate: dateObj.toLocaleDateString(),
              time: dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
          });

        setAppointments(formattedData);
        setFilteredAppointments(formattedData);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error fetching past appointments",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };

    fetchPastAppointments();
  }, [vetId, toast]);

  useEffect(() => {
    let filtered = appointments;

    if (search.trim() !== "") {
      filtered = filtered.filter((appt) =>
        appt.petName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dateFilter !== "") {
      filtered = filtered.filter((appt) => appt.date === dateFilter);
    }

    setFilteredAppointments(filtered);
  }, [search, dateFilter, appointments]);

  return (
    <Box
      minH="100vh"
      bgImage={`url(${background})`}
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Sidebar />

      <Box ml="230px" p={6} maxH="100vh" overflowY="auto">
        <Heading mb={6} color="#3a2f2f">
          Past Appointments
        </Heading>

        {/* SEARCH + FILTER */}
        <Flex gap={4} mb={6}>
          <Input
            placeholder="Search by pet name..."
            bg="white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Input
            type="date"
            bg="white"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          <Button
            bg="#917659ff"
            color="white"
            _hover={{ bg: "#3f3320ff" }}
            onClick={() => {
              setSearch("");
              setDateFilter("");
            }}
          >
            Clear Filters
          </Button>
        </Flex>

        {filteredAppointments.length === 0 ? (
          <Text color="#555">No past appointments</Text>
        ) : (
          <SimpleGrid columns={[1, 2]} spacing={6}>
            {filteredAppointments.map((appt) => (
              <Box
                key={appt._id}
                bg="rgba(255,255,255,0.92)"
                borderRadius="18px"
                p={6}
                boxShadow="lg"
              >
                <Heading fontSize="lg" mb={2} color="#3a2f2f">
                  {appt.petName}
                </Heading>

                <Text mb={2} color="#555">Breed: {appt.breed || "N/A"}</Text>
                <Text mb={2} color="#555">Age: {appt.age || "N/A"}</Text>
                <Text mb={2} color="#555">Date: {appt.displayDate} | Time: {appt.time}</Text>
                <Text mb={2} color="#555">Reason: {appt.reason || "N/A"}</Text>
                {appt.medicalHistory && (
                  <Text mb={2} color="#555" fontSize="sm">
                    Medical History: {appt.medicalHistory}
                  </Text>
                )}
                <Text mb={4} color="#555" fontWeight="bold">
                  Notes: {appt.notes || "No notes added"}
                </Text>

                <Button
                  bg="#917659ff"
                  color="white"
                  _hover={{ bg: "#3f3320ff" }}
                  onClick={() => navigate(`/pet/${appt.petId}`)}
                >
                  View Pet Profile
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default PastAppointments;
