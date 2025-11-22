//appointmnetroutes.js
import express from "express";
import {
  createAppointment,
  getUserAppointments,
  getVetAppointments,
  cancelAppointment,
  vetDecision,
  markAppointmentDone,
  getAvailableVets
} from "../controllers/appointmentController.js";

import Appointment from "../models/appointmentModel.js";
import Pet from "../models/petModel.js";

const router = express.Router();

// Search available vets
router.post("/available", getAvailableVets);

// Create appointment
router.post("/", createAppointment);

// Get appointments
router.get("/user/:userId", getUserAppointments);
router.get("/vet/:vetId", getVetAppointments);

// Cancel appointment (user cancels → popup only)
router.put("/cancel/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "Canceled";
    await appointment.save();

    // Send popup message
    res.status(200).json({ appointment, message: "Appointment canceled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error canceling appointment" });
  }
});

// Vet decision (accept/reject) → notification still needed
router.patch("/:id/decision", vetDecision);

// Add notes (vet adds → popup only)
router.post("/:id/notes", async (req, res) => {
  try {
    const { notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.notes = notes;
    await appointment.save();

    // Send popup message
    res.status(200).json({ appointment, message: "Notes added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding notes" });
  }
});

// Mark appointment done (requires notes) → popup only
router.patch("/:id/done", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (!appointment.notes || appointment.notes.trim() === "") {
      return res.status(400).json({ message: "Cannot mark done without notes" });
    }

    appointment.status = "Done";
    await appointment.save();

    // Send popup message
    res.status(200).json({ appointment, message: "Appointment marked as done successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking appointment done" });
  }
});

// Get pending appointments for a vet with pet details
router.get("/pending/:vetId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      vet: req.params.vetId,
      status: "Pending",
    }).lean(); 

    const appointmentsWithPet = await Promise.all(
      appointments.map(async (appt) => {
        const pet = await Pet.findOne({ name: appt.petName }).select("breed age image");
        return {
          ...appt,
          breed: pet?.breed || "",
          age: pet?.age || "",
          image: pet?.image || "",
        };
      })
    );

    res.status(200).json(appointmentsWithPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching pending appointments" });
  }
});

// Get past appointments for a vet with pet details
router.get("/past/:vetId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      vet: req.params.vetId,
      status: "Done",
    }).lean();

    const appointmentsWithPet = await Promise.all(
      appointments.map(async (appt) => {
        const pet = await Pet.findOne({ name: appt.petName }).select("breed age image");
        return {
          ...appt,
          breed: pet?.breed || "",
          age: pet?.age || "",
          image: pet?.image || "",
        };
      })
    );

    res.status(200).json(appointmentsWithPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching past appointments" });
  }
});

export default router;
