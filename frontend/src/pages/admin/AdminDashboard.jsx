import bgImage from "../../assets/background.png";
import { Box, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Header from "../../components/Header";
import CardItem from "../../components/CardItem";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  //refs for each section
  const manageVetsRef = useRef(null);
  const manageCustomersRef = useRef(null);
  const managePetsRef = useRef(null);
  const analyticsRef = useRef(null);
  const customerRecordRef = useRef(null);
  const auditRef = useRef(null);

  //scroll to section funct
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const vetActions = [
    {
      title: "Add Vet",
      description: "Register a new veterinarian to the system.",
      buttonText: "Add Vet",
      path: "/admin/vets/add",
    },
    {
      title: "Remove Vet",
      description: "Remove a veterinarian from the system.",
      buttonText: "Remove Vet",
      path: "/admin/vets/remove",
    },
    {
      title: "View Vets",
      description: "View all registered veterinarians and their details.",
      buttonText: "View Vets",
      path: "/admin/vets/view",
    },
  ];

  const customerActions = [
    {
      title: "View Customers",
      description: "View all registered customers and their information.",
      buttonText: "View Customers",
      path: "/admin/customers/view",
    },
    {
      title: "Remove (Ban) Customer",
      description: "Ban or remove a customer from the system.",
      buttonText: "Ban Customer",
      path: "/admin/customers/ban",
    },
  ];

  const petActions = [
    {
      title: "Add Pet",
      description: "Put a pet up for adoption in the system.",
      buttonText: "Add Pet",
      path: "/admin/pets/add",
    },
    {
      title: "Remove Pet",
      description: "Remove a pet from inventory.",
      buttonText: "Remove Pet",
      path: "/admin/pets/view",
    },
    {
      title: "View Pets",
      description: "View all pets in the system and their status.",
      buttonText: "View Pets",
      path: "/admin/pets/view",
    },
    {
      title: "Modify Pet",
      description: "Update pet information.",
      buttonText: "Modify Pet",
      path: "/admin/pets/view",
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
    
    <AdminSidebar 
      scrollToSection={scrollToSection} 
      refs={{ 
        manageVetsRef,
        manageCustomersRef,
        managePetsRef,
        analyticsRef,
        customerRecordRef,
        auditRef
      }} 
    />
      <Box ml={{ base: 0, md: "230px" }} p={6}>
        <Header title="Welcome to FurEver Admin" />
        
        <Text fontSize="lg" mb={6} color="white">
          Manage vets, customers, pets, and view analytics in one place.
        </Text>

        {/*manage pets*/}
        <Box
          ref={managePetsRef}
          bg="rgba(255,255,255,0.9)"
          p={6}
          borderRadius="18px"
          boxShadow="lg"
          mb={6}
          scrollMarginTop="20px"
        >
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
            Manage Pets
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

        {/*manage vets*/}
        <Box 
          ref={manageVetsRef} 
          bg="rgba(255,255,255,0.9)" 
          p={6} 
          borderRadius="18px" 
          boxShadow="lg" 
          mb={6}
          scrollMarginTop="20px"
        >
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
            Manage Vets
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {vetActions.map((a) => (
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

        {/*manage customers*/}
        <Box 
          ref={manageCustomersRef} 
          bg="rgba(255,255,255,0.9)" 
          p={6} 
          borderRadius="18px" 
          boxShadow="lg" 
          mb={6}
          scrollMarginTop="20px"
        >
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
            Manage Customers
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {customerActions.map((a) => (
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

        {/*analytics*/}
        <Box 
          ref={analyticsRef} 
          bg="rgba(255,255,255,0.9)" 
          p={6} 
          borderRadius="18px" 
          boxShadow="lg" 
          mb={6}
          scrollMarginTop="20px"
        >
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
            Analytics
          </Heading>
          <Text color="#3a2f2f" mb={4}>
            View comprehensive analytics and reports for the system.
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
            onClick={() => navigate("/admin/analytics")}
          >
            View Analytics
          </Box>
        </Box>

        {/*customer record*/}
        <Box 
          ref={customerRecordRef} 
          bg="rgba(255,255,255,0.9)" 
          p={6} 
          borderRadius="18px" 
          boxShadow="lg" 
          mb={6}
          scrollMarginTop="20px"
        >
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
            Customer Record
          </Heading>
          <Text color="#3a2f2f" mb={4}>
            Access detailed customer records and history.
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
            onClick={() => navigate("/admin/customer-record")}
          >
            View Records
          </Box>
        </Box>

        {/*audit*/}
        <Box 
          ref={auditRef} 
          bg="rgba(255,255,255,0.9)" 
          p={6} 
          borderRadius="18px" 
          boxShadow="lg"
          scrollMarginTop="20px"
        >
          <Heading fontSize="2xl" mb={6} color="#3a2f2f">
            Audit
          </Heading>
          <Text color="#3a2f2f" mb={4}>
            Review system audit logs and activity history.
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
            onClick={() => navigate("/admin/audit")}
          >
            View Audit Logs
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;