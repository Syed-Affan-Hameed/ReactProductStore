import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getAllProducts = async (req, res) => {
  try {
    let allProducts = await Product.find({});
    if (allProducts.length > 0) {
      res.status(200).json({ isSuccess: true, products: allProducts });
    } else {
      res.status(200).json({ isSuccess: true, message: "No Products to display!" });
    }
  } catch (error) {
    console.error("Error while getting all products:", error); // Log the error
    res.status(500).json({ isSuccess: false, message: "Error while getting all products" });
  }
};


export const addProduct = async (req, res) => {
  // Request Body : Product Details sent  by the user
  let requestBodyFromUser = req.body;
  if (
    requestBodyFromUser.name == null ||
    requestBodyFromUser.price == null ||
    requestBodyFromUser.imageUrl == null
  ) {
    res
      .status(400)
      .json({ success: false, message: "one or more values are null" });
  }
  let newProduct = new Product(requestBodyFromUser);

  try {
    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error while adding a product", error.message);
    res
      .status(500)
      .json({ success: false, message: "Product added successfully" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id) == false) {
    res.status(404).json({
      isSuccess: false,
      message: "Object Id in the parameter is not valid.",
    });
  }
  const UpdatedProductDetails = req.body;
  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      id,
      UpdatedProductDetails,
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).json({
        isSuccess: true,
        message: `Product has been updated`,
        updatedProduct: updatedProduct
      });
    } else {
      res.status(404).json({
        isSuccess: false,
        message: `Product with Id: ${id} not found`,
        updatedProduct: null
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ isSuccess: false, message: "Error while updating the product" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Check if the Object ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      // Use 400 for bad request
      isSuccess: false,
      message: "Object Id in the parameter is not valid.",
    });
  }

  console.log(`Delete Product with id: ${id}`);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        isSuccess: false,
        message: `Product with id ${id} not found.`,
      });
    }

    return res.status(200).json({
      isSuccess: true,
      message: `Product with id ${id} has been deleted.`,
    });
  } catch (error) {
    console.error("Error deleting product:", error); // Log the error for debugging
    return res.status(500).json({
      // Use 500 for server error
      isSuccess: false,
      message: `There was an error while deleting the product! ${error.message}`, // Use error.message for a clearer message
    });
  }
};
