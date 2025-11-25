import express from "express";
import multer from "multer";
import {
  createAppointment,
  getUserAppointments,
  getVetAppointments,
  cancelAppointment,
  vetDecision,
  markAppointmentDone,
  getAvailableVets
} from "../controllers/vetAppointmentController.js";

import Appointment from "../models/appointmentModel.js";
import Pet from "../models/pet.model.js";

const router = express.Router();

// Multer config for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // store in uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Search available vets
router.post("/available", getAvailableVets);

// Create appointment (with optional file)
router.post("/", upload.single("medicalHistory"), createAppointment);

// Get appointments
router.get("/user/:userId", getUserAppointments);
router.get("/vet/:vetId", getVetAppointments);

// Cancel appointment
router.put("/cancel/:id", cancelAppointment);

// Vet decision (accept/reject)
router.patch("/:id/decision", vetDecision);

// Add notes to appointment
router.post("/:id/notes", async (req, res) => {
  try {
    const { notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.notes = notes;
    await appointment.save();

    res.status(200).json({ appointment, message: "Notes added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding notes" });
  }
});

// Mark appointment done
router.patch("/:id/done", markAppointmentDone);

// Waiting appointments for vet
router.get("/waiting/:vetId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      vet: req.params.vetId,
      status: "Pending",
    }).lean();

    const appointmentsWithPet = await Promise.all(
      appointments.map(async (appt) => {
        const pet = await Pet.findById(appt.petId).select("breed age image");
        return { ...appt, breed: pet?.breed || "", age: pet?.age || "", image: pet?.image || "" };
      })
    );

    res.status(200).json(appointmentsWithPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching waiting appointments" });
  }
});

// Pending appointments for vet
router.get("/pending/:vetId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      vet: req.params.vetId,
      status: "Approved",
    }).lean();

    const appointmentsWithPet = await Promise.all(
      appointments.map(async (appt) => {
        const pet = await Pet.findById(appt.petId).select("breed age image");
        return { ...appt, breed: pet?.breed || "", age: pet?.age || "", image: pet?.image || "" };
      })
    );

    res.status(200).json(appointmentsWithPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching pending appointments" });
  }
});

// Past appointments for vet
router.get("/past/:vetId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      vet: req.params.vetId,
      status: "Done",
    }).lean();

    const appointmentsWithPet = await Promise.all(
      appointments.map(async (appt) => {
        const pet = await Pet.findById(appt.petId).select("breed age image");
        return { ...appt, breed: pet?.breed || "", age: pet?.age || "", image: pet?.image || "" };
      })
    );

    res.status(200).json(appointmentsWithPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching past appointments" });
  }
});

export default router;
