import { useColorMode } from "@chakra-ui/color-mode";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import { generateCareerInsights } from "../utils/generateCareerPrompt";

interface FormData {
  degree: string;
  modules: string[];
  interests: string[];
  goals: string;
}

interface CareerInsight {
  summary: string;
  transferableSkills: string[];
  technicalSkills: string[];
  interestSkills: string[];
  careerPaths: {
    title: string;
    description: string;
    nextSteps: string[];
    encouragement: string;
  }[];
}

const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useColorMode();
  const [insights, setInsights] = useState<CareerInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formData = location.state?.formData as FormData;

    if (!formData) {
      navigate("/form");
      return;
    }

    const fetchCareerInsights = async () => {
      setLoading(true);
      setError(null);

      try {
        const insights = await generateCareerInsights(formData);
        setInsights(insights);
      } catch (err) {
        console.error("Error generating career insights:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to generate career insights"
        );

        // Fallback to placeholder data in case of error
        const placeholderInsights: CareerInsight = {
          summary: `Based on your ${
            formData.degree
          } background and interests in ${formData.modules.join(
            ", "
          )}, you've developed a unique combination of analytical and creative skills. Your passion for ${formData.interests.join(
            " and "
          )} shows you're someone who thinks both strategically and empathetically.`,
          transferableSkills: [
            "Critical thinking",
            "Problem-solving",
            "Communication",
            "Time management",
            "Leadership",
            "Collaboration",
            "Adaptability",
          ],
          technicalSkills: [
            "Data analysis",
            "Research methodology",
            "Technical writing",
            "Project management",
          ],
          interestSkills: formData.interests.map(
            (interest) =>
              `${
                interest.charAt(0).toUpperCase() + interest.slice(1)
              } knowledge`
          ),
          careerPaths: [
            {
              title: "Product Manager",
              description:
                "Bridge technical and business teams to build products that solve real problems.",
              nextSteps: [
                "Build a portfolio project",
                "Learn about user research",
                "Connect with product professionals on LinkedIn",
              ],
              encouragement:
                "Your technical background gives you a unique advantage in understanding both user needs and technical feasibility.",
            },
            {
              title: "Data Scientist",
              description:
                "Turn complex data into actionable insights that drive business decisions.",
              nextSteps: [
                "Complete an online course in Python/R",
                "Work on a data analysis project",
                "Join data science communities",
              ],
              encouragement:
                "Your analytical skills from your degree are exactly what employers in this field are looking for.",
            },
            {
              title: "UX Designer",
              description:
                "Design digital experiences that are both beautiful and functional.",
              nextSteps: [
                "Learn design tools like Figma",
                "Create a design portfolio",
                "Study user experience principles",
              ],
              encouragement:
                "Your logical thinking combined with creativity can create truly innovative user experiences.",
            },
            {
              title: "Content Strategist",
              description:
                "Create compelling content that tells stories and builds communities.",
              nextSteps: [
                "Build a portfolio of writing samples",
                "Learn content management systems",
                "Study successful content campaigns",
              ],
              encouragement:
                "Your communication skills and creative thinking are exactly what brands need to connect with audiences.",
            },
            {
              title: "Innovation Consultant",
              description:
                "Help organisations embrace new technologies and transform their business models.",
              nextSteps: [
                "Study emerging technology trends",
                "Develop change management skills",
                "Network with innovation professionals",
              ],
              encouragement:
                "Your diverse background positions you perfectly to bridge traditional business with cutting-edge innovation.",
            },
          ],
        };
        setInsights(placeholderInsights);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerInsights();
  }, [location.state, navigate]);

  if (loading) {
    return (
      <Box
        bg={colorMode === "light" ? "customGray.50" : "customGray.900"}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap={4}>
          <Text
            fontSize="xl"
            color={colorMode === "light" ? "customGray.700" : "customGray.300"}
          >
            Generating your personalised career insights...
          </Text>
          <Text
            fontSize="md"
            color={colorMode === "light" ? "customGray.500" : "customGray.400"}
          >
            This may take a few moments
          </Text>
        </VStack>
      </Box>
    );
  }

  if (!insights) {
    return null;
  }

  return (
    <Box
      bg={colorMode === "light" ? "customGray.50" : "customGray.900"}
      minH="100vh"
    >
      <Header showStartOver />

      <Container maxW="6xl" py={12}>
        <Box textAlign="center" mb={12}>
          <Heading
            as="h1"
            size="2xl"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            color={colorMode === "light" ? "customGray.900" : "white"}
            aria-label="Career insights results heading"
          >
            Your Career{" "}
            <Text as="span" color="brand.600">
              Insights
            </Text>
          </Heading>
          <Text
            fontSize="xl"
            color={colorMode === "light" ? "customGray.600" : "customGray.300"}
            aria-label="Results subtitle"
          >
            Based on your unique background and interests
          </Text>
          {error && (
            <Box
              mt={4}
              p={4}
              bg="red.50"
              borderColor="red.200"
              borderWidth="1px"
              borderRadius="md"
              role="alert"
              aria-label="Error message"
            >
              <Text color="red.600" fontSize="sm">
                ⚠️ Using fallback data due to AI service error: {error}
              </Text>
            </Box>
          )}
        </Box>

        {/* Summary */}
        <Box
          bg={colorMode === "light" ? "white" : "customGray.800"}
          borderRadius="lg"
          p={8}
          boxShadow="sm"
          mb={8}
          border="1px"
          borderColor={
            colorMode === "light" ? "customGray.300" : "customGray.600"
          }
          role="region"
          aria-label="Career summary section"
        >
          <Flex align="center" mb={4} gap={2}>
            <Icon as={User} w={6} h={6} color="brand.600" aria-hidden="true" />
            <Heading
              as="h3"
              fontSize="2xl"
              fontWeight="semibold"
              color={colorMode === "light" ? "customGray.900" : "white"}
            >
              Your Learning Journey
            </Heading>
          </Flex>
          <Text
            fontSize="lg"
            lineHeight="1.6"
            color={colorMode === "light" ? "customGray.700" : "customGray.300"}
          >
            {insights.summary}
          </Text>
        </Box>

        {/* Skills */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={6}
          mb={8}
          role="region"
          aria-label="Skills breakdown section"
        >
          <Box
            bg={colorMode === "light" ? "white" : "customGray.800"}
            borderRadius="lg"
            p={6}
            boxShadow="sm"
            border="1px"
            borderColor={
              colorMode === "light" ? "customGray.300" : "customGray.600"
            }
          >
            <Heading
              as="h4"
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
              color="brand.600"
            >
              Transferable Skills
            </Heading>
            <VStack align="start" gap={2}>
              {insights.transferableSkills.map((skill, index) => (
                <Text
                  key={index}
                  color={
                    colorMode === "light" ? "customGray.700" : "customGray.300"
                  }
                >
                  • {skill}
                </Text>
              ))}
            </VStack>
          </Box>

          <Box
            bg={colorMode === "light" ? "white" : "customGray.800"}
            borderRadius="lg"
            p={6}
            boxShadow="sm"
            border="1px"
            borderColor={
              colorMode === "light" ? "customGray.300" : "customGray.600"
            }
          >
            <Heading
              as="h4"
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
              color="brand.600"
            >
              Technical Skills
            </Heading>
            <VStack align="start" gap={2}>
              {insights.technicalSkills.map((skill, index) => (
                <Text
                  key={index}
                  color={
                    colorMode === "light" ? "customGray.700" : "customGray.300"
                  }
                >
                  • {skill}
                </Text>
              ))}
            </VStack>
          </Box>

          <Box
            bg={colorMode === "light" ? "white" : "customGray.800"}
            borderRadius="lg"
            p={6}
            boxShadow="sm"
            border="1px"
            borderColor={
              colorMode === "light" ? "customGray.300" : "customGray.600"
            }
          >
            <Heading
              as="h4"
              fontSize="lg"
              fontWeight="semibold"
              mb={4}
              color="brand.600"
            >
              Interest-Based Skills
            </Heading>
            <VStack align="start" gap={2}>
              {insights.interestSkills.map((skill, index) => (
                <Text
                  key={index}
                  color={
                    colorMode === "light" ? "customGray.700" : "customGray.300"
                  }
                >
                  • {skill}
                </Text>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Career Paths */}
        <VStack gap={8}>
          <Heading
            as="h3"
            fontSize="2xl"
            fontWeight="semibold"
            textAlign="center"
            mb={8}
            color={colorMode === "light" ? "customGray.900" : "white"}
          >
            Career Paths{" "}
            <Text as="span" color="brand.600">
              Just for You
            </Text>
          </Heading>

          {insights.careerPaths.map((path, index) => (
            <Box
              key={index}
              bg={colorMode === "light" ? "white" : "customGray.800"}
              borderRadius="lg"
              p={8}
              boxShadow="sm"
              w="full"
              border="1px"
              borderColor={
                colorMode === "light" ? "customGray.300" : "customGray.600"
              }
            >
              <Heading
                as="h4"
                fontSize="2xl"
                fontWeight="bold"
                mb={3}
                color="brand.600"
              >
                {path.title}
              </Heading>
              <Text
                fontSize="lg"
                mb={6}
                color={
                  colorMode === "light" ? "customGray.700" : "customGray.300"
                }
                lineHeight="1.6"
              >
                {path.description}
              </Text>

              <Box mb={6}>
                <Heading
                  as="h5"
                  fontSize="lg"
                  fontWeight="semibold"
                  mb={3}
                  color={colorMode === "light" ? "customGray.900" : "white"}
                >
                  Next Steps:
                </Heading>
                <VStack align="start" gap={2}>
                  {path.nextSteps.map((step, stepIndex) => (
                    <Flex
                      key={stepIndex}
                      align="flex-start"
                      gap={2}
                      color={
                        colorMode === "light"
                          ? "customGray.700"
                          : "customGray.300"
                      }
                    >
                      <Text color="brand.600" fontWeight="bold">
                        •
                      </Text>
                      <Text>{step}</Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>

              <Box
                bg={colorMode === "light" ? "brand.50" : "brand.900"}
                p={4}
                borderRadius="lg"
              >
                <Text fontWeight="medium" fontStyle="italic" color="brand.600">
                  💡 {path.encouragement}
                </Text>
              </Box>
            </Box>
          ))}
        </VStack>

        <Box textAlign="center" mt={12}>
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
            aria-label="Start a new career path exploration"
          >
            Explore Another Path
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Results;
