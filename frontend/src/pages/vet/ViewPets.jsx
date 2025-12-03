import { Container, SimpleGrid, Text, VStack, Input, Select, HStack, Button, Collapse, Box } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePetInventory } from "../../../store/pet";
import VetPetCard from "../../components/VetPetCard";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import bgImage from "../../assets/background.png";

const VetViewPets = () => {
	const { fetchPets, pets } = usePetInventory();
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("none");
	const [isFilterOpen, setIsFilterOpen] = useState(true);

	useEffect(() => {
		fetchPets();
	}, [fetchPets]);

	// Filter and sort pets
	const filteredAndSortedPets = useMemo(() => {
		let result = [...pets];

		// Search filtering (case-insensitive, across name, breed, and status)
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(pet =>
				pet.name.toLowerCase().includes(query) ||
				pet.breed.toLowerCase().includes(query) ||
				pet.status.toLowerCase().includes(query)
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
			default:
				// No sorting
				break;
		}

		return result;
	}, [pets, searchQuery, sortBy]);

	console.log("pets", pets);

	return (
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
		<Container maxW='container.xl' py={3} >
			<Text
				fontSize={"60"}
				fontWeight={"bold"}
				bgGradient={"linear(to-r, #b89f7e, #a57d49ff)"}
				bgClip={"text"}
				textAlign={"center"}
				mb={10}
			>
				Pets
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
									placeholder="Search by name, breed, or status..."
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
						<VetPetCard key={pet._id} pet={pet} />
					))}
				</SimpleGrid>

				{filteredAndSortedPets.length === 0 && pets.length > 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No pets match your search criteria.
					</Text>
				)}

				{pets.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No pets found!{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Add a pet
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
		</Box>
	);
};

export default VetViewPets;