import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { AnalysisComponent, LoadingIndicator } from "../../components";
import { getQuestionAnalysis } from "../../redux";

const QuestionAnalysisScreen = ({ route, navigation }) => {
  const { source } = route.params;
  const dispatch = useDispatch();

  // States for tracking analysis levels
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [history, setHistory] = useState([]); // History array to keep track of levels

  // Fetch data based on the current analysis level
  useEffect(() => {
    const queryParams = selectedSubtopic
      ? { questionSubtopic: selectedSubtopic }
      : selectedTopic
      ? { questionTopic: selectedTopic }
      : { questionSource: source };
    dispatch(getQuestionAnalysis(queryParams));
  }, [selectedTopic, selectedSubtopic]);

  const { questionAnalysis, isQuestionsLoading } = useSelector(
    (state) => state.question
  );

  // Handler to move to subtopic level
  const handleTopicClick = (topic) => {
    setHistory((prev) => [...prev, { selectedTopic }]); // Save current topic level in history
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
  };

  // Handler to move to year level
  const handleSubtopicClick = (subtopic) => {
    setHistory((prev) => [...prev, { selectedTopic, selectedSubtopic }]); // Save current subtopic level in history
    setSelectedSubtopic(subtopic);
  };

  // Handler to go back to the previous level
  const handleBack = () => {
    const lastLevel = history.pop(); // Get the last level from history
    setHistory([...history]); // Update history after popping the last entry
    if (lastLevel) {
      setSelectedTopic(lastLevel.selectedTopic || null);
      setSelectedSubtopic(lastLevel.selectedSubtopic || null);
    } else {
      setSelectedTopic(null);
      setSelectedSubtopic(null);
    }
  };

  if (isQuestionsLoading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenHeadingText}>
        {selectedSubtopic
          ? `${selectedSubtopic} PYQs Analysis by Year`
          : selectedTopic
          ? `${selectedTopic} PYQs Analysis`
          : `${source} PYQs Analysis`}
      </Text>

      {questionAnalysis && (
        <Text style={styles.screenBodyText}>
          Sample Size: {questionAnalysis.totalQuestions} PYQs
        </Text>
      )}

      {/* Back button */}
      {(selectedTopic || selectedSubtopic) && (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}

      <ScrollView>
        {questionAnalysis?.topics?.length > 0 ? (
          questionAnalysis.topics.map((item, index) => (
            <TouchableOpacity
              key={
                item.questionTopic || item.questionSubtopic || item.questionYear
              }
              onPress={() =>
                selectedTopic
                  ? handleSubtopicClick(item.questionSubtopic)
                  : handleTopicClick(item.questionTopic)
              }
            >
              <AnalysisComponent topic={item} index={index} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.errorText}>
            Data unavailable, please try again later.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuestionAnalysisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: spacing.medium,
  },
  screenHeadingText: {
    ...typography.heading1,
    color: colors.primary.main,
    textAlign: "center",
    marginBottom: spacing.medium,
  },
  screenBodyText: {
    ...typography.body1,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.medium,
  },
  errorText: {
    ...typography.body1,
    color: colors.error.main,
    textAlign: "center",
    marginTop: spacing.large,
  },
  backButton: {
    alignSelf: "center",
    marginBottom: spacing.small,
    padding: spacing.small,
    backgroundColor: colors.primary.light,
    borderRadius: 5,
  },
  backButtonText: {
    color: colors.primary.main,
    ...typography.button,
  },
});
