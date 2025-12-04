import bgImage from "../../assets/background.png";
import { Box, SimpleGrid, Heading, Button, Text } from "@chakra-ui/react";
import Sidebar from "../../components/vet/VetSidebar";
import Header from "../../components/Header";
import CardItem from "../../components/CardItem";
import { useNavigate } from "react-router-dom";

const VetDashboard = () => {
  const navigate = useNavigate();

  const appointmentActions = [
    {
      title: "View Appointment",
      description: "Filter appointments by upcoming, past, or date.",
      buttonText: "View",
      path: "/appointments/view",
    },
    {
      title: "Approve Appointment",
      description: "Accept or reject appointment requests.",
      buttonText: "Approve",
      path: "/appointments/approve",
    },
    {
      title: "Cancel Appointment",
      description: "Remove or cancel appointments as needed.",
      buttonText: "Cancel",
      path: "/appointments/cancel",
    },
    {
      title: "Modify Appointment",
      description: "Reschedule or update appointment details.",
      buttonText: "Modify",
      path: "/appointments/modify",
    },
    {
      title: "Mark Appointment as Done",
      description: "Mark appointments as completed after consultation.",
      buttonText: "Mark Done",
      path: "/appointments/mark-done",
    },
    {
      title: "Add Notes",
      description: "Add medical notes or observations post-appointment.",
      buttonText: "Add Notes",
      path: "/appointments/add-notes",
    },
  ];

  const petActions = [
    {
      title: "View Pet",
      description: "Check pet history, owner details, and medical info.",
      buttonText: "View",
      path: "vet/pets/view",
    },
    {
      title: "Modify Pet",
      description: "Update vaccination, treatment, or owner details.",
      buttonText: "Update",
      path: "vet/pets/view",
    },
  ];

  const vetProfileActions = [
    {
      title: "View Profile",
      description: "Review your professional and personal details.",
      buttonText: "View",
      path: "/profile/view",
    },
    {
      title: "Edit Profile",
      description: "Update your schedule, contact info, and availability.",
      buttonText: "Edit",
      path: "/profile/edit",
    },
  ];

  return (
    <Box
      bgImage={`url(${bgImage})`} 
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      color="#3a2f2f"
    >      
    
    <Sidebar />
      <Box ml={{ base: 0, md: "230px" }} p={6}>
        <Header title="Welcome to FurEver" />
        
        <Text fontSize="lg" mb={6} color="white">
          Manage your appointments, pets, and vet profile in one place.
        </Text>

        {/* Appointments Section */}
        <Box bg="rgba(255,255,255,0.9)" p={6} borderRadius="18px" boxShadow="lg" mb={6}>
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
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

        {/* Pet Profiles Section */}
        <Box bg="rgba(255,255,255,0.9)" p={6} borderRadius="18px" boxShadow="lg" mb={6}>
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
            Pet Profiles
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

        {/* Vet Profile Section */}
        <Box bg="rgba(255,255,255,0.9)" p={6} borderRadius="18px" boxShadow="lg" mb={6}>
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
            Vet Profile
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {vetProfileActions.map((a) => (
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
          <Heading fontSize="2xl" mb={4} color="#3a2f2f">
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
    </Box>
  );
};

export default VetDashboard;