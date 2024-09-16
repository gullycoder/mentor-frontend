import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { typography, colors, spacing } from "../../styles"; // Import your typography styles
import { ButtonComponent } from "../../components"; // Import your custom button component

const ProfileHomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>App Typography</Text>

      {/* Display Heading styles */}
      <View style={styles.textBlock}>
        <Text style={styles.heading1}>Heading 1 - Largest</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.heading2}>Heading 2 - Secondary</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.heading3}>Heading 3 - Smaller</Text>
      </View>
      <View style={styles.textBlock}>
        <ButtonComponent
          title="submit"
          onPress={
            () => navigation.navigate("HomeScreen2") // Navigate to the Login screen
          }
          variant="accent"
          disabled={false}
        />
      </View>

      {/* Display Subtitle styles */}
      <View style={styles.textBlock}>
        <Text style={styles.subtitle1}>Subtitle 1 - Larger Subtitles</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.subtitle2}>Subtitle 2 - Smaller Subtitles</Text>
      </View>

      {/* Display Body styles */}
      <View style={styles.textBlock}>
        <Text style={styles.body1}>Body 1 - Default Body Text</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.body2}>Body 2 - Secondary Body Text</Text>
      </View>

      {/* Display Button styles */}
      <View style={styles.textBlock}>
        <Text style={styles.button}>Button Text</Text>
      </View>

      {/* Display Caption and Overline */}
      <View style={styles.textBlock}>
        <Text style={styles.caption}>Caption Text</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.overline}>Overline Text</Text>
      </View>

      {/* Display Input and Label styles */}
      <View style={styles.textBlock}>
        <Text style={styles.input}>Input Field Text</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.label}>Form Label Text</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light, // Your background color
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  textBlock: {
    marginVertical: 10,
  },
  heading1: typography.heading1, // Applying updated heading styles
  heading2: typography.heading2,
  heading3: typography.heading3,
  subtitle1: typography.subtitle1,
  subtitle2: typography.subtitle2,
  body1: { ...typography.body1, color: colors.text.primary }, // Customizing body text color
  body2: typography.body2,
  button: {
    ...typography.button,
    backgroundColor: "#207cf7", // Example button background
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: "#fff", // White text for contrast
    textAlign: "center",
    borderRadius: 5,
  },
  caption: typography.caption,
  overline: typography.overline,
  input: typography.input,
  label: typography.label,
});
