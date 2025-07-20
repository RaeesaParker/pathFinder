# Chakra UI Theme Documentation

## Color Usage Guide

This theme file provides semantic color tokens for both light and dark modes, ensuring consistent styling across the career exploration app.

### Typography Colors

| Element | Light Mode | Dark Mode | Token |
|---------|------------|-----------|-------|
| **h1** (Main titles) | Black (#1C1C1C) | White | `text.primary` |
| **h2** (Section headings) | Red (#B20F18) | Red (#B20F18) | `text.brand` |
| **h3** (Subsection headings) | Black (#1C1C1C) | White | `text.primary` |
| **h4** (Card titles) | Red (#B20F18) | Red (#B20F18) | `text.brand` |
| **p** (Body text) | Gray (#718096) | Light Gray (#D1D5DB) | `text.secondary` |
| **Small/Muted text** | Light Gray (#A0AEC0) | Medium Gray (#9CA3AF) | `text.muted` |

### Background Colors

| Element | Light Mode | Dark Mode | Token |
|---------|------------|-----------|-------|
| **Main background** | Off-white (#FAFAFA) | Dark Gray (#1C1C1C) | `bg.primary` |
| **Card backgrounds** | White | Dark Gray (#2D3748) | `bg.secondary` |
| **Accent backgrounds** | Light Red (#FEE2E2) | Dark Red (#450A0A) | `bg.accent` |

### Interactive Elements

| Element | Light Mode | Dark Mode | Token |
|---------|------------|-----------|-------|
| **Primary buttons** | Red (#B20F18) bg, White text | Red (#B20F18) bg, White text | `brand.600` |
| **Secondary buttons** | Transparent bg, Gray border | Transparent bg, Gray border | `border.primary` |
| **Input fields** | White bg, Gray border | Dark Gray bg, Gray border | `bg.secondary` |
| **Tags** | Light Red bg, Red text | Dark Red bg, Red text | `bg.accent` |

### Border Colors

| Element | Light Mode | Dark Mode | Token |
|---------|------------|-----------|-------|
| **Default borders** | Light Gray (#D9D9D9) | Medium Gray (#4A5568) | `border.primary` |
| **Focus borders** | Red (#B20F18) | Red (#B20F18) | `border.focus` |

## Usage Examples

```tsx
// Using semantic tokens
<Heading variant="h2">Career Insights</Heading>
<Text variant="body">This is body text that adapts to theme</Text>
<Button variant="primary">Get Started</Button>

// Using color tokens directly
<Box bg="bg.primary" color="text.primary">
  Content that adapts to theme
</Box>
```

## Component Variants

### Heading Variants
- `h1`: Main page titles
- `h2`: Section headings (red in both modes)
- `h3`: Subsection headings
- `h4`: Card titles (red in both modes)

### Text Variants
- `body`: Standard body text
- `bodyLarge`: Larger body text
- `muted`: Muted/secondary text
- `brand`: Brand-colored text (red)

### Button Variants
- `primary`: Red background, white text
- `secondary`: Outlined button with theme-adaptive colors
- `ghost`: Subtle background with theme-adaptive colors

This theme ensures the app maintains its modern, professional aesthetic while providing excellent readability and user experience in both light and dark modes.