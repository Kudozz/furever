import Appointment from "../models/appointmentModel.js";
import Notification from "../models/notificationModel.js";
import Vet from "../models/vetModel.js";
import Pet from "../models/petModel.js";

// 1. Search available vets for a timeslot
export const getAvailableVets = async (req, res) => {
  try {
    const { timeslot } = req.body;

    const bookedVets = await Appointment.find({ timeslot }).select("vet");
    const availableVets = await Vet.find({ _id: { $nin: bookedVets.map(b => b.vet) } });

    res.json(availableVets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching available vets" });
  }
};

// 2. Create appointment
export const createAppointment = async (req, res) => {
  try {
    const { user, vet, petId, petName, timeslot, reason, medicalHistory } = req.body;

    const appointment = await Appointment.create({
      user,
      vet,
      petId,
      petName,
      timeslot,
      reason,
      medicalHistory,
      status: "Pending",
    });

    // Notify vet
    await Notification.create({
      receiverId: vet,
      message: `New appointment request from user ${user} for ${petName}`,
      type: "appointment",
      appointmentId: appointment._id,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating appointment" });
  }
};

// 3. Get appointments for a user
export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.params.userId });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// 4. Get appointments for a vet
export const getVetAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ vet: req.params.vetId });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// 5. Get pending appointments for a vet (with pet details)
export const getPendingAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      vet: req.params.vetId,
      status: "Pending",
    }).lean();

    const appointmentsWithPet = await Promise.all(
      appointments.map(async (appt) => {
        const pet = await Pet.findById(appt.petId).select("breed age image");
        return {
          ...appt,
          breed: pet?.breed || "",
          age: pet?.age || "",
          image: pet?.image || "",
        };
      })
    );

    res.json(appointmentsWithPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching pending appointments" });
  }
};

// 6. Get past appointments for a vet (with pet details)
export const getPastAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      vet: req.params.vetId,
      status: "Done",
    }).lean();

    const appointmentsWithPet = await Promise.all(
      appointments.map(async (appt) => {
        const pet = await Pet.findById(appt.petId).select("breed age image");
        return {
          ...appt,
          breed: pet?.breed || "",
          age: pet?.age || "",
          image: pet?.image || "",
        };
      })
    );

    res.json(appointmentsWithPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching past appointments" });
  }
};

// 7. Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "Canceled";
    await appointment.save();

    // Notify vet
    await Notification.create({
      receiverId: appointment.vet,
      message: `Appointment for ${appointment.petName} has been canceled by user`,
      type: "appointment",
      appointmentId: appointment._id,
    });

    res.json({ message: "Appointment canceled", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error canceling appointment" });
  }
};

// 8. Vet accept/reject appointment
export const vetDecision = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    // Notify user
    await Notification.create({
      receiverId: appointment.user,
      message: `Your appointment for ${appointment.petName} has been ${status} by the vet`,
      type: "appointment",
      appointmentId: appointment._id,
    });

    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating appointment status" });
  }
};

// 9. Add notes to appointment
export const addNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.notes = notes;
    await appointment.save();

    await Notification.create({
      receiverId: appointment.user,
      message: `Vet has added notes to your appointment for ${appointment.petName}`,
      type: "appointment",
      appointmentId: appointment._id,
    });
    
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding notes" });
  }
};

// 10. Mark appointment done (requires notes)
export const markAppointmentDone = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (!appointment.notes || appointment.notes.trim() === "") {
      return res.status(400).json({ message: "Cannot mark done without notes" });
    }

    appointment.status = "Done";
    await appointment.save();

    // Notify user
    await Notification.create({
      receiverId: appointment.user,
      message: `Your appointment for ${appointment.petName} has been completed`,
      type: "appointment",
      appointmentId: appointment._id,
    });

    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking appointment done" });
  }
};
