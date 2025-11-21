
import { useState } from 'react';
import { Container, VStack, Button, Box, Heading, Input, useToast } from '@chakra-ui/react';
import { useVetInventory } from '../../../store/vet';
import bgImage from "../../assets/background.png";

const AddVet = () => {
    const [newVet, setNewVet] = useState({
        name: "",
        email: "",
        password: "",
        speciality: "",
        experienceYears: "",
        bio: "",
        profilePicture: "",
        phoneNumber: ""
    });

    //success messages
    const toast = useToast();
    const{ createVet } = useVetInventory();

    const handleAddVet = async () => {
        //success/failure messages
        const{ success, message } = await createVet(newVet);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
                duration: 3000,
            });
        } 
        
        else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
                duration: 3000,
            });
        }
        //reset form fields
        setNewVet({name: "", email: "", password: "",speciality: "",experienceYears: "",  bio: "", profilePicture: "", phoneNumber: ""});
    };

    return(
        <Box
            bgImage={`url(${bgImage})`}
            bgSize="cover"
            bgPosition="center"
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="#3a2f2f"
        >
            <Container maxW={"container.sm"}>
                <VStack spacing={8}>
                    {/* Title */}
                    <Heading 
                        as={"h1"} 
                        size={"2xl"} 
                        textAlign={"center"} 
                        mb={6}
                        color={"white"}
                    >
                        Add Vet to Database
                    </Heading>

                    {/*card*/}
                    <Box 
                        w={"full"} 
                        bg="rgba(255,255,255,0.9)"
                        p={8} 
                        borderRadius="18px" 
                        boxShadow="lg"
                    >
                        {/*input fields*/}
                        <VStack spacing={4}>
                            <Input 
                                placeholder='Vet Name' 
                                name='name'
                                value={newVet.name}
                                onChange={(e) => setNewVet({ ...newVet, name: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input 
                                placeholder='Email' 
                                name='email'
                                type='text'
                                value={newVet.email}
                                onChange={(e) => setNewVet({ ...newVet, email: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input 
                                placeholder='Password' 
                                name='password'
                                type='text'
                                value={newVet.password}
                                onChange={(e) => setNewVet({ ...newVet, password: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input 
                                placeholder='Specialty' 
                                name='specialty'
                                type='text'
                                value={newVet.speciality}
                                onChange={(e) => setNewVet({ ...newVet, speciality: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input 
                                placeholder='Experience (years)' 
                                name='experienceYears'
                                type = 'number'
                                value={newVet.experienceYears}
                                onChange={(e) => setNewVet({ ...newVet, experienceYears: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input
                                placeholder='Bio'
                                name='bio'
                                type='text'
                                value={newVet.bio}
                                onChange={(e) => setNewVet({ ...newVet, bio: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input
                                placeholder='Profile picture URL'
                                name='profilePicture'
                                type='text'
                                value={newVet.profilePicture}
                                onChange={(e) => setNewVet({ ...newVet, profilePicture: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input
                                placeholder='Phone Number'
                                name='phoneNumber'
                                type='text'
                                value={newVet.phoneNumber}
                                onChange={(e) => setNewVet({ ...newVet, phoneNumber: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            
                            {/*submit button */}
                            <Button 
                                bg="#b89f7e" 
                                color="white"
                                onClick={handleAddVet} 
                                w='full'
                                _hover={{ bg: "#a08968" }}
                                size="lg"
                                mt={2}
                            >
                                Add Vet ♡
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default AddVet;