import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, addNewProductSetter] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const toast = useToast();
  // Getting global state using zustand;
 const {createProduct} = useProductStore();

//method handles the Add Product Button click.
  const handleAddProductClick= async()=>{
   const {success,message}= await createProduct( newProduct );
   console.log("Success Status",success);
   console.log("Message",message);
   //calling the toast function
   if(success){
    toast({
      title: 'Adding Product to Database',
      description: message,
      status: "success",
      isClosable: true,
    })
   }else{
    toast({
      title: 'Adding Product to Database',
      description: message,
      status: "error",
      isClosable: true,
    })
   }
   addNewProductSetter({name:"",price:"",imageUrl:""});
  }

  // Toast message based on the backend response

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                addNewProductSetter({ ...newProduct, name: e.target.value })
              }
            ></Input>
            <Input
              placeholder="Product price"
              name="price"
              value={newProduct.price}
              type="number"
              onChange={(e) =>
                addNewProductSetter({ ...newProduct, price: e.target.value })
              }
            ></Input>
            <Input
              placeholder="Image Url"
              name="imageUrl"
              value={newProduct.imageUrl}
              type="text"
              onChange={(e) =>
                addNewProductSetter({ ...newProduct, imageUrl: e.target.value })
              }
            ></Input>
            <Button colorScheme="blue" onClick={handleAddProductClick} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
