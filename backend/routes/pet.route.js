import express from "express";
const router = express.Router();

import { deletePet, updatePet, addPet, getPets } from '../controllers/pet.controller.js';

//get is to see products (view)
router.get("/", getPets);

//post is to create a new product
router.post("/", addPet);

//patch is to update some fields, put is to update all fields
router.put("/:id", updatePet);

//deletion
router.delete("/:id", deletePet);


export default router;



