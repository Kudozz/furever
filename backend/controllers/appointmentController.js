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



// import Appointment from "../models/appointmentModel.js";
// import customerLog from "../models/customerLogModel.js";
// // CREATE APPOINTMENT
// export const createAppointment = async (req, res) => {
//   try {
//     const { user, petName, date, time, reason } = req.body;

//     const appointment = await Appointment.create({
//       user,
//       petName,
//       date,
//       time,
//       reason,
//     });

//     try {
//       await customerLog.create({
//         user: req.user.id,
//         appointment: appointment._id,
//         action: "created",
//         details: `Appointment for ${appointment.petName} on ${appointment.date} at ${appointment.time}`
//       });

//       console.log("logged");
//     } catch (err) {
//       console.error("Failed to log customer activity:", err.message);
//     }


//     res.status(201).json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET APPOINTMENTS FOR USER
// export const getAppointments = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const appointments = await Appointment.find({ user: userId });

//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // CANCEL APPOINTMENT
// export const cancelAppointment = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const appt = await Appointment.findById(id);
//     if (!appt) return res.status(404).json({ message: "Not found" });

//     appt.status = "canceled";
//     await appt.save();

//     await customerLog.create({
//       user: req.user.id,
//       appointment: appt._id,
//       action: "cancelled",                // matches enum
//       details: `Cancelled by user. Reason: ${req.body.reason || "User cancelled"}`
//     });


//     res.json({ message: "Appointment canceled" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };