import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonComponent } from "../../components";
import { QuestionCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { submitQuestionAttemptedByUser } from "../../redux";
import { styles as screenStyles } from "./styles";
import { colors, typography, spacing } from "../../styles"; // Assuming these are the color and typography styles you shared

const QuestionDetailScreens = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const dispatch = useDispatch();
  console.log("attemptedQuestions", attemptedQuestions);
  // Fetching questions from the Redux store
  const { questions, isLoading, error } = useSelector(
    (state) => state.question
  );
  const questionArray = questions.questions || []; // Ensure it's always an array

  const scrollViewRef = useRef(null); // Reference for the ScrollView

  // Check if the questions array has been loaded and is not empty
  const currentQuestion =
    questionArray.length > 0 ? questionArray[currentQuestionIndex] : null;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionArray.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Automatically scroll to the current question in the horizontal scroll view
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentQuestionIndex * 50, // Adjust this value based on the width of indicator
        animated: true,
      });
    }
  }, [currentQuestionIndex]);

  //submits the quiz to the backend
  // This function can be called when the user finishes the quiz or screen gets unmounted or close the app
  // Submits the quiz to the backend
  const handleSubmitQuiz = async () => {
    console.log("Submitting quiz...attemptedQuestions", attemptedQuestions);
    try {
      // Call the submitQuestionAttemptedByUser thunk to submit the quiz
      const response = await dispatch(
        submitQuestionAttemptedByUser(attemptedQuestions)
      );
      if (response) {
        console.log("Quiz submitted successfully");
        // Navigate to the home screen after submitting the quiz
        navigation.navigate("QuestionHomeScreen");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      //try again tosubmit by calling the function again through Alert with cancel option
      Alert.alert(
        "Error submitting quiz",
        "Do you want to try again?",
        [
          {
            text: "Cancel",
            onPress: () => navigation.navigate("QuestionHomeScreen"), // Navigate to the home screen
            style: "cancel",
          },
          { text: "OK", onPress: () => handleSubmitQuiz() },
        ],
        { cancelable: false }
      );
    }
  };

  // Call handleSubmitQuiz when app state changes
  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === "active"
  //     ) {
  //       console.log("App has come to the foreground");
  //     }

  //     if (
  //       appState.current.match(/active/) &&
  //       nextAppState.match(/background|inactive/)
  //     ) {
  //       console.log("App is going to the background or inactive");
  //       handleSubmitQuiz(); // Call handleSubmitQuiz when app goes to the background
  //     }
  //     appState.current = nextAppState;
  //   };

  //   const appStateSubscription = AppState.addEventListener(
  //     "change",
  //     handleAppStateChange
  //   );

  //   return () => {
  //     appStateSubscription.remove();
  //   };
  // }, []);

  // Call handleSubmitQuiz when the component unmounts
  // useEffect(() => {
  //   return () => {
  //     handleSubmitQuiz();
  //   };
  // }, []);

  // Render the question number indicators inside a horizontal ScrollView
  const renderQuestionIndicators = () => {
    return questionArray.map((question, index) => {
      const isCurrent = index === currentQuestionIndex;
      return (
        <TouchableOpacity
          key={index}
          onPress={() => setCurrentQuestionIndex(index)} // Allow user to jump to any question
          style={[
            indicatorStyles.indicatorContainer,
            isCurrent
              ? indicatorStyles.currentIndicator
              : indicatorStyles.regularIndicator,
          ]}
        >
          <Text
            style={[
              isCurrent
                ? indicatorStyles.currentIndicatorText
                : indicatorStyles.regularIndicatorText,
            ]}
          >
            {isCurrent ? index + 1 : `Q${index + 1}`}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  if (isLoading) {
    return (
      <View style={noQuestionStyle.loadingContainer}>
        <Text>Loading Questions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={noQuestionStyle.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={noQuestionStyle.noQuestionsContainer}>
        <Text>No questions available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={screenStyles.container}>
      {/* Navigation Section */}
      <View style={styles.navigationContainer}>
        {/* Previous Button */}
        <ButtonComponent
          title="<"
          onPress={handlePreviousQuestion}
          variant="secondary"
          disabled={currentQuestionIndex === 0}
          style={{ backgroundColor: colors.background.lighter }}
          textStyle={{ color: colors.text.primary }}
        />

        {/* Question Number Indicators in a horizontal scrollable view */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.indicatorWrapper}
        >
          {renderQuestionIndicators()}
        </ScrollView>

        {/* Next Button */}
        {currentQuestionIndex < questionArray.length - 1 ? (
          <ButtonComponent
            title=">"
            onPress={handleNextQuestion}
            variant="primary"
            style={{ backgroundColor: colors.background.lighter }}
            textStyle={{ color: colors.text.primary }}
          />
        ) : (
          <ButtonComponent
            title="End"
            onPress={handleSubmitQuiz}
            variant="primary"
            style={{ backgroundColor: colors.background.lighter }}
            textStyle={{ color: colors.text.primary }}
          />
        )}
      </View>

      {/* Question Card */}
      <QuestionCard
        currentQuestion={currentQuestion}
        attemptedQuestion={attemptedQuestions}
        setAttemptedQuestions={setAttemptedQuestions}
      />
    </SafeAreaView>
  );
};

export default QuestionDetailScreens;

// Indicator Styles
const indicatorStyles = StyleSheet.create({
  indicatorContainer: {
    marginHorizontal: spacing.small,
    justifyContent: "center",
    alignItems: "center",
  },
  currentIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.tint2, // Faded primary color
    justifyContent: "center",
    alignItems: "center",
  },
  regularIndicator: {
    paddingHorizontal: spacing.smallMedium,
    justifyContent: "center",
  },
  currentIndicatorText: {
    ...typography.heading3,
    color: colors.primary.onPrimary, // White text on the current question circle
  },
  regularIndicatorText: {
    ...typography.body2,
    color: colors.text.secondary, // Normal text color for non-current questions
  },
});

// Main Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.background.default,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.medium,
  },
  indicatorWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

// Error/Loading/No Questions Styles
const noQuestionStyle = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.default,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.default,
  },
  noQuestionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.default,
  },
  loadingText: {
    ...typography.body1,
    color: colors.text.primary,
  },
  errorText: {
    ...typography.body1,
    color: colors.error.main,
  },
  noQuestionsText: {
    ...typography.body1,
    color: colors.text.secondary,
  },
});
