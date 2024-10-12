import React from 'react'
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Divider,ButtonGroup,Button,Image,Text } from '@chakra-ui/react'
const ProductCard = ({product}) => {
  return (
    <div><Card maxW='sm' _hover={{transform:"translateY(-15px)",shadow:"xl",transition: "transform 0.4s ease, box-shadow 0.4s ease"}}>
    <CardBody>
      <Image
        src={product.imageUrl}
        alt={product.name}
        borderRadius='lg'
        maxW="350px" // Set a maximum width
        maxH="250px" // Set a maximum height
        objectFit="cover" // Ensures the image covers the space without distortion
        mx="auto" // Center the image horizontally
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{product.name}</Heading>
        <Text color='blue.600' fontSize='2xl'>
          ${product.price}
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='solid' colorScheme='blue'>
          Edit
        </Button>
        <Button variant='ghost' colorScheme='blue'>
          Delete
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
  </div>
  )
}

export default ProductCard