// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/pet.route.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import vetRoutes from "./routes/vetRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();



// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();

// Middleware
app.use(
    cors({
        origin: process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/pets", productRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/vets", vetRoutes);
app.use(express.json());


// Production: Serve React frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Development: Root route
if (process.env.NODE_ENV !== "production") {
    app.get("/", (req, res) => {
        res.send("🐾 Pet Care API with Authentication is running...");
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🗄️  Database: ${process.env.MONGO_URI ? "Connected" : "Not configured"}`);
});