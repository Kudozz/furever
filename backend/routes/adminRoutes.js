// routes/adminRoutes.js
import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// GET all customers (including banned)
router.get("/customers", async (req, res) => {
  try {
    const customers = await User.find({ role: "user" });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// BAN or UNBAN customer
router.patch("/customers/:id/ban", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Customer not found" });

    user.banned = !user.banned; // toggle banned
    await user.save();

    res.json({ message: `Customer ${user.banned ? "banned" : "unbanned"} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
