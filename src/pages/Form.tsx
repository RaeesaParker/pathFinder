import { useColorMode } from "@chakra-ui/color-mode";
import {
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

interface FormData {
  degree: string;
  modules: string[];
  interests: string[];
  goals: string;
  lifeGoals: string;
}

const Form: React.FC = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState<FormData>({
    degree: "",
    modules: [],
    interests: [],
    goals: "",
    lifeGoals: "",
  });

  const [currentModule, setCurrentModule] = useState("");
  const [currentInterest, setCurrentInterest] = useState("");

  const addModule = () => {
    if (
      currentModule.trim() &&
      !formData.modules.includes(currentModule.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        modules: [...prev.modules, currentModule.trim()],
      }));
      setCurrentModule("");
    }
  };

  const addInterest = () => {
    if (
      currentInterest.trim() &&
      !formData.interests.includes(currentInterest.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, currentInterest.trim()],
      }));
      setCurrentInterest("");
    }
  };

  const removeModule = (module: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m !== module),
    }));
  };

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.degree &&
      formData.modules.length > 0 &&
      formData.interests.length > 0
    ) {
      // Pass form data via state to results page
      navigate("/results", { state: { formData } });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <Box
      bg={colorMode === "light" ? "customGray.50" : "customGray.900"}
      minH="100vh"
    >
      <Header />

      <Container maxW="container.xl" py={8}>
        <Box
          bg={colorMode === "light" ? "white" : "customGray.800"}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor={
            colorMode === "light" ? "customGray.300" : "customGray.600"
          }
          p={8}
          mb={8}
          role="banner"
          aria-label="Form introduction section"
        >
          <Heading
            as="h2"
            fontSize="3xl"
            fontWeight="bold"
            mb={4}
            color={colorMode === "light" ? "customGray.900" : "customGray.50"}
          >
            Tell us about yourself
          </Heading>
          <Text
            color={colorMode === "light" ? "customGray.700" : "customGray.300"}
            fontSize="lg"
          >
            The more we know about your studies and interests, the better we can
            help you discover your path.
          </Text>
        </Box>

        <form
          onSubmit={handleSubmit}
          role="form"
          aria-label="Career discovery form"
        >
          <VStack gap={8}>
            {/* Degree Input */}
            <Box
              w="full"
              bg={colorMode === "light" ? "white" : "customGray.800"}
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor={
                colorMode === "light" ? "customGray.300" : "customGray.600"
              }
              p={8}
              role="group"
              aria-label="Degree information section"
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon
                  as={BookOpen}
                  w={6}
                  h={6}
                  color="brand.600"
                  aria-hidden="true"
                />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color={
                    colorMode === "light" ? "customGray.900" : "customGray.50"
                  }
                >
                  What's your degree or field of study?
                </Heading>
              </Flex>
              <Input
                value={formData.degree}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, degree: e.target.value }))
                }
                placeholder="e.g., Computer Science, Business Administration, Psychology..."
                size="lg"
                bg={colorMode === "light" ? "white" : "customGray.800"}
                borderColor={
                  colorMode === "light" ? "customGray.300" : "customGray.600"
                }
                color={
                  colorMode === "light" ? "customGray.900" : "customGray.50"
                }
                _placeholder={{
                  color:
                    colorMode === "light" ? "customGray.500" : "customGray.400",
                }}
                _focus={{
                  borderColor: "brand.600",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                }}
                required
                aria-label="Enter your degree or field of study"
                aria-describedby="degree-help"
              />
              <Text
                id="degree-help"
                fontSize="sm"
                color={
                  colorMode === "light" ? "customGray.500" : "customGray.400"
                }
                mt={2}
              >
                This helps us understand your academic background
              </Text>
            </Box>

            {/* Modules Input */}
            <Box
              w="full"
              bg={colorMode === "light" ? "white" : "customGray.800"}
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor={
                colorMode === "light" ? "customGray.300" : "customGray.600"
              }
              p={8}
              role="group"
              aria-label="Modules and topics section"
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon
                  as={Target}
                  w={6}
                  h={6}
                  color="brand.600"
                  aria-hidden="true"
                />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color={
                    colorMode === "light" ? "customGray.900" : "customGray.50"
                  }
                >
                  Which modules or topics have you enjoyed?
                </Heading>
              </Flex>
              <HStack mb={4}>
                <Input
                  value={currentModule}
                  onChange={(e) => setCurrentModule(e.target.value)}
                  placeholder="e.g., Data Structures, Marketing Strategy, Creative Writing..."
                  flex={1}
                  bg={colorMode === "light" ? "white" : "customGray.800"}
                  borderColor={
                    colorMode === "light" ? "customGray.300" : "customGray.600"
                  }
                  color={
                    colorMode === "light" ? "customGray.900" : "customGray.50"
                  }
                  _placeholder={{
                    color:
                      colorMode === "light"
                        ? "customGray.500"
                        : "customGray.400",
                  }}
                  _focus={{
                    borderColor: "brand.600",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                  }}
                  onKeyPress={(e) => handleKeyPress(e, addModule)}
                  aria-label="Enter a module or topic you enjoyed"
                  aria-describedby="modules-help"
                />
                <Button
                  onClick={addModule}
                  bg="brand.600"
                  color="white"
                  _hover={{ bg: "brand.700" }}
                  px={6}
                  aria-label="Add module to list"
                >
                  Add
                </Button>
              </HStack>
              <Text
                id="modules-help"
                fontSize="sm"
                color={
                  colorMode === "light" ? "customGray.500" : "customGray.400"
                }
                mb={3}
              >
                Add modules one at a time. Click 'Add' or press Enter to add
                each one.
              </Text>
              <Flex wrap="wrap" gap={2} role="list" aria-label="Added modules">
                {formData.modules.map((module) => (
                  <Box
                    key={module}
                    bg={colorMode === "light" ? "brand.50" : "brand.900"}
                    color={colorMode === "light" ? "brand.600" : "brand.100"}
                    borderRadius="full"
                    px={3}
                    py={2}
                    fontSize="sm"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    role="listitem"
                  >
                    <Text>{module}</Text>
                    <CloseButton
                      size="sm"
                      onClick={() => removeModule(module)}
                      aria-label={`Remove ${module} from modules list`}
                      color={colorMode === "light" ? "brand.600" : "brand.600"}
                    />
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Interests Input */}
            <Box
              w="full"
              bg={colorMode === "light" ? "white" : "customGray.800"}
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor={
                colorMode === "light" ? "customGray.300" : "customGray.600"
              }
              p={8}
              role="group"
              aria-label="Interests and hobbies section"
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon
                  as={Heart}
                  w={6}
                  h={6}
                  color="brand.600"
                  aria-hidden="true"
                />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color={
                    colorMode === "light" ? "customGray.900" : "customGray.50"
                  }
                >
                  What are your hobbies and interests?
                </Heading>
              </Flex>
              <HStack mb={4}>
                <Input
                  value={currentInterest}
                  onChange={(e) => setCurrentInterest(e.target.value)}
                  placeholder="e.g., Photography, Volunteer work, Gaming..."
                  flex={1}
                  bg={colorMode === "light" ? "white" : "customGray.800"}
                  borderColor={
                    colorMode === "light" ? "customGray.300" : "customGray.600"
                  }
                  color={
                    colorMode === "light" ? "customGray.900" : "customGray.50"
                  }
                  _placeholder={{
                    color:
                      colorMode === "light"
                        ? "customGray.500"
                        : "customGray.400",
                  }}
                  _focus={{
                    borderColor: "brand.600",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                  }}
                  onKeyPress={(e) => handleKeyPress(e, addInterest)}
                  aria-label="Enter a hobby or interest"
                  aria-describedby="interests-help"
                />
                <Button
                  onClick={addInterest}
                  bg="brand.600"
                  color="white"
                  _hover={{ bg: "brand.700" }}
                  px={6}
                  aria-label="Add interest to list"
                >
                  Add
                </Button>
              </HStack>
              <Text
                id="interests-help"
                fontSize="sm"
                color={
                  colorMode === "light" ? "customGray.500" : "customGray.400"
                }
                mb={3}
              >
                Add interests one at a time. These help us understand your
                personality and passions.
              </Text>
              <Flex
                wrap="wrap"
                gap={2}
                role="list"
                aria-label="Added interests"
              >
                {formData.interests.map((interest) => (
                  <Box
                    key={interest}
                    bg={colorMode === "light" ? "brand.50" : "brand.900"}
                    color={colorMode === "light" ? "brand.600" : "brand.100"}
                    borderRadius="full"
                    px={3}
                    py={2}
                    fontSize="sm"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    role="listitem"
                  >
                    <Text>{interest}</Text>
                    <CloseButton
                      size="sm"
                      onClick={() => removeInterest(interest)}
                      aria-label={`Remove ${interest} from interests list`}
                      color={colorMode === "light" ? "brand.600" : "brand.600"}
                    />
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Goals Input */}
            <Box
              w="full"
              bg={colorMode === "light" ? "white" : "customGray.800"}
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor={
                colorMode === "light" ? "customGray.300" : "customGray.600"
              }
              p={8}
              role="group"
              aria-label="Career goals section"
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon
                  as={TrendingUp}
                  w={6}
                  h={6}
                  color="brand.600"
                  aria-hidden="true"
                />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color={
                    colorMode === "light" ? "customGray.900" : "customGray.50"
                  }
                >
                  Any specific career goals or dreams?
                </Heading>
              </Flex>
              <Textarea
                value={formData.goals}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, goals: e.target.value }))
                }
                placeholder="e.g., I want to make a positive impact, work with cutting-edge technology, or be my own boss..."
                rows={3}
                resize="none"
                bg={colorMode === "light" ? "white" : "customGray.800"}
                borderColor={
                  colorMode === "light" ? "customGray.300" : "customGray.600"
                }
                color={
                  colorMode === "light" ? "customGray.900" : "customGray.50"
                }
                _placeholder={{
                  color:
                    colorMode === "light" ? "customGray.500" : "customGray.400",
                }}
                _focus={{
                  borderColor: "brand.600",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                }}
                aria-label="Enter your career goals and dreams"
                aria-describedby="goals-help"
              />
              <Text
                id="goals-help"
                fontSize="sm"
                color={
                  colorMode === "light" ? "customGray.500" : "customGray.400"
                }
                mt={2}
              >
                Optional: Share any career aspirations or dreams you have.
              </Text>
            </Box>

            {/* Life Goals Input */}
            <Box
              w="full"
              bg={colorMode === "light" ? "white" : "customGray.800"}
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor={
                colorMode === "light" ? "customGray.300" : "customGray.600"
              }
              p={8}
              role="group"
              aria-label="Life goals and values section"
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon
                  as={Users}
                  w={6}
                  h={6}
                  color="brand.600"
                  aria-hidden="true"
                />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color={
                    colorMode === "light" ? "customGray.900" : "customGray.50"
                  }
                >
                  What are your life goals and values?
                </Heading>
              </Flex>
              <Textarea
                value={formData.lifeGoals}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lifeGoals: e.target.value,
                  }))
                }
                placeholder="e.g., I want good work-life balance, to make a difference in the world, to help others, to have financial security, to travel and experience different cultures..."
                rows={3}
                resize="none"
                bg={colorMode === "light" ? "white" : "customGray.800"}
                borderColor={
                  colorMode === "light" ? "customGray.300" : "customGray.600"
                }
                color={
                  colorMode === "light" ? "customGray.900" : "customGray.50"
                }
                _placeholder={{
                  color:
                    colorMode === "light" ? "customGray.500" : "customGray.400",
                }}
                _focus={{
                  borderColor: "brand.600",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                }}
                aria-label="Enter your life goals and personal values"
                aria-describedby="life-goals-help"
              />
              <Text
                id="life-goals-help"
                fontSize="sm"
                color={
                  colorMode === "light" ? "customGray.500" : "customGray.400"
                }
                mt={2}
              >
                Optional: Share your personal values and what matters most to
                you in life beyond career.
              </Text>
            </Box>

            <Button
              type="submit"
              disabled={
                !formData.degree ||
                formData.modules.length === 0 ||
                formData.interests.length === 0
              }
              w="full"
              bg="brand.600"
              color="white"
              size="lg"
              py={4}
              fontSize="lg"
              fontWeight="semibold"
              _hover={{ bg: "brand.700" }}
              _disabled={{
                bg: colorMode === "light" ? "customGray.300" : "customGray.600",
                color:
                  colorMode === "light" ? "customGray.500" : "customGray.400",
                cursor: "not-allowed",
              }}
              aria-label="Submit form to discover career paths"
            >
              <Flex align="center" gap={2}>
                <Text>Discover My Path</Text>
                <ArrowRight size={20} aria-hidden="true" />
              </Flex>
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};

export default Form;
