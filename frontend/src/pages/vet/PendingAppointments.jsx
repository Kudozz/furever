// src/pages/vet/PendingAppointments.jsx
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
import Sidebar from "../../components/Sidebar";

const PendingAppointments = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [notes, setNotes] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch pending appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/appointments/pending");
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
    fetchAppointments();
  }, [toast]);

  // OPEN MODAL
  const openNotesModal = (appt) => {
    setSelectedAppt(appt);
    setNotes(appt.notes || "");
    onOpen();
  };

  // SAVE NOTES + MARK DONE
  const saveNotesAndComplete = async () => {
    if (!notes.trim()) {
      toast({
        title: "Notes cannot be empty",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      // 1. SAVE NOTES
      await fetch(`http://localhost:3000/api/appointments/${selectedAppt._id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      // 2. MARK AS DONE
      await fetch(`http://localhost:3000/api/appointments/${selectedAppt._id}/done`, {
        method: "PUT",
      });

      toast({
        title: "Appointment marked as done",
        status: "success",
        duration: 3000,
      });

      // Remove from pending list
      setAppointments((prev) =>
        prev.filter((a) => a._id !== selectedAppt._id)
      );

      onClose();

      // Move to past appointments page
      navigate("/appointments/past");

    } catch (err) {
      console.error(err);
      toast({
        title: "Error completing appointment",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box bg="url('/background.png')" bgSize="cover" minH="100vh">
      <Sidebar />

      <Box ml="230px" p={6} maxH="100vh" overflowY="auto">
        <Heading mb={6} color="#3a2f2f">
          Pending / Upcoming Appointments
        </Heading>

        {appointments.length === 0 ? (
          <Text color="#555">No pending appointments</Text>
        ) : (
          <SimpleGrid columns={[1, 2]} spacing={6}>
            {appointments.map((appt) => (
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

                <Text color="#555">Breed: {appt.breed}</Text>
                <Text color="#555">Age: {appt.age}</Text>

                <Text mt={2} color="#555">
                  Date: {appt.date} | Time: {appt.time}
                </Text>
                <Text mt={2} mb={4} color="#555">
                  Reason: {appt.reason}
                </Text>

                <Button
                  mr={2}
                  bg="#c09a7f"
                  color="white"
                  _hover={{ bg: "#a57e63" }}
                  onClick={() => openNotesModal(appt)}
                >
                  Add Notes
                </Button>
              </Box>
            ))}
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
              _hover={{ bg: "#a57e63" }}
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


// SAVE NOTES + MARK DONE
const saveNotesAndComplete = async () => {
  if (!notes.trim()) {
    toast({
      title: "Notes cannot be empty",
      status: "error",
      duration: 3000,
    });
    return;
  }

  try {
    // 1. SAVE NOTES AND LOG NOTIFICATION
    const notesRes = await fetch(`http://localhost:3000/api/appointments/${selectedAppt._id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    const notesData = await notesRes.json();

    // 2. MARK AS DONE AND LOG NOTIFICATION
    const doneRes = await fetch(`http://localhost:3000/api/appointments/${selectedAppt._id}/done`, {
      method: "PATCH", // backend uses PATCH for marking done
    });
    const doneData = await doneRes.json();

    // Show toast messages from backend
    toast({
      title: doneData.message || "Appointment marked as done",
      status: "success",
      duration: 3000,
    });

    // Remove from pending list in UI
    setAppointments((prev) => prev.filter((a) => a._id !== selectedAppt._id));

    onClose();

    // Navigate to past appointments
    navigate("/appointments/past");

  } catch (err) {
    console.error(err);
    toast({
      title: "Error completing appointment",
      status: "error",
      duration: 3000,
    });
  }
};


export default PendingAppointments;
