import {
    Box,
    Image,
    Text,
    HStack,
    IconButton,
    useColorModeValue,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    Input,
    Textarea,
    Button,
    Badge,
    Flex,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useVetInventory } from "../../store/vet";
import { useState } from "react";

const VetCard = ({ vet }) => {
    const [updatedVet, setUpdatedVet] = useState({
        speciality: vet.speciality || "",
        experienceYears: vet.experienceYears || 0,
        bio: vet.bio || "",
        profilePicture: vet.profilePicture || "",
        phoneNumber: vet.phoneNumber || "",
    });

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteVet, updateVet } = useVetInventory();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleUpdateVet = async (vid, updatedVet) => {
        const { success, message } = await updateVet(vid, updatedVet);
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
                description: "Vet updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Flex direction={{ base: "column", md: "row" }} w="full">
                {/* Profile Picture Section */}
                <Box
                    w={{ base: "100%", md: "250px" }}
                    h={{ base: "250px", md: "auto" }}
                    flexShrink={0}
                >
                    <Image
                        src={vet.profilePicture}
                        alt={vet.user?.name || "Veterinarian"}
                        h='full'
                        w='full'
                        objectFit='cover'
                    />
                </Box>

                {/* Information Section */}
                <VStack flex={1} p={6} align="stretch" spacing={3}>
                    <Flex justify="space-between" align="start">
                        <VStack align="start" spacing={2} flex={1}>
                            <HStack>
                                <Text
                                    fontSize='2xl'
                                    fontWeight='bold'
                                    color={textColor}
                                >
                                    {vet.user?.name || "Unknown"}
                                </Text>
                                <Badge colorScheme='purple' fontSize='sm'>
                                    Veterinarian
                                </Badge>
                            </HStack>

                            <Text fontSize='md' color='gray.500'>
                                {vet.user?.email || "No email"}
                            </Text>

                            {vet.phoneNumber && (
                                <Text fontSize='md' color='gray.500'>
                                    {vet.phoneNumber}
                                </Text>
                            )}

                            <HStack spacing={4} mt={2}>
                                <Badge colorScheme='blue' fontSize='md' px={3} py={1}>
                                    {vet.speciality || "General Practice"}
                                </Badge>
                                <Badge colorScheme='green' fontSize='md' px={3} py={1}>
                                    {vet.experienceYears || 0} years exp.
                                </Badge>
                            </HStack>
                        </VStack>

                        {/* Action Buttons */}
                        <HStack spacing={2}>
                            <IconButton
                                icon={<EditIcon />}
                                onClick={onOpen}
                                colorScheme='blue'
                                aria-label="Edit veterinarian"
                            />
                        </HStack>
                    </Flex>

                    {/* Bio Section */}
                    {vet.bio && (
                        <Box mt={3}>
                            <Text fontSize='sm' fontWeight='semibold' color={textColor} mb={1}>
                                About:
                            </Text>
                            <Text fontSize='sm' color='gray.600' noOfLines={3}>
                                {vet.bio}
                            </Text>
                        </Box>
                    )}
                </VStack>
            </Flex>

            {/* Edit Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Veterinarian</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Speciality'
                                name='speciality'
                                value={updatedVet.speciality}
                                onChange={(e) =>
                                    setUpdatedVet({ ...updatedVet, speciality: e.target.value })
                                }
                            />
                            <Input
                                placeholder='Experience Years'
                                name='experienceYears'
                                type='number'
                                value={updatedVet.experienceYears}
                                onChange={(e) =>
                                    setUpdatedVet({ ...updatedVet, experienceYears: Number(e.target.value) })
                                }
                            />
                            <Textarea
                                placeholder='Bio'
                                name='bio'
                                value={updatedVet.bio}
                                onChange={(e) =>
                                    setUpdatedVet({ ...updatedVet, bio: e.target.value })
                                }
                                rows={4}
                            />
                            <Input
                                placeholder='Profile Picture URL'
                                name='profilePicture'
                                value={updatedVet.profilePicture}
                                onChange={(e) =>
                                    setUpdatedVet({ ...updatedVet, profilePicture: e.target.value })
                                }
                            />
                            <Input
                                placeholder='Phone Number'
                                name='phoneNumber'
                                value={updatedVet.phoneNumber}
                                onChange={(e) =>
                                    setUpdatedVet({ ...updatedVet, phoneNumber: e.target.value })
                                }
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateVet(vet._id, updatedVet)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default VetCard;