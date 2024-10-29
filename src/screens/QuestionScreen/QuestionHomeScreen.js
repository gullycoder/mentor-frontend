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
import {
  ButtonComponent,
  TypingText,
  LoadingIndicator,
} from "../../components";
import { colors, spacing, typography } from "../../styles"; // Import your custom styles
import { useSelector, useDispatch } from "react-redux";
import { getTotalQuestionsAttemptedByUser } from "../../redux";

// Screen Dimensions
const { height, width } = Dimensions.get("window");

const QuestionHomeScreen = ({ navigation }) => {
  // Get the rules details from the redux state
  const { rules } = useSelector((state) => state.rule);
  const { isAttemptedQuestionsLoading } = useSelector(
    (state) => state.attemptedQuestion
  );
  const { typingText, examContents } = useSelector((state) => state.rule.rules);
  console.log("examContents", examContents);
  // Data for the grid
  const girdArray = examContents.examName || [
    "UPSC",
    "Mains coming soon",
    "State PCS coming soon",
  ];
  const dispatch = useDispatch();

  //fetch the attempted questions results from Api
  const handelFetchAttemptedQuestions = async () => {
    await dispatch(getTotalQuestionsAttemptedByUser());
    navigation.navigate("QuestionResultScreen");
  };

  //navigation logic
  const handelNavigation = (source, topic) => {
    navigation.navigate(
      topic === "PYQs" ? "QuestionFilterScreen" : "QuestionAnalysisScreen", // Navigate to the QuestionFilterScreen if the topic is PYQs, else navigate to the QuestionAnalysisScreen

      { source: source } // Pass the selected source to the next screen
    );
  };

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
            <Text style={styles.fixedText}>Practice </Text>
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
            {girdArray.map((source, index) =>
              examContents.examContent[source]?.map((topic, index) => (
                <View key={index} style={styles.block}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => handelNavigation(source, topic)}
                  >
                    <Text
                      style={[styles.blockText, { color: colors.primary.main }]}
                    >
                      {source}
                    </Text>
                    <Text
                      style={[styles.blockText]} // Change the color of the text
                    >
                      {topic}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
          <ButtonComponent // Button to navigate to the QuestionResultScreen
            title="View Results"
            onPress={handelFetchAttemptedQuestions}
          />
        </View>
      </ScrollView>
      {/* Loading Indicator */}
      {isAttemptedQuestionsLoading && <LoadingIndicator />}
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
