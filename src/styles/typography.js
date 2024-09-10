export const typography = {
  heading1: {
    fontSize: 22, // Slightly reduced for mobile
    fontWeight: "600",
    letterSpacing: 0.15,
    lineHeight: 30, // Increased for better readability
    // Use for main titles on mobile, large but still fitting within screen constraints.
  },
  heading2: {
    fontSize: 20, // Reduced for mobile
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 28,
    // Use for section titles, appropriately scaled for mobile.
  },
  heading3: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.05,
    lineHeight: 26, // Increased for clarity
    // Use for smaller headings on cards or sub-sections.
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 0.15,
    lineHeight: 24, // Good line height for paragraph text on mobile
    // Use for descriptive or subtitle text below headings.
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
    // Use for small captions or explanatory text.
  },
  body1: {
    fontSize: 16, // Kept the same for readability
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 26, // Increased for better spacing
    // Use for main body text; readable and comfortable for long-form text.
  },
  body2: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.25,
    lineHeight: 22, // Increased for clarity
    // Use for secondary text, shorter paragraphs.
  },
  button: {
    fontSize: 14, // Same size but ensures visibility
    fontWeight: "600",
    letterSpacing: 1.25,
    textTransform: "uppercase",
    lineHeight: 16, // Matches button size for good visual balance
    // Use for buttons, easily tappable text size on mobile.
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: 18, // Increased for readability
    // Use for image captions, small labels.
  },
  overline: {
    fontSize: 10, // Small uppercase text
    fontWeight: "500",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    lineHeight: 14, // Smallest text but still readable on mobile
    // Use for labels above headings or for categorizing sections.
  },
  input: {
    fontSize: 18, // Increased for better readability in forms
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 26,
    // Use for input text inside fields, larger to improve readability on mobile.
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.15,
    lineHeight: 20,
    // Use for form labels next to input fields, ensuring clarity and contrast with input text.
  },
};
