import { Container, SimpleGrid, Text, VStack, Input, Select, HStack, Button, Collapse, Box } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { usePetInventory } from "./../../store/pet.js";
import PetCard from "../components/PetCard.jsx";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const ViewAdoptedPets = () => {
	const { fetchAdoptedPets } = usePetInventory();
	const [adoptedPets, setAdoptedPets] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("none");
	const [isFilterOpen, setIsFilterOpen] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadAdoptedPets = async () => {
			const user = JSON.parse(localStorage.getItem("user"));

			if (!user || !user._id) {
				setLoading(false);
				return;
			}

			const result = await fetchAdoptedPets(user._id);
			if (result.success) {
				setAdoptedPets(result.data);
			}
			setLoading(false);
		};

		loadAdoptedPets();
	}, [fetchAdoptedPets]);

	// Filter and sort pets
	const filteredAndSortedPets = useMemo(() => {
		let result = [...adoptedPets];

		// Search filtering (case-insensitive, across name, breed)
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(pet =>
				pet.name.toLowerCase().includes(query) ||
				pet.breed.toLowerCase().includes(query)
			);
		}

		// Sorting
		switch (sortBy) {
			case "name-asc":
				result.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "name-desc":
				result.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case "breed-asc":
				result.sort((a, b) => a.breed.localeCompare(b.breed));
				break;
			case "breed-desc":
				result.sort((a, b) => b.breed.localeCompare(a.breed));
				break;
			case "age-asc":
				result.sort((a, b) => a.age - b.age);
				break;
			case "age-desc":
				result.sort((a, b) => b.age - a.age);
				break;
			case "date-newest":
				result.sort((a, b) => new Date(b.adoptionInfo?.adoptionDate) - new Date(a.adoptionInfo?.adoptionDate));
				break;
			case "date-oldest":
				result.sort((a, b) => new Date(a.adoptionInfo?.adoptionDate) - new Date(b.adoptionInfo?.adoptionDate));
				break;
			default:
				// No sorting
				break;
		}

		return result;
	}, [adoptedPets, searchQuery, sortBy]);

	if (loading) {
		return (
			<Container maxW='container.xl' py={3}>
				<Text fontSize='xl' textAlign={"center"}>
					Loading...
				</Text>
			</Container>
		);
	}

	const user = JSON.parse(localStorage.getItem("user"));
	if (!user || !user._id) {
		return (
			<Container maxW='container.xl' py={3}>
				<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
					Please log in to view your adopted pets.
				</Text>
			</Container>
		);
	}

	return (
		<Container maxW='container.xl' py={3}>
			<Text
				fontSize={"60"}
				fontWeight={"bold"}
				bgGradient={"linear(to-r, #b89f7e, #a57d49ff)"}
				bgClip={"text"}
				textAlign={"center"}
				mb={10}
			>
				My Adopted Pets
			</Text>

			<VStack spacing={10}>
				{/* Collapsible Filter Section */}
				<Box w="full" mb={5}>
					<Button
						color="rgba(255,255,255,0.9"
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						rightIcon={isFilterOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
						mb={6}
						w="full"
					>
						{isFilterOpen ? "Hide" : "Show"} Search & Sort
					</Button>

					<Collapse in={isFilterOpen} animateOpacity>
						<VStack spacing={4} p={4} bg="gray.50" borderRadius="md" my={4}>
							<HStack w="full" spacing={4}>
								<Input
									placeholder="Search by name or breed..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									bg="white"
								/>
								<Select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									bg="white"
									minW="200px"
								>
									<option value="none">No sorting</option>
									<option value="name-asc">Name (A-Z)</option>
									<option value="name-desc">Name (Z-A)</option>
									<option value="breed-asc">Breed (A-Z)</option>
									<option value="breed-desc">Breed (Z-A)</option>
									<option value="age-asc">Age (Youngest)</option>
									<option value="age-desc">Age (Oldest)</option>
									<option value="date-newest">Recently Adopted</option>
									<option value="date-oldest">Oldest Adoption</option>
								</Select>
							</HStack>
						</VStack>
					</Collapse>
				</Box>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{filteredAndSortedPets.map((pet) => (
						<PetCard key={pet._id} pet={pet} />
					))}
				</SimpleGrid>

				{filteredAndSortedPets.length === 0 && adoptedPets.length > 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No pets match your search criteria.
					</Text>
				)}

				{adoptedPets.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						You haven't adopted any pets yet.
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default ViewAdoptedPets;
