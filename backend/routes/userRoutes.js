import express from "express";
import { 
    registerUser, 
    loginUser,
    getUserProfile,
    getCustomerProfile,
    updateCustomerProfile
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

// Profile routes
router.get("/profile/:userId", getUserProfile);
router.get("/customer/:userId", getCustomerProfile);
router.patch("/customer/:userId", updateCustomerProfile);

export default router;


