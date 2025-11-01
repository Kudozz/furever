import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching products", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createProduct =async (req, res)=> {
    //res.send("Server is ready123");
    const product = req.body; //user will send this data
    
    if(!product.name || !product.price || !product.image) { //one field is empty
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch(error) {
        console.error("Error in creation of product", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
};

export const updateProduct = async(req, res)=> {
    const {id}= req.params; 
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, messsage: "Invalid product id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success: true, data: updatedProduct});
    }catch(error) {
        res.status(500).json({success: false, message: "Servere rror"});
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, messsage: "Invalid product id" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};