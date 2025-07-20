import { useColorMode } from "@chakra-ui/color-mode";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { Moon, Sun, Target } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showGetStarted?: boolean;
  showStartOver?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showGetStarted = false,
  showStartOver = false,
}) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "light" ? "white" : "customGray.800"}
      boxShadow="sm"
      borderBottom="1px"
      borderColor={colorMode === "light" ? "customGray.300" : "customGray.600"}
    >
      <Container maxW="7xl" py={6}>
        <Flex justify="space-between" align="center">
          <Flex
            align="center"
            cursor="pointer"
            onClick={() => navigate("/")}
            color={colorMode === "light" ? "customGray.600" : "customGray.300"}
            _hover={{ color: "brand.600" }}
            gap={2}
          >
            <Target size={32} />
            <Heading
              as="h1"
              fontSize="2xl"
              fontWeight="bold"
              color={colorMode === "light" ? "customGray.900" : "white"}
            >
              PathFinder
            </Heading>
          </Flex>

          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              size="sm"
              onClick={toggleColorMode}
              color={
                colorMode === "light" ? "customGray.600" : "customGray.300"
              }
              _hover={{
                color: "brand.600",
                bg: colorMode === "light" ? "brand.100" : "brand.900",
              }}
            >
              {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>

            {showGetStarted && (
              <Button
                bg="brand.600"
                color="white"
                _hover={{ bg: "brand.700" }}
                onClick={() => navigate("/form")}
                size="md"
              >
                Get Started
              </Button>
            )}

            {showStartOver && (
              <Button
                variant="ghost"
                onClick={() => navigate("/form")}
                color="brand.600"
                _hover={{ color: "brand.700" }}
              >
                Start Over
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
