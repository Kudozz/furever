import mongoose from "mongoose";
import User from "./userModel.js";

const vetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // one profile per vet
    },
    speciality: { type: String },
    experienceYears: { type: Number },
    bio: { type: String },
    profilePicture: { type: String },
    phoneNumber: { type: String },
}, {
    timestamps: true,
});

const Vet= mongoose.model("Vet", vetSchema)
export default Vet;