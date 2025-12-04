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
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import { usePetInventory } from "../../store/pet";
import { useState } from "react";
import Theme from "./Theme";

const VetPetCard = ({ pet }) => {
	const [updatedPet, setUpdatedPet] = useState(pet);
	const [adoptionForm, setAdoptionForm] = useState({
		phone: "",
		address: "",
	});

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deletePet, updatePet, adoptPet } = usePetInventory();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
//	const { isOpen: isAdoptOpen, onOpen: onAdoptOpen, onClose: onAdoptClose } = useDisclosure();

	const handleDeletePet = async (pid) => {
		const { success, message } = await deletePet(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdatePet = async (pid, updatedPet) => {
		const { success, message } = await updatePet(pid, updatedPet);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Pet updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	// const handleAdoptPet = async () => {
	// 	const user = JSON.parse(localStorage.getItem("user"));

	// 	if (!user || !user._id) {
	// 		toast({
	// 			title: "Error",
	// 			description: "Please log in to adopt a pet",
	// 			status: "error",
	// 			duration: 3000,
	// 			isClosable: true,
	// 		});
	// 		return;
	// 	}

	// 	if (!adoptionForm.phone || !adoptionForm.address) {
	// 		toast({
	// 			title: "Error",
	// 			description: "Please fill in all fields",
	// 			status: "error",
	// 			duration: 3000,
	// 			isClosable: true,
	// 		});
	// 		return;
	// 	}

	// 	const { success, message } = await adoptPet(pet._id, {
	// 		userId: user._id,
	// 		phone: adoptionForm.phone,
	// 		address: adoptionForm.address,
	// 	});

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
	// 		setAdoptionForm({ phone: "", address: "" });
	// 		onAdoptClose();
	// 	}
	// };

	const isAdopted = pet.status.toLowerCase() !== "available" || pet.adoptedBy;

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

				{/* <Button
					fontSize='xl'
					bg="#b89f7e"
					_hover={{ bg: "#d8cfc3ff" }}
					my={4}
					onClick={onAdoptOpen}
					isDisabled={pet.status.toLowerCase() !== "available"}
				>
					{"Remove"}
				</Button> */}

				{ <HStack spacing={2}>
					{/* Buttons greyed out if the pet is adopted */}
									{/* <IconButton
						icon={<EditIcon />}
						onClick={onOpen}
						colorScheme='blue'
						isDisabled={isAdopted}
						opacity={isAdopted ? 0.4 : 1}
						cursor={isAdopted ? "not-allowed" : "pointer"}
					/>

					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeletePet(pet._id)}
						colorScheme='red'
						isDisabled={isAdopted}
						opacity={isAdopted ? 0.4 : 1}
						cursor={isAdopted ? "not-allowed" : "pointer"}
					/> */}

						<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
				</HStack> }
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Pet</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
							<VStack spacing={4}>
									<Input
										placeholder='Pet Name'
										value={updatedPet.name}
										onChange={(e) => setUpdatedPet({ ...updatedPet, name: e.target.value })}
									/>

									<Input
										placeholder='Breed'
										value={updatedPet.breed}
										onChange={(e) => setUpdatedPet({ ...updatedPet, breed: e.target.value })}
									/>

									<Input
										placeholder='Age'
										type='number'
										value={updatedPet.age}
										onChange={(e) => setUpdatedPet({ ...updatedPet, age: e.target.value })}
									/>

									<Input
										placeholder='Status (Available / Adopted)'
										value={updatedPet.status}
										onChange={(e) => setUpdatedPet({ ...updatedPet, status: e.target.value })}
									/>

									<Input
										placeholder='Image URL'
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
			</Modal>

			{/* Adoption Modal
			<Modal isOpen={isAdoptOpen} onClose={onAdoptClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Adopt {pet.name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<FormControl isRequired>
								<FormLabel>Phone Number</FormLabel>
								<Input
									placeholder='Enter your phone number'
									value={adoptionForm.phone}
									onChange={(e) => setAdoptionForm({ ...adoptionForm, phone: e.target.value })}
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Address</FormLabel>
								<Input
									placeholder='Enter your address'
									value={adoptionForm.address}
									onChange={(e) => setAdoptionForm({ ...adoptionForm, address: e.target.value })}
								/>
							</FormControl>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							bg="#b89f7e"
							_hover={{ bg: "#d8cfc3ff" }}
							mr={3}
							onClick={handleAdoptPet}
						>
							Confirm Adoption
						</Button>
						<Button variant='ghost' onClick={onAdoptClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> */}
		</Box>
	);
};
export default VetPetCard;