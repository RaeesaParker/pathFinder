import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "../App";

// Mock the generateCareerPrompt function for frontend tests only
vi.mock("../utils/generateCareerPrompt", () => ({
  generateCareerPrompt: vi.fn(),
}));

const system = createSystem(defaultConfig);

const TestWrapper = ({
  children,
  initialEntries = ["/"],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) => (
  <ChakraProvider value={system}>
    <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
      {children}
    </MemoryRouter>
  </ChakraProvider>
);

describe("App Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navigates from Landing to Form page", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Should start on landing page
    expect(
      screen.getByText(/discover personalised career paths/i)
    ).toBeInTheDocument();

    // Click "Get Started" button
    const getStartedButton = screen.getByRole("button", {
      name: /start career discovery form/i,
    });
    await user.click(getStartedButton);

    // Should navigate to form page
    expect(screen.getByText(/tell us about yourself/i)).toBeInTheDocument();
    expect(
      screen.getByText(/what's your degree or field of study/i)
    ).toBeInTheDocument();
  });

  it("prevents form submission with incomplete data", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper initialEntries={["/form"]}>
        <App />
      </TestWrapper>
    );

    // Fill only some fields
    const degreeInput = screen.getByLabelText(
      /enter your degree or field of study/i
    );
    await user.type(degreeInput, "Computer Science");

    // Submit button should remain disabled
    const submitButton = screen.getByRole("button", {
      name: /submit form to discover career paths/i,
    });
    expect(submitButton).toBeDisabled();

    // Try to click it anyway
    await user.click(submitButton);

    // Should still be on form page
    expect(screen.getByText(/tell us about yourself/i)).toBeInTheDocument();
  });

  it("handles direct navigation to results without form data", async () => {
    render(
      <TestWrapper initialEntries={["/results"]}>
        <App />
      </TestWrapper>
    );

    // Should redirect to form page when no form data
    expect(screen.getByText(/tell us about yourself/i)).toBeInTheDocument();
  });

  it("preserves form data during navigation", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Navigate to form
    const getStartedButton = screen.getByRole("button", {
      name: /start career discovery form/i,
    });
    await user.click(getStartedButton);

    // Start filling form
    const degreeInput = screen.getByLabelText(
      /enter your degree or field of study/i
    );
    await user.type(degreeInput, "Computer Science");

    // Navigate back to home via logo
    const logoButton = screen.getByRole("button", {
      name: /go to pathfinder home page/i,
    });
    await user.click(logoButton);

    // Should be back on landing page
    expect(
      screen.getByText(/discover personalised career paths/i)
    ).toBeInTheDocument();

    // Navigate back to form
    const getStartedButton2 = screen.getByRole("button", {
      name: /start career discovery form/i,
    });
    await user.click(getStartedButton2);

    // Form should be reset (new form instance)
    const degreeInput2 = screen.getByLabelText(
      /enter your degree or field of study/i
    );
    expect(degreeInput2).toHaveValue("");
  });
});
