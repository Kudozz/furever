import express from "express";
const router = express.Router();

import {deleteProduct, updateProduct, createProduct, getProducts} from '../controllers/product.controller.js';

//get is to see products (view)
router.get("/", getProducts);

//post is to create a new product
router.post("/", createProduct);

//patch is to update some fields, put is to update all fields
router.put("/:id", updateProduct);

//deletion
router.delete("/:id", deleteProduct);


export default router;



