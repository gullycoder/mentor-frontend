import React, { useState, useEffect } from "react";
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

export const QuestionCard = ({
  currentQuestion,
  attemptedQuestion,
  setAttemptedQuestions,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Combined useEffect to load selected option when question changes
  useEffect(() => {
    const attempted = attemptedQuestion.find(
      (question) => question.questionId === currentQuestion._id
    );

    if (attempted) {
      setSelectedOption(attempted.selectedOption); // Load the previously selected option
    } else {
      setSelectedOption(null); // Reset selected option for new question
    }

    setShowExplanation(false); // Reset explanation when question changes
  }, [currentQuestion, attemptedQuestion]);

  const isCorrect = selectedOption === currentQuestion?.questionCorrectOption;
  const correctOption = currentQuestion?.questionCorrectOption;

  const handleOptionSelect = (optionKey) => {
    // Set the selected option
    setSelectedOption(optionKey);

    // Immediately store the attempted question after selecting an option
    setAttemptedQuestions((prev) => [
      ...prev.filter((question) => question.questionId !== currentQuestion._id),
      {
        questionId: currentQuestion._id,
        selectedOption: optionKey,
        isCorrect: optionKey === correctOption,
        questionTopic: currentQuestion.questionTopic,
        questionSubtopic: currentQuestion.questionSubtopic,
      },
    ]);
  };

  return (
    <ScrollView>
      {/* Question Info */}
      <Text style={styles.questionText}>{currentQuestion?.questionText}</Text>
      {currentQuestion?.questionYear && (
        <Text style={styles.questionYear}>
          {currentQuestion?.questionSource} {currentQuestion?.questionYear}
        </Text>
      )}

      {currentQuestion?.questionImage && (
        <Image
          source={{ uri: currentQuestion?.questionImage }}
          style={styles.questionImage}
        />
      )}

      {/* Options */}
      <View style={styles.optionsContainer}>
        {Object.entries(currentQuestion?.questionOptions).map(
          ([key, option]) => {
            let optionStyle = styles.optionButton;

            // Determine option style based on correctness and selected option
            if (selectedOption) {
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
                disabled={!!selectedOption} // Disable options after one is selected
              >
                <Text style={styles.optionText}>
                  {key.toUpperCase()}. {option}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>

      {/* Explanation Button */}
      {selectedOption && (
        <ButtonComponent
          title="Details"
          onPress={() => setShowExplanation(true)}
          variant="accent"
        />
      )}

      {/* Explanation Section */}
      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>
            {currentQuestion?.questionAnswerExplanation}
          </Text>
          {currentQuestion?.questionAnswerExplanationImage && (
            <Image
              source={{ uri: currentQuestion?.questionAnswerExplanationImage }}
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
  correctOption: {
    padding: spacing.smallMedium,
    borderRadius: spacing.small,
    backgroundColor: colors.success.light, // Highlight for correct option
    marginBottom: spacing.small,
  },
  wrongOption: {
    padding: spacing.smallMedium,
    borderRadius: spacing.small,
    backgroundColor: colors.error.light, // Highlight for wrong option
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
