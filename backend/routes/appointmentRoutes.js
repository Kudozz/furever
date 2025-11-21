import express from "express";
import multer from "multer";
import Appointment from "../models/appointmentModel.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create appointment
router.post("/", upload.single("medicalHistory"), async (req, res) => {
  try {
    const { user, petName, date, time, reason } = req.body;

    const appointment = new Appointment({
      user,
      petName,
      date,
      time,
      reason,
      medicalHistory: req.file?.filename,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked!", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// Get ALL appointments for a user
router.get("/:userId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.params.userId,
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Approve / Reject appointment
router.patch("/:id/status", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Status update failed" });
  }
});

// PATCH /api/appointments/:id
router.patch("/:id", upload.single("medicalHistory"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.medicalHistory = req.file.filename;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update appointment" });
  }
});

// CANCEL appointment
router.put("/cancel/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status: "canceled" });
    res.json({ message: "Appointment canceled" });
  } catch (err) {
    res.status(500).json({ message: "Error canceling appointment" });
  }
});
export default router;
