export const colors = {
  primary: {
    lightest: "#a3cfff", // Softest light blue tint, good for backgrounds or subtle highlights
    lighter: "#6ca9ff", // Original light blue, ideal for hover/disabled states
    light: "#4d98ff", // Slightly deeper light blue, for buttons or active links
    main: "#207cf7", // Default primary blue, used for main buttons and primary actions
    mediumDark: "#1a66cc", // Medium blue, good for focus or hover states on darker backgrounds
    dark: "#1455b2", // Original dark blue, for active states or selected elements
    darker: "#0e3e85", // Very dark blue, used for shadow or deep accents
    darkest: "#082957", // Almost navy, for very deep contrast areas
    tint1: "#e5f0ff", // Lightest blue tint, useful for backgrounds or cards
    tint2: "#cfe0ff", // Slightly stronger tint, good for section highlights
    onPrimary: "#ffffff", // White text/icons on primary surfaces
  },

  secondary: {
    lightest: "#b8e8b9", // Softest green tint, good for backgrounds or subtle highlights
    lighter: "#77d579", // Original lighter green, great for hover/disabled states
    light: "#65cc66", // Slightly deeper light green, for buttons or active elements
    main: "#4ab34c", // Default primary green, for primary buttons and actions
    mediumDark: "#419c42", // A more saturated green for hover/focus states
    dark: "#357c36", // Original darker green, for active buttons or selected states
    darker: "#2a5f2b", // Deeper green for shadow accents or strong contrasts
    darkest: "#1e431f", // Almost forest green, great for very deep contrasts
    tint1: "#e7f5e8", // Light green tint for backgrounds or cards
    tint2: "#cef0d0", // Stronger green tint for section highlights or subtle dividers
    onSecondary: "#ffffff", // White text/icons on secondary surfaces
  },

  accent: {
    light: "#ffe5e5", // Lighter pink for subtle highlights
    main: "#fdf1f1", // Default pink for badges or highlights
    dark: "#f4b8b8", // Darker pink for contrast
    onAccent: "#333333", // Dark text on accent-colored backgrounds
  },
  background: {
    lightest: "#ffffff", // Brightest white, used for the most elevated sections like cards or modals
    lighter: "#fcfcfd", // Very soft off-white, ideal for lightly raised sections
    default: "#f9f9fb", // Default off-white, used for main app background
    mediumLight: "#f0f0f2", // A soft light grey, good for background areas that need subtle contrast
    light: "#eeeeee", // A muted light grey, to define elevated elements or containers
    medium: "#dcdce0", // A slightly darker shade for section breaks or lightly shaded areas
    dark: "#e1e1e4", // A darker variant for sidebars or headers, still light enough for readability
    darker: "#c4c4c7", // Darkest variant for deeper sections or footers
    darkest: "#a5a5a8", // Darker grey for strong background contrast or dividers
    shadow: "#f1f1f1", // Very soft shadow background for depth effects
    tint1: "#f7f7f9", // A subtle tint for slightly raised backgrounds
    tint2: "#ebebee", // A slightly more prominent tint for section highlights
    onBackground: "#333333", // Dark text/icons on background surfaces
  },

  surface: {
    light: "#ffffff", // Light surface color (e.g., for cards, sheets)
    dark: "#e1e1e4", // Darker surface variant
    onSurface: "#333333", // Text/icons on surface
  },
  error: {
    light: "#ff6b6b", // Lighter red for error highlights
    main: "#ff4c4c", // Default error red
    dark: "#b33535", // Darker red for error states
    onError: "#ffffff", // Text/icons on error surfaces
  },
  warning: {
    light: "#ffd580", // Lighter yellow for warnings
    main: "#ffb74d", // Default warning yellow
    dark: "#b2852e", // Darker yellow for warning states
    onWarning: "#333333", // Dark text on warning surfaces (good contrast)
  },
  success: {
    light: "#a4e1a4", // Lighter green for success highlights
    main: "#4caf50", // Default success green
    dark: "#357a38", // Darker green for success states
    onSuccess: "#ffffff", // White text/icons on success surfaces
  },
  info: {
    light: "#81d4fa", // Lighter blue for information highlights
    main: "#29b6f6", // Default info blue
    dark: "#0288d1", // Darker blue for info states
    onInfo: "#ffffff", // White text/icons on info surfaces
  },
  text: {
    primary: "#333333", // Default dark text
    secondary: "#666666", // Secondary text color for less important text
    disabled: "#999999", // Disabled text color (low contrast)
    hint: "#bbbbbb", // Hint text for placeholders, subtle
    link: "#207cf7", // Link color (blue, matching secondary)
    error: "#ff4c4c", // Error text color (matches error red)
    onPrimary: "#ffffff", // Text/icons on primary background
    onSecondary: "#ffffff", // Text/icons on secondary background
    onError: "#ffffff", // Text/icons on error background
    onSuccess: "#ffffff", // Text/icons on success background
    onWarning: "#333333", // Text/icons on warning background (dark for contrast)
  },
  shadows: {
    light: "rgba(0, 0, 0, 0.1)", // Subtle shadow for very light elements
    medium: "rgba(0, 0, 0, 0.2)", // Moderate shadow for raised elements
    main: "rgba(0, 0, 0, 0.3)", // Default shadow for moderate depth
    dark: "rgba(0, 0, 0, 0.5)", // Dark shadow for deeper elements
    darkest: "rgba(0, 0, 0, 0.7)", // Heaviest shadow for modal overlays
  },
};
