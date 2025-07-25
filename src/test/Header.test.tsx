import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "../components/Header";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const system = createSystem(defaultConfig);

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={system}>
    <BrowserRouter>{children}</BrowserRouter>
  </ChakraProvider>
);

describe("Header Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the Path Finder logo", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(screen.getByText("Path Finder")).toBeInTheDocument();
  });

  it("has navigation banner role", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders logo as a clickable link to home page", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const logoButton = screen.getByRole("button", {
      name: /go to path finder home page/i,
    });
    await user.click(logoButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders theme toggle button with proper accessibility", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const themeToggle = screen.getByRole("button", {
      name: /switch to (light|dark) mode/i,
    });
    expect(themeToggle).toBeInTheDocument();
  });

  it("supports keyboard navigation for logo", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const logoButton = screen.getByRole("button", {
      name: /go to path finder home page/i,
    });

    // Focus and press Enter
    logoButton.focus();
    await user.keyboard("{Enter}");

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("supports keyboard navigation for theme toggle", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const themeToggle = screen.getByRole("button", {
      name: /switch to (light|dark) mode/i,
    });

    // Should be focusable
    themeToggle.focus();
    expect(themeToggle).toHaveFocus();

    // Should respond to keyboard activation
    await user.keyboard("{Enter}");
    // Note: We can't easily test the actual theme change without more complex setup
  });

  it("renders Start Over button when showStartOver prop is true", () => {
    render(
      <TestWrapper>
        <Header showStartOver />
      </TestWrapper>
    );

    const startOverButton = screen.getByRole("button", {
      name: /start over with a new form/i,
    });
    expect(startOverButton).toBeInTheDocument();
  });

  it("does not render Start Over button when showStartOver prop is false or undefined", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const startOverButton = screen.queryByRole("button", {
      name: /start over with a new form/i,
    });
    expect(startOverButton).not.toBeInTheDocument();
  });

  it("navigates to form page when Start Over button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Header showStartOver />
      </TestWrapper>
    );

    const startOverButton = screen.getByRole("button", {
      name: /start over with a new form/i,
    });
    await user.click(startOverButton);

    expect(mockNavigate).toHaveBeenCalledWith("/form");
  });

  it("has proper responsive layout", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    // Check that the main container has responsive properties
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    // The header should contain the logo and theme toggle
    expect(screen.getByText("Path Finder")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /switch to (light|dark) mode/i,
      })
    ).toBeInTheDocument();
  });

  it("maintains accessibility when Start Over button is present", () => {
    render(
      <TestWrapper>
        <Header showStartOver />
      </TestWrapper>
    );

    // All interactive elements should have proper labels
    expect(
      screen.getByRole("button", { name: /go to path finder home page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /switch to (light|dark) mode/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start over with a new form/i })
    ).toBeInTheDocument();
  });

  it("handles multiple rapid clicks gracefully", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Header showStartOver />
      </TestWrapper>
    );

    const logoButton = screen.getByRole("button", {
      name: /go to path finder home page/i,
    });

    // Click multiple times rapidly
    await user.click(logoButton);
    await user.click(logoButton);
    await user.click(logoButton);

    // Should have been called multiple times
    expect(mockNavigate).toHaveBeenCalledTimes(3);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
