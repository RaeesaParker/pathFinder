import { useColorMode } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ArrowRight, Lightbulb, TrendingUp, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import HowItWorksModal from "../components/HowItWorksModal";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGetStarted = () => {
    navigate("/form");
  };

  return (
    <Box
      bg={colorMode === "light" ? "customGray.50" : "customGray.900"}
      minH="100vh"
    >
      <Header showGetStarted />

      {/* Hero Section */}
      <Container maxW="7xl" py={20}>
        <Box
          textAlign="center"
          role="banner"
          aria-label="Path Finder hero section"
        >
          <Heading
            as="h1"
            size={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            mb={6}
            color={colorMode === "light" ? "customGray.900" : "white"}
            lineHeight="1.1"
            aria-label="Main heading for career discovery platform"
          >
            Not sure where your degree will take you?{" "}
            <Text as="span" color="brand.600">
              Let's find out.
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            mb={8}
            maxW="3xl"
            mx="auto"
            color={colorMode === "light" ? "customGray.600" : "customGray.300"}
            lineHeight="1.6"
            aria-label="Platform description"
          >
            Discover personalised career paths based on your studies, interests,
            and goals. Get AI-powered insights that reveal your unique strengths
            and show you exactly where to go next.
          </Text>

          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={4}
            justify="center"
            mb={16}
            role="group"
            aria-label="Main action buttons"
          >
            <Button
              bg="brand.600"
              color="white"
              size="lg"
              px={8}
              py={4}
              fontSize="lg"
              fontWeight="semibold"
              _hover={{ bg: "brand.700", cursor: "pointer" }}
              onClick={handleGetStarted}
              aria-label="Start exploring career paths"
            >
              <Flex align="center" gap={2}>
                <Text>Explore Careers</Text>
                <ArrowRight size={20} aria-hidden="true" />
              </Flex>
            </Button>
            <Button
              variant="outline"
              size="lg"
              px={8}
              py={4}
              fontSize="lg"
              fontWeight="semibold"
              borderWidth={2}
              borderColor={
                colorMode === "light" ? "customGray.300" : "customGray.600"
              }
              color={
                colorMode === "light" ? "customGray.600" : "customGray.300"
              }
              _hover={{
                borderColor: "brand.600",
                color:
                  colorMode === "light" ? "customGray.900" : "customGray.600",
                cursor: "pointer",
              }}
              onClick={onOpen}
              aria-label="Open modal to see how Path Finder works"
            >
              See How It Works
            </Button>
          </Flex>
        </Box>
      </Container>

      {/* Features Section */}
      <Box
        bg={colorMode === "light" ? "white" : "customGray.800"}
        py={20}
        role="region"
        aria-label="Key features section"
      >
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            <Box
              textAlign="center"
              role="article"
              aria-label="Personalised analysis feature"
            >
              <Flex
                w={20}
                h={20}
                mx="auto"
                mb={6}
                align="center"
                justify="center"
                borderRadius="full"
                bg={colorMode === "light" ? "brand.100" : "brand.900"}
              >
                <Icon
                  as={User}
                  w={8}
                  h={8}
                  color="brand.600"
                  aria-hidden="true"
                />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="semibold"
                mb={3}
                color={colorMode === "light" ? "customGray.900" : "white"}
              >
                Personalised Analysis
              </Heading>
              <Text
                color={
                  colorMode === "light" ? "customGray.600" : "customGray.300"
                }
                lineHeight="1.6"
              >
                Tell us about your degree, favourite modules, and interests to
                get insights tailored specifically to you.
              </Text>
            </Box>

            <Box
              textAlign="center"
              role="article"
              aria-label="Skills discovery feature"
            >
              <Flex
                w={20}
                h={20}
                mx="auto"
                mb={6}
                align="center"
                justify="center"
                borderRadius="full"
                bg={colorMode === "light" ? "brand.100" : "brand.900"}
              >
                <Icon
                  as={Lightbulb}
                  w={8}
                  h={8}
                  color="brand.600"
                  aria-hidden="true"
                />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="semibold"
                mb={3}
                color={colorMode === "light" ? "customGray.900" : "white"}
              >
                Skills Discovery
              </Heading>
              <Text
                color={
                  colorMode === "light" ? "customGray.600" : "customGray.300"
                }
                lineHeight="1.6"
              >
                Uncover your transferable skills, technical abilities, and
                unique strengths you might not have realised.
              </Text>
            </Box>

            <Box
              textAlign="center"
              role="article"
              aria-label="Career roadmap feature"
            >
              <Flex
                w={20}
                h={20}
                mx="auto"
                mb={6}
                align="center"
                justify="center"
                borderRadius="full"
                bg={colorMode === "light" ? "brand.100" : "brand.900"}
              >
                <Icon
                  as={TrendingUp}
                  w={8}
                  h={8}
                  color="brand.600"
                  aria-hidden="true"
                />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="semibold"
                mb={3}
                color={colorMode === "light" ? "customGray.900" : "white"}
              >
                Career Roadmap
              </Heading>
              <Text
                color={
                  colorMode === "light" ? "customGray.600" : "customGray.300"
                }
                lineHeight="1.6"
              >
                Get specific career paths with actionable next steps and
                encouragement to help you move forward.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <HowItWorksModal
        isOpen={isOpen}
        onClose={onClose}
        onGetStarted={handleGetStarted}
      />
    </Box>
  );
};

export default Landing;
