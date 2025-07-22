import { useColorMode } from "@chakra-ui/color-mode";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowRight, Brain, Target, TrendingUp, User } from "lucide-react";
import React from "react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onGetStarted,
}) => {
  const { colorMode } = useColorMode();

  const steps = [
    {
      icon: User,
      title: "Tell Us About Yourself",
      description:
        "Share your degree, favourite modules, hobbies, and career goals. This takes just 2-3 minutes.",
      details:
        "The more details you provide, the more personalised your results will be.",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description:
        "Our intelligent system analyses your background to identify your unique strengths and transferable skills.",
      details:
        "We match your profile against thousands of career paths and success stories.",
    },
    {
      icon: Target,
      title: "Discover Career Paths",
      description:
        "Get 3 personalised career recommendations with detailed descriptions and why they're perfect for you.",
      details: "Each path includes specific next steps and actionable advice.",
    },
    {
      icon: TrendingUp,
      title: "Take Action",
      description:
        "Follow our tailored roadmap with concrete steps to start your journey toward your ideal career.",
      details:
        "Get resources, connections, and encouragement to move forward confidently.",
    },
  ];

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details: { open: boolean }) => !details.open && onClose()}
      size="cover"
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" />
        <Dialog.Positioner>
          <Dialog.Content
            bg={colorMode === "light" ? "white" : "customGray.800"}
            borderRadius="xl"
            border="1px"
            borderColor={
              colorMode === "light" ? "customGray.300" : "customGray.600"
            }
            mx={4}
            maxH="90vh"
            overflow="hidden"
          >
            <Dialog.Header
              pb={3}
              borderBottom="1px"
              borderColor={
                colorMode === "light" ? "customGray.200" : "customGray.700"
              }
            >
              <Dialog.Title
                as="h2"
                fontSize="xl"
                fontWeight="bold"
                color={colorMode === "light" ? "customGray.900" : "white"}
              >
                How PathFinder Works
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color={
                    colorMode === "light" ? "customGray.600" : "customGray.400"
                  }
                  _hover={{
                    bg:
                      colorMode === "light"
                        ? "customGray.100"
                        : "customGray.700",
                  }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Text
              fontSize="sm"
              color={
                colorMode === "light" ? "customGray.600" : "customGray.300"
              }
              fontWeight="normal"
              px={6}
              pt={3}
            >
              Discover your ideal career path in 4 simple steps
            </Text>

            <Dialog.Body py={6} overflowY="auto">
              <VStack gap={6} align="stretch">
                {steps.map((step, index) => (
                  <Box key={index}>
                    <HStack align="flex-start" gap={3} mb={3}>
                      <Flex
                        w={10}
                        h={10}
                        align="center"
                        justify="center"
                        borderRadius="full"
                        bg={colorMode === "light" ? "brand.100" : "brand.900"}
                        color="brand.600"
                        flexShrink={0}
                      >
                        <Icon as={step.icon} w={5} h={5} />
                      </Flex>
                      <Box flex={1}>
                        <HStack align="center" mb={2}>
                          <Flex
                            bg="brand.600"
                            color="white"
                            borderRadius="full"
                            w={5}
                            h={5}
                            align="center"
                            justify="center"
                            fontSize="xs"
                            fontWeight="bold"
                            flexShrink={0}
                          >
                            {index + 1}
                          </Flex>
                          <Heading
                            as="h3"
                            fontSize="md"
                            fontWeight="semibold"
                            color={
                              colorMode === "light" ? "customGray.900" : "white"
                            }
                          >
                            {step.title}
                          </Heading>
                        </HStack>
                        <Text
                          fontSize="sm"
                          color={
                            colorMode === "light"
                              ? "customGray.700"
                              : "customGray.300"
                          }
                          lineHeight="1.5"
                          mb={1}
                        >
                          {step.description}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={
                            colorMode === "light"
                              ? "customGray.500"
                              : "customGray.400"
                          }
                          fontStyle="italic"
                        >
                          {step.details}
                        </Text>
                      </Box>
                    </HStack>
                    {index < steps.length - 1 && (
                      <Flex justify="center" my={3}>
                        <Icon
                          as={ArrowRight}
                          w={4}
                          h={4}
                          color={
                            colorMode === "light"
                              ? "customGray.400"
                              : "customGray.500"
                          }
                          transform="rotate(90deg)"
                        />
                      </Flex>
                    )}
                  </Box>
                ))}
              </VStack>

              <Box
                mt={6}
                pt={4}
                borderTop="1px"
                borderColor={
                  colorMode === "light" ? "customGray.200" : "customGray.700"
                }
                textAlign="center"
              >
                <Text
                  fontSize="sm"
                  color={
                    colorMode === "light" ? "customGray.600" : "customGray.300"
                  }
                  mb={4}
                >
                  Ready to discover your perfect career path?
                </Text>
                <Button
                  bg="brand.600"
                  color="white"
                  size="md"
                  px={6}
                  py={3}
                  fontSize="md"
                  fontWeight="semibold"
                  _hover={{ bg: "brand.700" }}
                  onClick={() => {
                    onGetStarted();
                    onClose();
                  }}
                  w="full"
                >
                  <Flex align="center" gap={2}>
                    <Text>Get Started Now</Text>
                    <ArrowRight size={16} />
                  </Flex>
                </Button>
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default HowItWorksModal;
