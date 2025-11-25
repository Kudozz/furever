import express from "express";
const router = express.Router();

import { createVet, getVets, getVetById } from '../controllers/vetController.js';


//post is to create a new product
router.post("/", createVet);

//get is to see products (view)
router.get("/", getVets);

router.get("/:id", getVetById);

export default router;



