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
import { useColorMode } from "@chakra-ui/color-mode";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";

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

  useEffect(() => {
    const formData = location.state?.formData as FormData;

    if (!formData) {
      navigate("/form");
      return;
    }

    const generateInsights = (data: FormData): CareerInsight => {
      const degreeField = data.degree.toLowerCase();
      const hasSTEM =
        degreeField.includes("computer") ||
        degreeField.includes("engineering") ||
        degreeField.includes("science") ||
        degreeField.includes("math");
      const hasBusiness =
        degreeField.includes("business") ||
        degreeField.includes("economics") ||
        degreeField.includes("finance");
      const hasArts =
        degreeField.includes("art") ||
        degreeField.includes("design") ||
        degreeField.includes("english") ||
        degreeField.includes("history");

      const baseTransferableSkills = [
        "Critical thinking",
        "Problem-solving",
        "Communication",
        "Time management",
      ];
      const baseTechnicalSkills = hasSTEM
        ? ["Data analysis", "Research methodology", "Technical writing"]
        : hasBusiness
        ? ["Market analysis", "Financial modeling", "Project management"]
        : hasArts
        ? ["Creative thinking", "Research skills", "Content creation"]
        : ["Research methodology", "Analytical thinking", "Writing"];

      const careerPaths = hasSTEM
        ? [
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
          ]
        : hasBusiness
        ? [
            {
              title: "Management Consultant",
              description:
                "Help organizations solve complex business challenges and improve performance.",
              nextSteps: [
                "Develop case study analysis skills",
                "Network with consulting professionals",
                "Practice business presentation skills",
              ],
              encouragement:
                "Your business acumen and analytical skills are perfect for tackling diverse business challenges.",
            },
            {
              title: "Marketing Manager",
              description:
                "Create compelling campaigns that connect brands with their target audiences.",
              nextSteps: [
                "Learn digital marketing tools",
                "Build a personal brand online",
                "Study successful marketing campaigns",
              ],
              encouragement:
                "Your understanding of market dynamics gives you a solid foundation for creative marketing strategies.",
            },
            {
              title: "Startup Founder",
              description:
                "Turn innovative ideas into successful businesses that make a real impact.",
              nextSteps: [
                "Identify a problem to solve",
                "Build a minimum viable product",
                "Connect with other entrepreneurs",
              ],
              encouragement:
                "Your business knowledge combined with your passion gives you the tools to build something meaningful.",
            },
          ]
        : [
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
              title: "Social Impact Coordinator",
              description:
                "Work with organizations to create positive change in communities.",
              nextSteps: [
                "Volunteer with local nonprofits",
                "Learn about social impact measurement",
                "Network with mission-driven organizations",
              ],
              encouragement:
                "Your passion for making a difference can create meaningful career opportunities in the social sector.",
            },
            {
              title: "Project Manager",
              description:
                "Lead teams and coordinate complex projects from start to finish.",
              nextSteps: [
                "Get certified in project management",
                "Practice leading team projects",
                "Learn project management software",
              ],
              encouragement:
                "Your organizational skills and attention to detail are valuable in any industry.",
            },
          ];

      return {
        summary: `Based on your ${
          data.degree
        } background and interests in ${data.modules.join(
          ", "
        )}, you've developed a unique combination of analytical and creative skills. Your passion for ${data.interests.join(
          " and "
        )} shows you're someone who thinks both strategically and empathetically.`,
        transferableSkills: [
          ...baseTransferableSkills,
          "Leadership",
          "Collaboration",
          "Adaptability",
        ],
        technicalSkills: baseTechnicalSkills,
        interestSkills: data.interests.map(
          (interest) =>
            `${interest.charAt(0).toUpperCase() + interest.slice(1)} knowledge`
        ),
        careerPaths: careerPaths,
      };
    };

    const generatedInsights = generateInsights(formData);
    setInsights(generatedInsights);
  }, [location.state, navigate]);

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
          >
            Your Career{" "}
            <Text as="span" color="brand.600">
              Insights
            </Text>
          </Heading>
          <Text
            fontSize="xl"
            color={colorMode === "light" ? "customGray.600" : "customGray.300"}
          >
            Based on your unique background and interests
          </Text>
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
        >
          <Flex align="center" mb={4} gap={2}>
            <Icon as={User} w={6} h={6} color="brand.600" />
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
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
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
          >
            Explore Another Path
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Results;
