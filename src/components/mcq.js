import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ButtonComponent } from "../components/button"; //
import { colors, typography, spacing } from "../styles";

export const QuestionCard = ({ currentQuestion }) => {
  console.log("currentQuestion", currentQuestion);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Reset state when the question changes
  React.useEffect(() => {
    setSelectedOption(null);
    setSubmitted(false);
    setShowExplanation(false);
  }, [currentQuestion]);

  const handleOptionSelect = (optionKey) => {
    setSelectedOption(optionKey);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const isCorrect = selectedOption === currentQuestion.questionCorrectOption;
  const correctOption = currentQuestion.questionCorrectOption;

  return (
    <ScrollView>
      {/* Question Info */}
      <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      {currentQuestion.questionYear && (
        <Text style={styles.questionYear}>
          {currentQuestion.questionSource} {currentQuestion.questionYear}
        </Text>
      )}

      {currentQuestion.questionImage && (
        <Image
          source={{ uri: currentQuestion.questionImage }}
          style={styles.questionImage}
        />
      )}

      {/* Options */}
      <View style={styles.optionsContainer}>
        {Object.entries(currentQuestion.questionOptions).map(
          ([key, option]) => {
            let optionStyle = styles.optionButton;
            // Highlight selected option before submission
            if (key === selectedOption && !submitted) {
              optionStyle = styles.selectedOption;
            }
            if (submitted) {
              if (key === correctOption) {
                optionStyle = styles.correctOption;
              } else if (
                key === selectedOption &&
                selectedOption !== correctOption
              ) {
                optionStyle = styles.wrongOption;
              }
            }

            return (
              <TouchableOpacity
                key={key}
                style={optionStyle}
                onPress={() => handleOptionSelect(key)}
                disabled={submitted}
              >
                <Text style={styles.optionText}>
                  {key.toUpperCase()}. {option}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>

      {/* Submit and Explanation */}
      {!submitted ? (
        <ButtonComponent
          title="Submit"
          onPress={handleSubmit}
          disabled={!selectedOption}
        />
      ) : (
        <ButtonComponent
          title="Show Explanation"
          onPress={() => setShowExplanation(true)}
          variant="accent"
        />
      )}

      {/* Explanation Section */}
      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>
            {currentQuestion.questionAnswerExplanation}
          </Text>
          {currentQuestion.questionAnswerExplanationImage && (
            <Image
              source={{ uri: currentQuestion.questionAnswerExplanationImage }}
              style={styles.explanationImage}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    backgroundColor: colors.background.default,
  },
  questionText: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  questionYear: {
    ...typography.subtitle2,
    color: colors.text.secondary,
    marginBottom: spacing.small,
  },
  questionSource: {
    ...typography.subtitle2,
    color: colors.text.secondary,
    marginBottom: spacing.small,
  },
  questionImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: spacing.medium,
  },
  optionsContainer: {
    marginBottom: spacing.medium,
  },
  optionButton: {
    padding: spacing.smallMedium,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.shadows.light,
    marginBottom: spacing.small,
    backgroundColor: colors.surface.light,
  },
  selectedOption: {
    padding: spacing.smallMedium,
    borderRadius: spacing.small,
    backgroundColor: colors.shadows.light, // Highlight for selected option before submission
    marginBottom: spacing.small,
  },
  correctOption: {
    padding: spacing.smallMedium,
    borderRadius: spacing.small,
    backgroundColor: colors.success.light, // Highlight for correct option after submission
    marginBottom: spacing.small,
  },
  wrongOption: {
    padding: spacing.smallMedium,
    borderRadius: spacing.small,
    backgroundColor: colors.error.light, // Highlight for wrong option after submission
    marginBottom: spacing.small,
  },
  optionText: {
    ...typography.body1,
    color: colors.text.primary,
  },

  explanationContainer: {
    marginTop: spacing.medium,
    padding: spacing.smallMedium,
    backgroundColor: colors.background.light,
    borderRadius: spacing.small,
  },
  explanationText: {
    ...typography.body2,
    color: colors.text.primary,
  },
  explanationImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 16,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
