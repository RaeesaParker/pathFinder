import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { Moon, Target } from "lucide-react";
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

  return (
    <Box
      bg="bg.secondary"
      boxShadow="sm"
      borderBottom="1px"
      borderColor="border.primary"
    >
      <Container maxW="7xl" py={6}>
        <Flex justify="space-between" align="center">
          <Flex
            align="center"
            cursor="pointer"
            onClick={() => navigate("/")}
            color="text.secondary"
            _hover={{ color: "text.brand" }}
            gap={2}
          >
            <Target size={32} />
            <Heading
              as="h1"
              fontSize="2xl"
              fontWeight="bold"
              color="text.primary"
            >
              PathFinder
            </Heading>
          </Flex>

          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              size="sm"
            >
              <Moon size={20} />
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
                color="text.brand"
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
