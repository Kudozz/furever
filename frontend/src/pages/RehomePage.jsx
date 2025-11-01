import {useState} from 'react';
import {Container, VStack, Button, Box, Heading, useColorModeValue, Input, useToast} from '@chakra-ui/react';
import { usePetInventory } from '../../store/pet';


const CreatePage = () =>{
    //this defines the fields needed for ur object
    //it should match the model u have put in a file thats probably called pet.model.js or something
    const[newPet, setNewPet] = useState({
        name: "",
        breed: "",
        age: "",
        status: "",
        image: "",
    });

    //this will show successful messages
const toast = useToast();

const {createPet}= usePetInventory();

const handleAddPet = async ()=>{
    //success failure messaging
    const {success, message}= await createPet(newPet);
    if(!success) {
        toast({
            title:"Error",
            description: message,
            status: "error",
            isClosable: true
        }); 
    }else {
            toast({
                title:"Success",
                description: message,
                status: "success",
                isClosable: true
            });
    }

    //very important!!!!!!! change these fields
    setNewPet({name: "", breed:"", age:"", status:"", image:""});
};
    return <Container maxW={"container.sm"}>
        <VStack spacing = {8}>
            {/* title */}
            <Heading as={"h1"} size = {"2xl"} textAlign ={"center"} margin={10} mb={9} color={"white"}>
               Rehome Your Pet
            </Heading>

               {/* card to hold input fields */}
            <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
            p={6} rounded = {"lg"} shadow ={"md"}>

               {/* here are all the input fields that should match the schema u wrote above */}
            <VStack spacing={4}>
                <Input placeholder='Pet Name' 
                name='name'
                value = {newPet.name}
                onChange={(e)=>setNewPet({...newPet, name: e.target.value})}/>

                <Input placeholder='Breed' 
                name='breed'
                type = 'string'
                value = {newPet.breed}
                onChange={(e)=>setNewPet({...newPet, breed: e.target.value})}/>

                <Input placeholder='Age' 
                name='age'
                type = 'number'
                value = {newPet.age}
                onChange={(e)=>setNewPet({...newPet, age: e.target.value})}/>

                  <Input placeholder='Status' 
                name='status'
                type = 'string'
                value = {newPet.status}
                onChange={(e)=>setNewPet({...newPet, status: e.target.value})}/>

                <Input placeholder='Image URl' 
                name='image'
                value = {newPet.image}
                onChange={(e)=>setNewPet({...newPet, image: e.target.value})}/>

                       {/* submit buton */}
                <Button bg="#b89f7e" onClick={handleAddPet} w='full'>Submit  ♡ </Button>
            </VStack>
            </Box>
        </VStack>
    </Container>;
};

export default CreatePage;