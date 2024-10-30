import React from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { colors, typography, spacing } from "../../styles"; // Importing defined styles
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttemptedQuestions,
  getAttemptedQuestionDetails,
} from "../../redux";
import { AnalysisComponent, LoadingIndicator } from "../../components";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ResultScreen = ({ navigation }) => {
  //get the attempted questions results from the redux state
  const { attemptedQuestions } = useSelector(
    (state) => state.attemptedQuestion
  );
  const dispatch = useDispatch();
  const isQuestionsLoading = useSelector(
    (state) => state.question.isQuestionsLoading
  );

  const data = attemptedQuestions;

  console.log("data available for data", data);

  // Function to handle click on each item for more details
  //collecting the selected filters to pass to the api call to get the questions

  // function to handle the submit button
  const handleSubmit = async (item) => {
    const response = await dispatch(getAttemptedQuestionDetails(item));

    if (response) {
      navigation.navigate("QuestionAttemptedDetailScreen");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PYQs Performance</Text>
      <ScrollView style={styles.chartContainer}>
        {data.length > 0 ? (
          <View>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  handleSubmit({ questionTopic: item.questionTopic })
                }
              >
                <AnalysisComponent topic={item} index={index} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            {Alert.alert(
              "No Question Attempted",
              "Please attempt some questions to see the performance chart",
              [{ text: "OK", onPress: () => navigation.goBack() }]
            )}
          </View>
        )}
        {/* Loading Indicator */}
        {isQuestionsLoading && <LoadingIndicator />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },

  title: {
    ...typography.heading1,
    color: colors.primary.main,
    textAlign: "center",
    marginBottom: spacing.medium,
  },
  itemContainer: {
    marginVertical: spacing.small,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderColor: colors.background.lighter,
    backgroundColor: colors.background.light,
    elevation: 1,
  },

  textBelowChart: {
    ...typography.body2,
    color: colors.text.primary,
    textAlign: "center",
  },
});

export default ResultScreen;
