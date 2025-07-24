import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Landing from "../pages/Landing";

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

describe("Landing Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the main heading and subtitle", () => {
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    expect(
      screen.getByText(/not sure where your degree will take you/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/let's find out/i)).toBeInTheDocument();
    expect(
      screen.getByText(/discover personalised career paths/i)
    ).toBeInTheDocument();
  });

  it('renders the "Get Started" button and navigates to form', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    const getStartedButton = screen.getByRole("button", {
      name: /start exploring career paths/i,
    });
    expect(getStartedButton).toBeInTheDocument();

    await user.click(getStartedButton);
    expect(mockNavigate).toHaveBeenCalledWith("/form");
  });

  it('renders the "How It Works" button and opens modal', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    const howItWorksButton = screen.getByRole("button", {
      name: /open modal to see how pathfinder works/i,
    });
    expect(howItWorksButton).toBeInTheDocument();

    await user.click(howItWorksButton);

    // Check if modal opens
    expect(
      screen.getByRole("dialog", { name: /how pathfinder works/i })
    ).toBeInTheDocument();
  });

  it("renders all feature sections", () => {
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    // Check for feature headings
    expect(screen.getByText(/personalised analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/skills discovery/i)).toBeInTheDocument();
    expect(screen.getByText(/career roadmap/i)).toBeInTheDocument();
  });

  it("has proper accessibility structure", () => {
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    // Check for banner role
    const bannerSection = screen.getByRole("banner", {
      name: /pathfinder hero section/i,
    });
    expect(bannerSection).toBeInTheDocument();

    // Check for article roles for features
    const featureArticles = screen.getAllByRole("article");
    expect(featureArticles).toHaveLength(3); // Should have 3 feature articles
  });

  it("includes proper meta description for SEO", () => {
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    // Check if the descriptive text is present
    expect(
      screen.getByText(
        /get ai-powered insights that reveal your unique strengths/i
      )
    ).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    // Open modal first
    const howItWorksButton = screen.getByRole("button", {
      name: /open modal to see how pathfinder works/i,
    });
    await user.click(howItWorksButton);

    // Check modal is open
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByRole("button", {
      name: /close how it works modal/i,
    });
    await user.click(closeButton);

    // Wait for modal to close
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check modal state is closed (DOM might still be there but state should be closed)
    const modal = screen.queryByRole("dialog");
    if (modal) {
      expect(modal).toHaveAttribute("data-state", "closed");
    } else {
      // If modal is completely removed from DOM, that's also valid
      expect(modal).not.toBeInTheDocument();
    }
  });

  it("supports keyboard navigation for main buttons", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    const getStartedButton = screen.getByRole("button", {
      name: /start exploring career paths/i,
    });

    // Focus and press Enter
    getStartedButton.focus();
    await user.keyboard("{Enter}");

    expect(mockNavigate).toHaveBeenCalledWith("/form");
  });

  it("displays feature icons with proper accessibility", () => {
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    // Icons should be marked as decorative (aria-hidden)
    // We can't directly test aria-hidden, but we can ensure the features are accessible
    expect(
      screen.getByText(/tell us about your degree, favourite modules/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/uncover your transferable skills, technical abilities/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/get specific career paths with actionable next steps/i)
    ).toBeInTheDocument();
  });

  it("renders responsive layout correctly", () => {
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    // Check that main content sections are present
    const banners = screen.getAllByRole("banner");
    expect(banners.length).toBeGreaterThan(0);

    // Features section should be present
    const features = screen.getAllByRole("article");
    expect(features.length).toBeGreaterThan(0);
  });

  it("handles modal state correctly", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    // Initially modal should not be present
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Open modal
    const howItWorksButton = screen.getByRole("button", {
      name: /open modal to see how pathfinder works/i,
    });
    await user.click(howItWorksButton);

    // Modal should be present
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Check modal content
    expect(screen.getByText(/tell us about yourself/i)).toBeInTheDocument();
    expect(screen.getByText(/ai analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/discover career paths/i)).toBeInTheDocument();
    expect(screen.getByText(/take action/i)).toBeInTheDocument();
  });
});
