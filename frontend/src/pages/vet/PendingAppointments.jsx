import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/vet/VetSidebar";
import bgImage from "../../assets/background.png";

const PendingAppointments = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [notes, setNotes] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get vetId from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const vetId = user?.vetId;

  // Fetch pending (approved) appointments
  const fetchAppointments = async () => {
    if (!vetId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/pending/${vetId}`);
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error fetching appointments",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [vetId]);

  // Open modal to add notes
  const openNotesModal = (appt) => {
    setSelectedAppt(appt);
    setNotes(appt.notes || "");
    onOpen();
  };

  // Save notes and mark appointment as done
  const saveNotesAndComplete = async () => {
    if (!notes.trim()) {
      toast({
        title: "Notes cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // 1. Save notes
      await fetch(`http://localhost:5000/api/appointments/${selectedAppt._id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      // 2. Mark as done
      await fetch(`http://localhost:5000/api/appointments/${selectedAppt._id}/done`, {
        method: "PATCH",
      });

      toast({
        title: "Appointment marked as done",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Refresh the list
      fetchAppointments();

      onClose();
      setNotes("");

      // Optional: navigate to past appointments
      // navigate("/appointments/past");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error completing appointment",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
      <Sidebar />
      <Box ml="230px" p={6} maxH="100vh" overflowY="auto">
        <Heading mb={6} color="#e8e8e8ff">
          Pending / Upcoming Appointments
        </Heading>

        {appointments.length === 0 ? (
          <Text color="#dadadaff">No pending appointments</Text>
        ) : (
          <SimpleGrid columns={[1, 2]} spacing={6}>
            {appointments.map((appt) => {
              const dateObj = new Date(appt.timeslot);
              const dateStr = dateObj.toISOString().split("T")[0];
              const timeStr = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

              return (
                <Box
                  key={appt._id}
                  bg="rgba(255,255,255,0.9)"
                  borderRadius="18px"
                  p={6}
                  boxShadow="lg"
                >
                  <Heading fontSize="lg" mb={2} color="#3a2f2f">
                    {appt.petName}
                  </Heading>
                  <Text color="#555">Breed: {appt.breed || "N/A"}</Text>
                  <Text color="#555">Age: {appt.age || "N/A"}</Text>
                  <Text mt={2} color="#555">
                    Date: {dateStr} | Time: {timeStr}
                  </Text>
                  <Text mt={2} color="#555">
                    Reason: {appt.reason || "N/A"}
                  </Text>
                  {appt.medicalHistory && (
                    <Text mt={2} mb={4} color="#555" fontSize="sm">
                      Medical History: {appt.medicalHistory}
                    </Text>
                  )}

                  <Button
                    mt={4}
                    bg="#c09a7f"
                    color="white"
                    _hover={{ bg: "#977053ff" }}
                    onClick={() => openNotesModal(appt)}
                  >
                    Add Notes & Mark Done
                  </Button>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Box>

      {/* NOTES POP-UP */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#FFFEF6" borderRadius="18px">
          <ModalHeader color="#3a2f2f">Add Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Write notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              bg="white"
              borderRadius="12px"
              border="1px solid #c09a7f"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#c09a7f"
              color="white"
              mr={3}
              _hover={{ bg: "#977053ff" }}
              onClick={saveNotesAndComplete}
            >
              Save + Mark Done
            </Button>
            <Button onClick={onClose} color="#3a2f2f">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PendingAppointments;
