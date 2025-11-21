import mongoose from "mongoose";

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

export default mongoose.model("Vet", vetSchema);