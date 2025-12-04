import bgImage from "../assets/background.png";
import { Box, SimpleGrid, Heading, Button, Text } from "@chakra-ui/react";
import Sidebar from "../components/CustomerSidebar";
import Header from "../components/Header";
import CardItem from "../components/CardItem.jsx";
import CustomerNotificationBell from "./components/CustomerNotificationBell";

import { useNavigate } from "react-router-dom";

const CustomerDash = () => {
    const navigate = useNavigate();

    const appointmentActions = [
        {
            title: "View Upcoming Appointments",
            description: "See when your furry sidekicks are due for a checkin.",
            buttonText: "View",
            path: "/upcoming-appt",
        },
        {
            title: "Book Appointment",
            description: "Bring in our little friends for a checkup.",
            buttonText: "Approve",
            path: "/book-appt",
        },
        {
            title: "Cancel Appointment",
            description: "Is your pet suddenly over the weather? We don't mind canceling.",
            buttonText: "Cancel",
            path: "/cancel-appt",
        },
        {
            title: "Modify Appointment",
            description: "Reschedule or update appointment details. We understand the canine chaos.",
            buttonText: "Modify",
            path: "/modify-appt",
        },
        {
            title: "View notes",
            description: "View medical notes or observations post-appointment.",
            buttonText: "View Notes",
            path: "/appointments/add-notes",
        },
    ];

    const petActions = [
        {
            title: "Adopt a Pet",
            description: "Are you looking for a furry companion to warm your lap?",
            buttonText: "Adopt",
            path: "/adopt",
        },
        {
            title: "Rehome Pet",
            description: "Allergic? Family pressure? Traveling? Hand your pet into a loving home.",
            buttonText: "Rehome",
            path: "/rehome",
        },
    ];

    const CusProfileActions = [
        {
            title: "View Profile",
            description: "Review your personal details.",
            buttonText: "View",
            path: "/profile/view",
        },
        {
            title: "Edit Profile",
            description: "Update your personal details .",
            buttonText: "Edit",
            path: "/profile/edit",
        },
    ];

    return (
        <>
            <Sidebar />
            <CustomerNotificationBell customerId={user?._id} />

            <Box ml ="230px" mt="70px" p={8}>{
        <Box
            bgImage={`url(${bgImage})`}
            bgSize="cover"
            bgPosition="center"
            minH="100vh"
            color="#3a2f2f"
        >

            <Box p={6}>
                <Header title="Welcome to FurEver" />

                <Text fontSize="lg" mb={6} color="white">
                    Appointments, pets, and profile management in one place.
                </Text>

                {/* Pet Profiles Section */}
                <Box bg="rgba(255,255,255,0.9)" p={6} borderRadius="18px" boxShadow="lg" mb={2}>
                    <Heading fontSize="2xl" my={5} color="#3a2f2f">
                        Pet Actions
                    </Heading>
                    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                        {petActions.map((a) => (
                            <CardItem
                                key={a.title}
                                title={a.title}
                                description={a.description}
                                buttonText={a.buttonText}
                                onClick={() => navigate(a.path)}
                            />
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Appointments Section */}
                <Box bg="rgba(255,255,255,0.9)" p={6} borderRadius="18px" boxShadow="lg" mb={2}>
                    <Heading fontSize="2xl" my={6} color="#3a2f2f">
                        Appointments
                    </Heading>
                    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                        {appointmentActions.map((a) => (
                            <CardItem
                                key={a.title}
                                title={a.title}
                                description={a.description}
                                buttonText={a.buttonText}
                                onClick={() => navigate(a.path)}
                            />
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Vet Profile Section */}
                <Box bg="rgba(255,255,255,0.9)" p={6} borderRadius="18px" boxShadow="lg" mb={2}>
                    <Heading fontSize="2xl" my={6} color="#3a2f2f">
                        Profile
                    </Heading>
                    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                        {CusProfileActions.map((a) => (
                            <CardItem
                                key={a.title}
                                title={a.title}
                                description={a.description}
                                buttonText={a.buttonText}
                                onClick={() => navigate(a.path)}
                            />
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Logout Section */}
                <Box bg="rgba(255,255,255,0.9)" p={6} borderRadius="18px" boxShadow="lg">
                    <Heading fontSize="2xl" my={4} color="#3a2f2f">
                        Logout
                    </Heading>
                    <Text mb={4} color="#3a2f2f">
                        You can safely log out of your FurEver account here.
                    </Text>
                    <Box
                        as="button"
                        bg="#b89f7e"
                        color="white"
                        px={6}
                        py={2}
                        borderRadius="md"
                        fontWeight="medium"
                        _hover={{ bg: "#a08968" }}
                        onClick={() => {
                            //logout logic here...we'll do this later cuz i'm tired now:(
                            navigate("/logout");
                        }}
                    >
                        Logout
                    </Box>
                </Box>
            </Box>
        </Box>}
       </Box> 
        </>
    );
};

export default CustomerDash;