import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { usePetInventory } from "../../store/pet";
import { useState } from "react";
import Theme from "./Theme";

const PetCard = ({ pet }) => {
	const [updatedPet, setUpdatedPet] = useState(pet);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deletePet, updatePet } = usePetInventory();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	// const handleDeletePet = async (pid) => {
	// 	const { success, message } = await deletePet(pid);
	// 	if (!success) {
	// 		toast({
	// 			title: "Error",
	// 			description: message,
	// 			status: "error",
	// 			duration: 3000,
	// 			isClosable: true,
	// 		});
	// 	} else {
	// 		toast({
	// 			title: "Success",
	// 			description: message,
	// 			status: "success",
	// 			duration: 3000,
	// 			isClosable: true,
	// 		});
	// 	}
	// };

	// const handleUpdatePet = async (pid, updatedPet) => {
	// 	const { success, message } = await updatePet(pid, updatedPet);
	// 	onClose();
	// 	if (!success) {
	// 		toast({
	// 			title: "Error",
	// 			description: message,
	// 			status: "error",
	// 			duration: 3000,
	// 			isClosable: true,
	// 		});
	// 	} else {
	// 		toast({
	// 			title: "Success",
	// 			description: "Pet updated successfully",
	// 			status: "success",
	// 			duration: 3000,
	// 			isClosable: true,
	// 		});
	// 	}
	// };

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={pet.image} alt={pet.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{pet.name}
				</Heading>

				<Text fontSize='l' color={textColor} margin={1}>
					Breed: {pet.breed}
				</Text>

				<Text fontSize='l' color={textColor} margin={1}>
					{pet.age} years old
				</Text>
				
				<Text fontSize='l' color={textColor} margin={1}>
					Status: {pet.status}
				</Text>

				<Button fontsize='xl' bg="#b89f7e" _hover={{ bg: "#d8cfc3ff" }}  my={4}>Adopt</Button>

				{/* <HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeletePet(pet._id)}
						colorScheme='red'
					/>
				</HStack> */}
			</Box>

			{/* <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Pet Name'
								name='name'
								value={updatedPet.name}
								onChange={(e) => setUpdatedPet({ ...updatedPet, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedPet.price}
								onChange={(e) => setUpdatedPet({ ...updatedPet, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedPet.image}
								onChange={(e) => setUpdatedPet({ ...updatedPet, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdatePet(pet._id, updatedPet)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> */}
		</Box>
	);
};
export default PetCard;