import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/pet.route.js";

dotenv.config();

const app = express(); //creating app
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept json data in the req.body

app.use("/api/pets", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));    
    })
}

console.log(process.env.MONGO_URI); //connect database

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at localhost:' + PORT);
});

app.get("/", (req, res) => {
    res.send("API is running...");
});

//t4wcwBZkaD60S2ek
//mongosh "mongodb+srv://cluster0.k2thfll.mongodb.net/" --apiVersion 1 --username hanaasajid_db_user --password t4wcwBZkaD60S2ek