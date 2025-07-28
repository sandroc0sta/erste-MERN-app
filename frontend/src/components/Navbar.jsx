import { Link } from "react-router-dom";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        height={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={{
          base: 'column',
          sm: 'row'
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          bgGradient='linear(to-l, #FFA500, #FF0080)'
          bgClip='text'
          fontWeight='extrabold'
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}>Produktladen 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={'center'}>
          <Link to={"/create"}>
            <Button title="Neues Produkt erstellen">
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} title="Farbschema wechseln">
            {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar;
