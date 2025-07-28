import { useState } from 'react'
import { Box, Heading, HStack, IconButton, Text, useColorModeValue, Image, useToast, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Input, ModalFooter, Button } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {

  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("#FFF0F5", "gray 800");

  const { deleteProduct, updateProduct } = useProductStore()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid)
    if (!success) {
      toast({
        title: 'Fehler',
        description: message,
        status: 'error',
        duration: 3000,
        isCloseable: true,
      })
    } else {
      toast({
        title: 'Erfolg',
        description: message,
        status: 'success',
        duration: 3000,
        isCloseable: true,
      })
    }
  }

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct);
    onClose();

    if (!success) {
      toast({
        title: 'Fehler',
        description: message,
        status: 'error',
        duration: 3000,
        isCloseable: true,
      });
    } else {
      toast({
        title: 'Erfolg',
        description: 'Produkt Erfolgreich aktualisiert' ,
        status: 'success',
        duration: 3000,
        isCloseable: true,
      })
    }
  }

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

      <Box p={4}>
        <Heading as={'h3'} size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          €{Number(product.price).toFixed(2)}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='orange' />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(product._id)} colorScheme='red' />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Produkt bearbeiten</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Produktname'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder='Preis'
                name='Preis'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder='Bild'
                name='bild'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Schließen
            </Button>
            <Button colorScheme='orange' onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Aktualisieren
            </Button>
          </ModalFooter>

        </ModalContent>

      </Modal>

    </Box>
  )
}

export default ProductCard;

