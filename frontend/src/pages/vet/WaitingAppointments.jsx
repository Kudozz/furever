import { useEffect, useState } from "react";
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Input,
    Flex,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/vet/VetSidebar";
import background from "../../assets/background.png";
import axios from "axios";

const WaitingAppointments = () => {
    const navigate = useNavigate();
    const toast = useToast();

    // ✅ Get vetId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const vetId = user?.vetId;

    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [dateFilter, setDateFilter] = useState("");

    // 🔹 Fetch waiting appointments for this vet
    const fetchAppointments = async () => {
        if (!vetId) return;
        try {
            const res = await axios.get(
                `http://localhost:5000/api/appointments/waiting/${vetId}`
            );

            const formatted = res.data.map((appt) => {
                const dateObj = new Date(appt.timeslot);
                return {
                    ...appt,
                    date: dateObj.toISOString().split("T")[0],
                    time: dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                };
            });

            setAppointments(formatted);
            setFilteredAppointments(formatted);
        } catch (err) {
            console.error(err);
            toast({
                title: "Error fetching appointments",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [vetId]);

    // 🔹 Filter by date
    useEffect(() => {
        let filtered = appointments;
        if (dateFilter !== "") {
            filtered = filtered.filter((appt) => appt.date === dateFilter);
        }
        setFilteredAppointments(filtered);
    }, [dateFilter, appointments]);

    // 🔹 Approve or Reject appointment
    const handleApprove = async (apptId) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/appointments/${apptId}/decision`,
                { status: "Approved" }
            );
            toast({
                title: "Appointment approved",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            fetchAppointments();
        } catch (err) {
            console.error(err);
            toast({
                title: "Error approving appointment",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleReject = async (apptId) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/appointments/${apptId}/decision`,
                { status: "Rejected" }
            );
            toast({
                title: "Appointment rejected and deleted",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
            fetchAppointments();
        } catch (err) {
            console.error(err);
            toast({
                title: "Error rejecting appointment",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            minH="100vh"
            bgImage={`url(${background})`}
            bgSize="cover"
            bgRepeat="no-repeat"
        >
            <Sidebar />

            <Box ml="230px" p={6} maxH="100vh" overflowY="auto">
                <Heading mb={6} color="#cececeff">
                    Waiting Appointments
                </Heading>

                {/* DATE FILTER */}
                <Flex gap={4} mb={6}>
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
                        onClick={() => setDateFilter("")}
                    >
                        Clear Filter
                    </Button>
                </Flex>

                {filteredAppointments.length === 0 ? (
                    <Text color="#555">No pending appointments</Text>
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

                                <Flex mt={4} gap={2}>
                                    <Button
                                        bg="green.500"
                                        color="white"
                                        _hover={{ bg: "green.600" }}
                                        onClick={() => handleApprove(appt._id)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        bg="red.500"
                                        color="white"
                                        _hover={{ bg: "red.600" }}
                                        onClick={() => handleReject(appt._id)}
                                    >
                                        Reject
                                    </Button>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
};

export default WaitingAppointments;


// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
// }
// import { useEffect, useState } from "react";
// import { Box, Heading, Text, Button, SimpleGrid, useToast } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/vet/VetSidebar";
// import axios from "axios";
// import background from "../../assets/background.png";
// import { useAuth } from "../../context/AuthContext";

// const WaitingAppointments = () => {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [appointments, setAppointments] = useState([]);
//   const { user } = useAuth();
//   const vetId = user?._id;

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
