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
import Sidebar from "../../components/Sidebar";
import bgImage from "../../assets/background.png";

const PastAppointments = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {

        const vetId = "YOUR_VET_ID_HERE";
        const res = await fetch(`http://localhost:3000/api/appointments/past/${vetId}`);
        const data = await res.json();


        const formattedData = data.map(appt => {
          const dateObj = new Date(appt.timeslot);
          return {
            ...appt,
            date: dateObj.toLocaleDateString(),
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

    fetchAppointments();
  }, [toast]);


  useEffect(() => {
    let filtered = appointments;

    if (search.trim() !== "") {
      filtered = filtered.filter(appt =>
        appt.petName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dateFilter !== "") {
      filtered = filtered.filter(appt => appt.date === dateFilter);
    }

    setFilteredAppointments(filtered);
  }, [search, dateFilter, appointments]);

  return (
    <Box
      minH="100vh"
      bgImage={`url(${bgImage})`}
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
            bg="#c09a7f"
            color="white"
            _hover={{ bg: "#a57e63" }}
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

                <Text mb={2} color="#555">Breed: {appt.breed}</Text>
                <Text mb={2} color="#555">Age: {appt.age}</Text>
                <Text mb={2} color="#555">Date: {appt.date} | Time: {appt.time}</Text>
                <Text mb={2} color="#555">Reason: {appt.reason}</Text>
                <Text mb={4} color="#555">Notes: {appt.notes || "No notes added"}</Text>

                <Button
                  bg="#9c7960ff"
                  color="white"
                  _hover={{ bg: "#9c7960ff" }}
                  onClick={() => navigate(`/pet/${appt.petId}`)}
                >
                  View Profile
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
