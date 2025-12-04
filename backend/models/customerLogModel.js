import mongoose from "mongoose";

const customerLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },
    action: {
        type: String,
        enum: ["created", "updated", "cancelled"],
        default: "created",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: String,
    },
});

const customerLog = mongoose.model('customerLog', customerLogSchema);
export default customerLog;
