import {create} from 'zustand';
import axios from 'axios';



export const useProductStore = create((set)=>{
    return({
        products:[],
        setProducts: (products)=> set({products}),
        createProduct : async (newProduct)=>{
            if(!newProduct.name ||!newProduct.price || !newProduct.imageUrl){
                return {success:false,message:"Please fill all the fields"}
            }
            try{
                const response= await axios({
                  method: 'post',
                  url: 'http://localhost:5000/api/products/add-product',
                  headers: { 'content-type': 'application/json' },
                  data:{
                    ...newProduct
                  }
                });
                if(response.status===200){
                  set((state)=>({products:[...state.products,response.data]}));
                  return {success:true,message:"Product added successfully!"}
                }
            }
            catch(error){
              console.log("Error making the Post call to add product",error);
              return {success:false,message:"Error making the Post call to add product"}
            }
        },
        getAllProducts: async()=>{
          try{
            const response = await axios({
              method: 'get',
              url: 'http://localhost:5000/api/products',
              responseType: 'json'
            }
            );
            if(response.status===200){
              const productsFromResponse = response.data.products;
              set({products:productsFromResponse})
              return {success:true,message:"recieved all the products",products:productsFromResponse};
            }
          }
          catch(error){
            console.log("Error getting all the products",error);
            return {success:true,message:"Error getting all the products",products:null};
          }
        }
    })
})