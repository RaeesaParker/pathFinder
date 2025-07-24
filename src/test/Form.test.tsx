import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Form from "../pages/Form";

// Mock the react-router-dom navigate function
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const system = createSystem(defaultConfig);

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={system}>
    <BrowserRouter>{children}</BrowserRouter>
  </ChakraProvider>
);

describe("Form Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders all form sections", () => {
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    // Check if all form sections are present
    expect(
      screen.getByText("What's your degree or field of study?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Which modules or topics have you enjoyed?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("What are your hobbies and interests?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Any specific career goals or dreams?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("What are your life goals and values?")
    ).toBeInTheDocument();
  });

  it("disables submit button when form is incomplete", () => {
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    const submitButton = screen.getByRole("button", {
      name: /submit form to discover career paths/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it("enables submit button only when all required fields are filled", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    const submitButton = screen.getByRole("button", {
      name: /submit form to discover career paths/i,
    });

    // Fill degree field
    const degreeInput = screen.getByLabelText(
      /enter your degree or field of study/i
    );
    await user.type(degreeInput, "Computer Science");
    expect(submitButton).toBeDisabled();

    // Add a module
    const moduleInput = screen.getByLabelText(
      /enter a module or topic you enjoyed/i
    );
    await user.type(moduleInput, "Data Structures");
    const addModuleButton = screen.getByRole("button", {
      name: /add module to list/i,
    });
    await user.click(addModuleButton);
    expect(submitButton).toBeDisabled();

    // Add an interest
    const interestInput = screen.getByLabelText(/enter a hobby or interest/i);
    await user.type(interestInput, "Photography");
    const addInterestButton = screen.getByRole("button", {
      name: /add interest to list/i,
    });
    await user.click(addInterestButton);
    expect(submitButton).toBeDisabled();

    // Fill career goals
    const goalsTextarea = screen.getByLabelText(
      /enter your career goals and dreams/i
    );
    await user.type(goalsTextarea, "I want to work in tech and make an impact");
    expect(submitButton).toBeDisabled();

    // Fill life goals (last required field)
    const lifeGoalsTextarea = screen.getByLabelText(
      /enter your life goals and personal values/i
    );
    await user.type(
      lifeGoalsTextarea,
      "I want work-life balance and to help others"
    );

    // Now submit button should be enabled
    expect(submitButton).toBeEnabled();
  });

  it("adds and removes modules correctly", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    const moduleInput = screen.getByLabelText(
      /enter a module or topic you enjoyed/i
    );
    const addButton = screen.getByRole("button", {
      name: /add module to list/i,
    });

    // Add a module
    await user.type(moduleInput, "Data Structures");
    await user.click(addButton);

    // Check if module is displayed
    expect(screen.getByText("Data Structures")).toBeInTheDocument();
    expect(moduleInput).toHaveValue("");

    // Remove the module
    const removeButton = screen.getByRole("button", {
      name: /remove data structures from modules list/i,
    });
    await user.click(removeButton);

    // Check if module is removed
    expect(screen.queryByText("Data Structures")).not.toBeInTheDocument();
  });

  it("adds and removes interests correctly", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    const interestInput = screen.getByLabelText(/enter a hobby or interest/i);
    const addButton = screen.getByRole("button", {
      name: /add interest to list/i,
    });

    // Add an interest
    await user.type(interestInput, "Photography");
    await user.click(addButton);

    // Check if interest is displayed
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(interestInput).toHaveValue("");

    // Remove the interest
    const removeButton = screen.getByRole("button", {
      name: /remove photography from interests list/i,
    });
    await user.click(removeButton);

    // Check if interest is removed
    expect(screen.queryByText("Photography")).not.toBeInTheDocument();
  });

  it("prevents duplicate modules", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    const moduleInput = screen.getByLabelText(
      /enter a module or topic you enjoyed/i
    );
    const addButton = screen.getByRole("button", {
      name: /add module to list/i,
    });

    // Add a module twice
    await user.type(moduleInput, "Data Structures");
    await user.click(addButton);
    await user.type(moduleInput, "Data Structures");
    await user.click(addButton);

    // Should only have one instance
    const modules = screen.getAllByText("Data Structures");
    expect(modules).toHaveLength(1);
  });

  it("prevents duplicate interests", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    const interestInput = screen.getByLabelText(/enter a hobby or interest/i);
    const addButton = screen.getByRole("button", {
      name: /add interest to list/i,
    });

    // Add an interest twice
    await user.type(interestInput, "Photography");
    await user.click(addButton);
    await user.type(interestInput, "Photography");
    await user.click(addButton);

    // Should only have one instance
    const interests = screen.getAllByText("Photography");
    expect(interests).toHaveLength(1);
  });

  it("supports keyboard navigation for adding modules", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    const moduleInput = screen.getByLabelText(
      /enter a module or topic you enjoyed/i
    );

    // Add module using Enter key
    await user.type(moduleInput, "Data Structures");
    await user.keyboard("{Enter}");

    // Check if module is displayed
    expect(screen.getByText("Data Structures")).toBeInTheDocument();
    expect(moduleInput).toHaveValue("");
  });

  it("supports keyboard navigation for adding interests", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    const interestInput = screen.getByLabelText(/enter a hobby or interest/i);

    // Add interest using Enter key
    await user.type(interestInput, "Photography");
    await user.keyboard("{Enter}");

    // Check if interest is displayed
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(interestInput).toHaveValue("");
  });

  it("navigates to results page when form is submitted with all required fields", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    // Fill all required fields
    const degreeInput = screen.getByLabelText(
      /enter your degree or field of study/i
    );
    await user.type(degreeInput, "Computer Science");

    const moduleInput = screen.getByLabelText(
      /enter a module or topic you enjoyed/i
    );
    await user.type(moduleInput, "Data Structures");
    await user.click(
      screen.getByRole("button", { name: /add module to list/i })
    );

    const interestInput = screen.getByLabelText(/enter a hobby or interest/i);
    await user.type(interestInput, "Photography");
    await user.click(
      screen.getByRole("button", { name: /add interest to list/i })
    );

    const goalsTextarea = screen.getByLabelText(
      /enter your career goals and dreams/i
    );
    await user.type(goalsTextarea, "I want to work in tech");

    const lifeGoalsTextarea = screen.getByLabelText(
      /enter your life goals and personal values/i
    );
    await user.type(lifeGoalsTextarea, "I want work-life balance");

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /submit form to discover career paths/i,
    });
    await user.click(submitButton);

    // Check if navigate was called with correct parameters
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/results", {
        state: {
          formData: {
            degree: "Computer Science",
            modules: ["Data Structures"],
            interests: ["Photography"],
            goals: "I want to work in tech",
            lifeGoals: "I want work-life balance",
          },
        },
      });
    });
  });

  it("has proper accessibility attributes", () => {
    render(
      <TestWrapper>
        <Form />
      </TestWrapper>
    );

    // Check for form role and label
    const form = screen.getByRole("form", { name: /career discovery form/i });
    expect(form).toBeInTheDocument();

    // Check for proper labeling of inputs
    expect(
      screen.getByLabelText(/enter your degree or field of study/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enter a module or topic you enjoyed/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enter a hobby or interest/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enter your career goals and dreams/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enter your life goals and personal values/i)
    ).toBeInTheDocument();

    // Check for help text associations
    expect(
      screen.getByText(/this helps us understand your academic background/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/add modules one at a time/i)).toBeInTheDocument();
    expect(
      screen.getByText(/add interests one at a time/i)
    ).toBeInTheDocument();
  });
});
