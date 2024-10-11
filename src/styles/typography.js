import { scale } from "./scale";
export const typography = {
  heading1: {
    fontSize: scale(22), // Slightly reduced for mobile
    fontWeight: "600",
    letterSpacing: 0.15,
    lineHeight: scale(30), // Increased for better readability
    // Use for main titles on mobile, large but still fitting within screen constraints.
  },
  heading2: {
    fontSize: scale(20), // Reduced for mobile
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: scale(28), // Increased for better readability
    // Use for section titles, appropriately scaled for mobile.
  },
  heading3: {
    fontSize: scale(18), // Reduced for mobile
    fontWeight: "500",
    letterSpacing: 0.05,
    lineHeight: scale(26), // Increased for clarity
    // Use for smaller headings on cards or sub-sections.
  },
  subtitle1: {
    fontSize: scale(16), // Reduced for mobile
    fontWeight: "400",
    letterSpacing: 0.15,
    lineHeight: scale(24), // Good line height for paragraph text on mobile
    // Use for descriptive or subtitle text below headings.
  },
  subtitle2: {
    fontSize: scale(14), // Reduced for mobile
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: scale(20), // Increased for better spacing
    // Use for small captions or explanatory text.
  },
  body1: {
    fontSize: scale(16), // Kept the same for readability
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: scale(26), // Increased for better spacing
    // Use for main body text; readable and comfortable for long-form text.
  },
  body2: {
    fontSize: scale(14), // Reduced for mobile
    fontWeight: "400",
    letterSpacing: 0.25,
    lineHeight: scale(22), // Increased for clarity
    // Use for secondary text, shorter paragraphs.
  },
  button: {
    fontSize: scale(14), // Same size but ensures visibility
    fontWeight: "600",
    letterSpacing: 1.25,
    textTransform: "uppercase",
    lineHeight: scale(16), // Matches button size for good visual balance
    // Use for buttons, easily tappable text size on mobile.
  },
  caption: {
    fontSize: scale(12), // Reduced for mobile
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: scale(18), // Increased for readability
    // Use for image captions, small labels.
  },
  overline: {
    fontSize: scale(10), // Small uppercase text
    fontWeight: "500",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    lineHeight: scale(14), // Smallest text but still readable on mobile
    // Use for labels above headings or for categorizing sections.
  },
  input: {
    fontSize: scale(18), // Increased for better readability in forms
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: scale(26), // Good line height for input text
    // Use for input text inside fields, larger to improve readability on mobile.
  },
  label: {
    fontSize: scale(14), // Reduced for mobile
    fontWeight: "500",
    letterSpacing: 0.15,
    lineHeight: scale(20), // Increased for better spacing
    // Use for form labels next to input fields, ensuring clarity and contrast with input text.
  },
};
