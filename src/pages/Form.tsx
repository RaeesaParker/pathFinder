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
import { ArrowRight, BookOpen, Heart, Target, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

interface FormData {
  degree: string;
  modules: string[];
  interests: string[];
  goals: string;
}

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    degree: "",
    modules: [],
    interests: [],
    goals: "",
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
    <Box bg="bg.primary" minH="100vh">
      <Header />

      <Container maxW="3xl" py={12}>
        <Box textAlign="center" mb={10}>
          <Heading
            as="h2"
            fontSize="3xl"
            fontWeight="bold"
            mb={4}
            color="text.primary"
          >
            Tell us about yourself
          </Heading>
          <Text color="text.secondary" fontSize="lg">
            The more we know about your studies and interests, the better we can
            help you discover your path.
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack gap={8}>
            {/* Degree Input */}
            <Box
              w="full"
              bg="bg.secondary"
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor="border.primary"
              p={8}
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon as={BookOpen} w={6} h={6} color="text.brand" />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="text.primary"
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
                bg="bg.secondary"
                borderColor="border.primary"
                color="text.primary"
                _placeholder={{ color: "text.muted" }}
                _focus={{
                  borderColor: "border.focus",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                }}
                required
              />
            </Box>

            {/* Modules Input */}
            <Box
              w="full"
              bg="bg.secondary"
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor="border.primary"
              p={8}
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon as={Target} w={6} h={6} color="text.brand" />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="text.primary"
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
                  bg="bg.secondary"
                  borderColor="border.primary"
                  color="text.primary"
                  _placeholder={{ color: "text.muted" }}
                  _focus={{
                    borderColor: "border.focus",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                  }}
                  onKeyPress={(e) => handleKeyPress(e, addModule)}
                />
                <Button
                  onClick={addModule}
                  bg="brand.600"
                  color="white"
                  _hover={{ bg: "brand.700" }}
                  px={6}
                >
                  Add
                </Button>
              </HStack>
              <Flex wrap="wrap" gap={2}>
                {formData.modules.map((module) => (
                  <Box
                    key={module}
                    bg="bg.accent"
                    color="text.brand"
                    borderRadius="full"
                    px={3}
                    py={2}
                    fontSize="sm"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Text>{module}</Text>
                    <CloseButton
                      size="sm"
                      onClick={() => removeModule(module)}
                    />
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Interests Input */}
            <Box
              w="full"
              bg="bg.secondary"
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor="border.primary"
              p={8}
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon as={Heart} w={6} h={6} color="text.brand" />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="text.primary"
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
                  bg="bg.secondary"
                  borderColor="border.primary"
                  color="text.primary"
                  _placeholder={{ color: "text.muted" }}
                  _focus={{
                    borderColor: "border.focus",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                  }}
                  onKeyPress={(e) => handleKeyPress(e, addInterest)}
                />
                <Button
                  onClick={addInterest}
                  bg="brand.600"
                  color="white"
                  _hover={{ bg: "brand.700" }}
                  px={6}
                >
                  Add
                </Button>
              </HStack>
              <Flex wrap="wrap" gap={2}>
                {formData.interests.map((interest) => (
                  <Box
                    key={interest}
                    bg="bg.accent"
                    color="text.brand"
                    borderRadius="full"
                    px={3}
                    py={2}
                    fontSize="sm"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Text>{interest}</Text>
                    <CloseButton
                      size="sm"
                      onClick={() => removeInterest(interest)}
                    />
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Goals Input */}
            <Box
              w="full"
              bg="bg.secondary"
              borderRadius="lg"
              boxShadow="sm"
              border="1px"
              borderColor="border.primary"
              p={8}
            >
              <Flex align="center" mb={6} gap={3}>
                <Icon as={TrendingUp} w={6} h={6} color="text.brand" />
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="text.primary"
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
                bg="bg.secondary"
                borderColor="border.primary"
                color="text.primary"
                _placeholder={{ color: "text.muted" }}
                _focus={{
                  borderColor: "border.focus",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
                }}
              />
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
              _disabled={{ bg: "gray.300", cursor: "not-allowed" }}
            >
              <Flex align="center" gap={2}>
                <Text>Discover My Path</Text>
                <ArrowRight size={20} />
              </Flex>
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};

export default Form;
