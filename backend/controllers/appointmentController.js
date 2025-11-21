import Appointment from "../models/appointmentModel.js";

// CREATE APPOINTMENT
export const createAppointment = async (req, res) => {
    try {
        const { user, petName, date, time, reason } = req.body;

        const appointment = await Appointment.create({
            user,
            petName,
            date,
            time,
            reason,
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET APPOINTMENTS FOR USER
export const getAppointments = async (req, res) => {
    try {
        const { userId } = req.params;

        const appointments = await Appointment.find({ user: userId });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CANCEL APPOINTMENT
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appt = await Appointment.findById(id);
        if (!appt) return res.status(404).json({ message: "Not found" });

        appt.status = "canceled";
        await appt.save();

        res.json({ message: "Appointment canceled" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
