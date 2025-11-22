import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vet: { type: mongoose.Schema.Types.ObjectId, ref: "Vet", required: true },
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    petName: { type: String, required: true },
    timeslot: { type: Date, required: true }, // combine date + time
    reason: { type: String },
    medicalHistory: { type: String }, // file path
    notes: { type: String }, // vet notes after done
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Canceled", "Done"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
