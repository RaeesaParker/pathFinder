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

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box bg="bg.primary" minH="100vh">
      <Header showGetStarted />

      {/* Hero Section */}
      <Container maxW="7xl" py={20}>
        <Box textAlign="center">
          <Heading
            as="h1"
            size={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            mb={6}
            color="text.primary"
            lineHeight="1.1"
          >
            Not sure where your degree will take you?{" "}
            <Text as="span" color="text.brand">
              Let's find out.
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            mb={8}
            maxW="3xl"
            mx="auto"
            color="text.secondary"
            lineHeight="1.6"
          >
            Discover personalized career paths based on your studies, interests,
            and goals. Get AI-powered insights that reveal your unique strengths
            and show you exactly where to go next.
          </Text>

          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={4}
            justify="center"
            mb={16}
          >
            <Button
              bg="brand.600"
              color="white"
              size="lg"
              px={8}
              py={4}
              fontSize="lg"
              fontWeight="semibold"
              _hover={{ bg: "brand.700" }}
              onClick={() => navigate("/form")}
            >
              <Flex align="center" gap={2}>
                <Text>Explore Careers</Text>
                <ArrowRight size={20} />
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
              borderColor="border.primary"
              color="text.secondary"
              _hover={{ borderColor: "brand.600", color: "text.primary" }}
            >
              See How It Works
            </Button>
          </Flex>
        </Box>
      </Container>

      {/* Features Section */}
      <Box bg="bg.secondary" py={20}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            <Box textAlign="center">
              <Flex
                w={20}
                h={20}
                mx="auto"
                mb={6}
                align="center"
                justify="center"
                borderRadius="full"
                bg="bg.accent"
              >
                <Icon as={User} w={8} h={8} color="text.brand" />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="semibold"
                mb={3}
                color="text.primary"
              >
                Personalized Analysis
              </Heading>
              <Text color="text.secondary" lineHeight="1.6">
                Tell us about your degree, favorite modules, and interests to
                get insights tailored specifically to you.
              </Text>
            </Box>

            <Box textAlign="center">
              <Flex
                w={20}
                h={20}
                mx="auto"
                mb={6}
                align="center"
                justify="center"
                borderRadius="full"
                bg="bg.accent"
              >
                <Icon as={Lightbulb} w={8} h={8} color="text.brand" />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="semibold"
                mb={3}
                color="text.primary"
              >
                Skills Discovery
              </Heading>
              <Text color="text.secondary" lineHeight="1.6">
                Uncover your transferable skills, technical abilities, and
                unique strengths you might not have realized.
              </Text>
            </Box>

            <Box textAlign="center">
              <Flex
                w={20}
                h={20}
                mx="auto"
                mb={6}
                align="center"
                justify="center"
                borderRadius="full"
                bg="bg.accent"
              >
                <Icon as={TrendingUp} w={8} h={8} color="text.brand" />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="semibold"
                mb={3}
                color="text.primary"
              >
                Career Roadmap
              </Heading>
              <Text color="text.secondary" lineHeight="1.6">
                Get specific career paths with actionable next steps and
                encouragement to help you move forward.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
