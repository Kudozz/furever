import { useState } from 'react';
import { Container, VStack, Button, Box, Heading, Input, useToast } from '@chakra-ui/react';
import { usePetInventory } from '../../../store/pet';
import bgImage from "../../assets/background.png";

const AddPet = () => {
    const [newPet, setNewPet] = useState({
        name: "",
        breed: "",
        age: "",
        status: "",
        image: "",
    });

    //success messages
    const toast = useToast();
    const{ createPet } = usePetInventory();

    const handleAddPet = async () => {
        //success/failure messages
        const{ success, message } = await createPet(newPet);
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
        setNewPet({ name: "", breed: "", age: "", status: "", image: "" });
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
                        Add Pet for Adoption
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
                                placeholder='Pet Name' 
                                name='name'
                                value={newPet.name}
                                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input 
                                placeholder='Breed' 
                                name='breed'
                                type='text'
                                value={newPet.breed}
                                onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input 
                                placeholder='Age' 
                                name='age'
                                type='number'
                                value={newPet.age}
                                onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input 
                                placeholder='Status (e.g., Available, Pending)' 
                                name='status'
                                type='text'
                                value={newPet.status}
                                onChange={(e) => setNewPet({ ...newPet, status: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            <Input 
                                placeholder='Image URL' 
                                name='image'
                                value={newPet.image}
                                onChange={(e) => setNewPet({ ...newPet, image: e.target.value })}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: "#b89f7e" }}
                                _focus={{ borderColor: "#b89f7e", boxShadow: "0 0 0 1px #b89f7e" }}
                            />
                            
                            {/*submit button */}
                            <Button 
                                bg="#b89f7e" 
                                color="white"
                                onClick={handleAddPet} 
                                w='full'
                                _hover={{ bg: "#a08968" }}
                                size="lg"
                                mt={2}
                            >
                                Add Pet ♡
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default AddPet;