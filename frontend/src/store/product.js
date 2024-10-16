import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => {
  return {
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
      if (!newProduct.name || !newProduct.price || !newProduct.imageUrl) {
        return { success: false, message: "Please fill all the fields" };
      }
      try {
        const response = await axios({
          method: "post",
          url: "/api/products/add-product",
          headers: { "content-type": "application/json" },
          data: {
            ...newProduct
          },
        });
        if (response.status === 200) {
          set((state) => ({ products: [...state.products, response.data] }));
          return { success: true, message: "Product added successfully!" };
        }
      } catch (error) {
        console.log("Error making the Post call to add product", error);
        return {
          success: false,
          message: "Error making the Post call to add product",
        };
      }
    },
    getAllProducts: async () => {
      try {
        const response = await axios({
          method: "get",
          url: "/api/products",
          responseType: "json",
        });
        if (response.status === 200) {
          const productsFromResponse = response.data.products;
          set({ products: productsFromResponse });
          return {
            success: true,
            message: "recieved all the products",
            products: productsFromResponse,
          };
        }
      } catch (error) {
        console.log("Error getting all the products", error);
        return {
          success: true,
          message: "Error getting all the products",
          products: null,
        };
      }
    },
    deleteProduct: async (productId) => {
      try {
        const response = await axios({
          method: "delete",
          url: `/api/products/delete-product/${productId}`,
          responseType: "json"
        });
        if (response.status === 200) {
          //this code updates the UI after the deletion of the product 
          //it behaves like setter function of useState() hook. 
          set((state) => ({
            products: state.products.filter(
              (product) => product._id !== productId
            ),
          }));

          return {
            success: response.data.isSuccess,
            message: response.data.message,
          };
        } else {
          console.log("Error while deleting product");
          return {
            success: response.data.isSuccess,
            message: response.data.message,
          };
        }
      } catch (error) {
        console.log("Error while deleting product", error);
      }
    },
    updateProduct: async(updatedProduct,productId)=>{
      try{
        const response = await axios({
          method: "put",
          url: `/api/products/update-product/${productId}`,
          responseType: "json",
          headers: { "content-type": "application/json" },
          data:{
            ...updatedProduct
          }
        });
        if(response.status===200){
          console.log("successfully updated the product");
          //modifying the products state we have in the application and re-rendering code!.
          set((state)=>({
            products: state.products.map(product=>product._id===productId?response.data.updatedProduct:product)
          }))
          return {
            success: response.data.isSuccess,
            message: response.data.message,
          };
        }else{
          console.log("Error while updating product");
          return {
            success: response.data.isSuccess,
            message: response.data.message,
          };
        }
      }
      catch(error){
        console.log("Error while updating the product!",error);
        return {
          success: false,
          message: "Exception Occurred",
        };
      }
    }
  };
});
