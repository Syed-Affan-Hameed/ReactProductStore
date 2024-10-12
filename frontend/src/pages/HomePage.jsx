import { Container, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { getAllProducts, products } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  console.log("Products from the database", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          Product Inventory
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </SimpleGrid>
        
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight={"semibold"}
            color={"gray.500"}
          >
            No Products Found!{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color={"blue.500"}
                fontWeight={"normal"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product.
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
