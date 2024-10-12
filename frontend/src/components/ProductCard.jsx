import React, { useState } from "react";
import { useProductStore } from "../store/product";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  useDisclosure,
  Input
} from "@chakra-ui/react";
const ProductCard = ({ product }) => {
  const [updatedProduct,setUpdatedProduct]=useState(product);//product that we got inside the component.  
  const { deleteProduct,updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (success) {
      toast({
        title: "Deleting Product to Database",
        description: message,
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "Deleting Product to Database",
        description: message,
        status: "error",
        isClosable: true,
      });
    }
  };
  const handleUpdateButtonClick = async(productId,updatedProduct)=>{
    const {success,message}= await updateProduct(updatedProduct,productId);
    if (success) {
        //closes the edit product modal
        onClose();
        toast({
          title: "Updated Product Details",
          description: message,
          status: "success",
          isClosable: true,
        });

      } else {
        toast({
          title: "Error while updating Product details",
          description: message,
          status: "error",
          isClosable: true,
        });
      }
  }

  return (
    <div>
      <Card
        maxW="sm"
        _hover={{
          transform: "translateY(-15px)",
          shadow: "xl",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <CardBody>
          <Image
            src={product.imageUrl}
            alt={product.name}
            borderRadius="lg"
            objectFit="cover" // Ensures the image covers the space without distortion
            mx="auto" // Center the image horizontally
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Text color="blue.600" fontSize="2xl">
              ${product.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={onOpen}>
              Edit
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
            <Input placeHolder="Product Name" name="name" type="text" value={updatedProduct.name}               onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }></Input>
            <Input placeHolder="Product Price" name="price" type="number" value={updatedProduct.price}               onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }></Input>
            <Input placeHolder="Product Image(URL)" name="image" type="text" value={updatedProduct.imageUrl}               onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })
              }></Input>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={()=>handleUpdateButtonClick(product._id,updatedProduct)}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductCard;
