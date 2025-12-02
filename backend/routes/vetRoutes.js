import express from "express";
const router = express.Router();

import { createVet, getVets, getVetById, searchVetsByName, deactivateVet } from '../controllers/vetController.js';


//post is to create a new product
router.post("/", createVet);

//get is to see products (view)
router.get("/", getVets);

// Search vets by name
router.get("/search/by-name", searchVetsByName);

router.get("/:id", getVetById);

// Deactivate a vet
router.put("/deactivate/:vetId", deactivateVet);

export default router;



