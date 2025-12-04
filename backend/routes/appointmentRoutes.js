import express from "express";
import {
    createAppointment,
    getAppointments,
    cancelAppointment,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ---------------------------
// CREATE APPOINTMENT
// ---------------------------
router.post("/", protect, createAppointment);

// ---------------------------
// GET ALL APPOINTMENTS FOR SPECIFIC USER
// /api/appointments/user/:userId
// ---------------------------
router.get("/user/:userId", protect, getAppointments);

// ---------------------------
// CANCEL APPOINTMENT
// /api/appointments/:id/cancel
// ---------------------------
router.put("/cancel", protect, cancelAppointment);

export default router;
