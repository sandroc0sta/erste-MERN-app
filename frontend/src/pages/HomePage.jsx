import React, { useEffect } from 'react'
import { Container, VStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const Homepage = () => {

  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          bgGradient='linear(to-l, #00BFFF, #8A2BE2)'
          bgClip='text'
          fontWeight='bold'
        >
          Aktuelle Produkte
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length=== 0 && (
          <Text fontSize='xl' textAlign='center' fontWeight='bold' color='gray.500'>
          Keine Produkte gefunden - {" "}
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
              Produkt erstellen
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Homepage;