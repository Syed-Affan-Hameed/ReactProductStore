import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

// Get All Products Endpoint
router.get("/", getAllProducts);
// Add Product Endpoint
router.post("/add-product", addProduct);

// Update Product Endpoint
router.put("/update-product/:id", updateProduct);

// Delete Product Endpoint
router.delete("/delete-product/:id", deleteProduct);

export default router;
