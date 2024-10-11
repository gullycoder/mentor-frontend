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
import { BarChart } from "react-native-chart-kit";
import { colors, typography, spacing } from "../../styles"; // Importing defined styles
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttemptedQuestions,
  getAttemptedQuestionDetails,
} from "../../redux";

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
  // if attemptedQuestions is not available, set it to an empty array
  // This is to prevent the app from crashing if the data is not available
  // This can happen if the user refreshes the page or the data is not loaded yet
  // This is a common practice to prevent the app from crashing

  const data = attemptedQuestions;
  // Prepare data for the bar chart
  const labels = data.map((item) =>
    //just 1st 3 characters of the topic
    item.questionTopic.substring(0, 3)
  );
  const correctPercentages = data.map((item) =>
    item.totalAttempts > 0 ? (item.trueAttempts / item.totalAttempts) * 100 : 0
  );

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
        {/* Bar Chart */}
        {data.length > 0 ? (
          <View>
            <BarChart
              data={{
                labels: labels, // Topics as labels
                datasets: [
                  {
                    data: correctPercentages, // Correct percentages for each topic
                  },
                ],
              }}
              width={screenWidth - spacing.medium} // Width from screen
              height={screenHeight * 0.65} // Height from screen
              yAxisLabel="%"
              chartConfig={{
                backgroundColor: colors.background.lighter,
                backgroundGradientFrom: colors.background.lighter, // Darker background
                backgroundGradientTo: colors.background.darker, // Darker background
                decimalPlaces: 0, // Display whole percentages
                color: (opacity = 0) => colors.secondary.main, // Light primary color for bars
                labelColor: (opacity = 1) => colors.text.primary, // Dark text color for labels
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.2,
              }}
              verticalLabelRotation={90} // Rotate labels for better fit
              fromZero
              style={styles.chartStyle}
            />
            {/* End of Bar Chart */}
            {
              <Text style={{ ...typography.heading3, paddingTop: 10 }}>
                Click Below for Details
              </Text>
            }
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() =>
                  handleSubmit({ questionTopic: item.questionTopic })
                }
              >
                <Text style={styles.textBelowChart}>
                  Total Attempt in {item.questionTopic}: {item.totalAttempts}
                </Text>
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
  chartContainer: {
    flex: 1,
  },
  title: {
    ...typography.heading1,
    color: colors.text.primary,
    marginBottom: spacing.large,
    textAlign: "center", // Center align title
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
