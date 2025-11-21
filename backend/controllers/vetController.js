import Vet from "../models/vetModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createVet = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: "vet"
        });

        // 3️⃣ Create Vet profile linked to User
        const vet = new Vet({
            ...req.body,   // everything frontend sent
            user: user._id // attach the newly created User ID
        });

        await vet.save();

        res.status(201).json({ success: true, data: vet, message: "Vet created successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getVets = async (req, res) => {
    try {
        const vets = await Vet.find().populate("user", "name email"); // <-- populate user
        res.status(200).json({ success: true, data: vets });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

