import Pet from "../models/pet.model.js";
import mongoose from "mongoose";

export const getPets = async (req, res) => {
    try {
        const pets = await Pet.find({});
        res.status(200).json({ success: true, data: pets });
    } catch (error) {
        console.log("error in fetching pets", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const addPet = async (req, res) => {
    //res.send("Server is ready123");
    const pet = req.body; //user will send this data

    if (!pet.name || !pet.breed || !pet.age || !pet.status || !pet.image) { //one field is empty
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newPet = new Pet(pet);
    newPet.status = "available";

    try {
        await newPet.save();
    
        res.status(201).json({ success: true, data: newPet });
    } catch (error) {
        console.error("Error in creation of pet", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updatePet = async (req, res) => {
    const { id } = req.params;
    const pet = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, messsage: "Invalid pet id" });
    }

    try {
        const updatedPet = await Pet.findByIdAndUpdate(id, pet, { new: true });
        res.status(200).json({ success: true, data: updatedPet });
    } catch (error) {
        res.status(500).json({ success: false, message: "Servere rror" });
    }
};

export const deletePet = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, messsage: "Invalid pet id" });
    }

    try {
        await Pet.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const adoptPet = async (req, res) => {
    const { id } = req.params;
    const { userId, phone, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid pet id" });
    }

    if (!userId || !phone || !address) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    try {
        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        if (pet.status.toLowerCase() !== "available") {
            return res.status(400).json({ success: false, message: "Pet is not available for adoption" });
        }

        const updatedPet = await Pet.findByIdAndUpdate(
            id,
            {
                status: "Adopted",
                adoptedBy: userId,
                adoptionInfo: {
                    phone,
                    address,
                    adoptionDate: new Date()
                }
            },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedPet, message: "Pet adopted successfully!" });
    } catch (error) {
        console.error("Error in pet adoption", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getAdoptedPets = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }

    try {
        const adoptedPets = await Pet.find({ adoptedBy: userId });
        res.status(200).json({ success: true, data: adoptedPets });
    } catch (error) {
        console.error("Error in fetching adopted pets", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};