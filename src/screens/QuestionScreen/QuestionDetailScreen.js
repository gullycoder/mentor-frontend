import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ButtonComponent } from "../../components"; // Importing the ButtonComponent from the components folder.
import { colors, typography } from "../../styles"; // Assuming you have the colors and typography in a theme file.
import { questions } from "../../temp/data"; // Assuming you have the questions data in a separate file.

const MCQScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionKey) => {
    setSelectedOption(optionKey);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    resetState();
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    resetState();
  };

  const resetState = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setShowExplanation(false);
  };

  const isCorrect = selectedOption === currentQuestion.questionCorrectOption;
  const correctOption = currentQuestion.questionCorrectOption;

  return (
    <ScrollView style={styles.container}>
      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handlePreviousQuestion}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => alert("Quiz Finished")}
          >
            <Text style={styles.navButtonText}>End Quiz</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Question Info */}
      <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      {currentQuestion.questionYear && (
        <Text style={styles.questionYear}>
          Year: {currentQuestion.questionYear}
        </Text>
      )}
      {currentQuestion.questionSource && (
        <Text style={styles.questionSource}>
          Source: {currentQuestion.questionSource}
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
        <TouchableOpacity
          style={styles.explanationButton}
          onPress={() => setShowExplanation(true)}
        >
          <Text style={styles.explanationButtonText}>Show Explanation</Text>
        </TouchableOpacity>
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
    padding: 16,
    backgroundColor: colors.background.default,
  },
  questionText: {
    ...typography.heading3,
    color: colors.text.primary,
    marginBottom: 8,
  },
  questionYear: {
    ...typography.subtitle2,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  questionSource: {
    ...typography.subtitle2,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  questionImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.shadows.light,
    marginBottom: 8,
    backgroundColor: colors.surface.light,
  },
  selectedOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.shadows.light, // Highlight for selected option before submission
    marginBottom: 8,
  },
  correctOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.primary.main,
    marginBottom: 8,
  },
  wrongOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.error.main,
    marginBottom: 8,
  },
  optionText: {
    ...typography.body1,
    color: colors.text.primary,
  },
  submitButton: {
    padding: 12,
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.text.onPrimary,
  },
  explanationButton: {
    padding: 12,
    backgroundColor: colors.accent.main,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  explanationButtonText: {
    ...typography.button,
    color: colors.accent.onAccent,
  },
  explanationContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.background.light,
    borderRadius: 8,
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
  navButton: {
    padding: 12,
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    alignItems: "center",
  },
  navButtonText: {
    ...typography.button,
    color: colors.text.onPrimary,
  },
});

export default MCQScreen;
