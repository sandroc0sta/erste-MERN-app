import React, { use } from 'react'
import { Box, Container, Heading, useColorModeValue, VStack, Input, Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useProductStore } from '../store/product'

const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const toast = useToast();

  const {createProduct} = useProductStore();

  const handleAddProduct = async() => {
    const {success,message} = await createProduct(newProduct)
    
    if(!success){
      toast({
        title: "Fehler",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else{
      toast({
        title: "Erfolg",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size="2xl" textAlign={"center"} mb={8}
        fontSize={{ base: "22", sm: "28" }}
          bgGradient='linear(to-l, #00BFFF, #8A2BE2)'
          bgClip='text'
          fontWeight='extrabold'
          textTransform={"uppercase"}>
          Neues Produkt erstellen
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("#FFF0F5", "gray.800")}
          p={6}
          rounded={"lg"}
          boxShadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Produktname"
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Produktpreis"
              name='price'
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Bild-URL des Produkts"
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button colorScheme="teal" onClick={handleAddProduct} width="full">
              Produkt hinzufügen
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default Createpage;
