import React, { useEffect, useState } from "react";
import { Box, VStack, Text, Badge, HStack, Heading, Button, Spinner, Center, Input, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import bgImage from "../../assets/background.png";

const statusColors = {
  scheduled: "orange",
  pending: "orange",
  approved: "green",
  rejected: "red",
  canceled: "gray",
};

const ModifyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ date: "", time: "", reason: "" });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?._id;

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/appointments/${userId}`);
      setAppointments(res.data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleEditClick = (appt) => {
    setEditingId(appt._id);
    setForm({ date: appt.date, time: appt.time, reason: appt.reason });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`/api/appointments/${id}`, form);
      toast({ title: "Updated!", description: "Appointment updated", status: "success", isClosable: true });
      setEditingId(null);
      fetchAppointments();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to update", status: "error", isClosable: true });
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`/api/appointments/cancel/${id}`);
      toast({ title: "Canceled", description: "Appointment canceled", status: "info", isClosable: true });
      fetchAppointments();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to cancel", status: "error", isClosable: true });
    }
  };

  if (loading) return <Center mt={20}><Spinner size="xl" /></Center>;
  if (appointments.length === 0) return <Center mt={20}><Text>No appointments found 😿</Text></Center>;

  return (
    <Box p={6} bgImage={`url(${bgImage})`} bgSize="cover" minH="100vh">
      <VStack spacing={6} mt={10} maxW="800px" mx="auto">
        <Heading size="2xl" textAlign="center" mb={6} color="white">Modify Appointments</Heading>

        {appointments.map((appt) => (
          <Box key={appt._id} w="full" p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
            <HStack justifyContent="space-between" mb={3}>
              <Text fontWeight="bold" fontSize="lg">{appt.petName}</Text>
              <Badge colorScheme={statusColors[appt.status] || "gray"} fontSize="sm">{appt.status}</Badge>
            </HStack>

            <VStack align="start" spacing={2}>
              {editingId === appt._id ? (
                <>
                  <Input name="date" type="date" value={form.date} onChange={handleChange} />
                  <Input name="time" type="time" value={form.time} onChange={handleChange} step={600} />
                  <Textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Reason" />
                  <HStack spacing={3}>
                    <Button size="sm" colorScheme="green" onClick={() => handleSave(appt._id)}>Save</Button>
                    <Button size="sm" colorScheme="gray" onClick={() => setEditingId(null)}>Cancel</Button>
                  </HStack>
                </>
              ) : (
                <>
                  <Text><strong>Date:</strong> {appt.date}</Text>
                  <Text><strong>Time:</strong> {appt.time}</Text>
                  <Text><strong>Reason:</strong> {appt.reason}</Text>
                  <HStack spacing={3}>
                    {appt.status !== "canceled" && <Button size="sm" colorScheme="orange" onClick={() => handleEditClick(appt)}>Edit</Button>}
                    {appt.status !== "canceled" && <Button size="sm" colorScheme="red" onClick={() => handleCancel(appt._id)}>Cancel</Button>}
                  </HStack>
                </>
              )}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ModifyAppointments;
