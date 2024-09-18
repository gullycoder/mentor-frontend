import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TypingText } from "../../components";
import { colors, spacing, typography } from "../../styles"; // Import your custom styles

// Data for the changing text
const typingText = [
  "Peehu is good girl",
  "Arjun is good boy",
  "Amyra is kind girl",
];

// Data for the grid
girdArray = [
  "Previous Year Papers",
  "Mock Tests.. Upcoming",
  "Other Exam... upcoming",
];
// Screen Dimensions
const { height, width } = Dimensions.get("window");

const QuestionHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image Section */}
      <ImageBackground
        source={require("../../assets/images/Newspaper.png")} // Path to background image
        style={styles.backgroundImage}
      >
        <View style={styles.backgroundView}>
          {/* Fixed Text Section */}
          <View style={styles.fixedTextContainer}>
            <Text style={styles.fixedText}>Practice for </Text>
            <View>
              <TypingText textArray={typingText} />
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Square Blocks Section */}
        <View style={styles.questionBlockContainer}>
          <Text style={styles.heading}>Start your practice now:</Text>

          <View style={styles.grid}>
            {girdArray.map((source, index) => (
              <View key={index} style={styles.block}>
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate(
                      "QuestionFilterScreen",

                      { source: source } // Pass the selected source to the next screen
                    )
                  }
                >
                  <Text style={styles.blockText}>{source}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  backgroundImage: {
    width: "100%",
    height: height * 0.4, // Upper 30% of the screen
    justifyContent: "center", // Centers content vertically in the image
    // full image is displayed in the background
  },
  backgroundView: {
    width: "100%",
    height: height * 0.4, // Upper 30% of the screen
    justifyContent: "center", // Centers content vertically in the image
  },
  fixedTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: spacing.medium,
  },
  fixedText: {
    ...typography.heading1,
  },
  scrollContent: {
    paddingVertical: spacing.mediumLarge,
  },
  questionBlockContainer: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.large,
  },
  heading: {
    ...typography.heading2,
    color: colors.text.primary,
    marginBottom: spacing.large,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  block: {
    width: "30%",
    height: 100,
    backgroundColor: colors.surface.dark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.medium,
    borderRadius: 8,
    elevation: 2, // for subtle shadow effect
  },
  blockText: {
    ...typography.button,
    color: colors.text.secondary,
    textAlign: "center",
  },
});

export default QuestionHomeScreen;
