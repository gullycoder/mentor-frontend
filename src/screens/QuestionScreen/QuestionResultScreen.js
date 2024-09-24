import React from "react";
import { View, ScrollView, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { colors, typography, spacing } from "../../styles"; // Importing your defined styles
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ResultScreen = () => {
  console.log("Result Screen", screenWidth);
  // Sample data for the bar chart
  const data = [
    {
      totalAttempts: 151,
      trueAttempts: 130,
      falseAttempts: 21,
      questionTopic: "World Geo",
    },
    {
      totalAttempts: 8,
      trueAttempts: 2,
      falseAttempts: 6,
      questionTopic: "Modern",
    },
    {
      totalAttempts: 91,
      trueAttempts: 70,
      falseAttempts: 11,
      questionTopic: "Ancient",
    },
    {
      totalAttempts: 118,
      trueAttempts: 52,
      falseAttempts: 66,
      questionTopic: "World H",
    },
    {
      totalAttempts: 35,
      trueAttempts: 23,
      falseAttempts: 12,
      questionTopic: "Polity",
    },
    {
      totalAttempts: 25,
      trueAttempts: 13,
      falseAttempts: 12,
      questionTopic: "Eco",
    },
    {
      totalAttempts: 15,
      trueAttempts: 13,
      falseAttempts: 2,
      questionTopic: "Eco",
    },
  ];

  // Prepare data for the bar chart
  const labels = data.map((item) => item.questionTopic);
  const correctPercentages = data.map((item) =>
    item.totalAttempts > 0 ? (item.trueAttempts / item.totalAttempts) * 100 : 0
  );

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <Text style={styles.title}>PYQs Performance</Text>

      <BarChart
        data={{
          labels: labels, // Topics as labels
          datasets: [
            {
              data: correctPercentages, // Correct percentages for each topic
            },
          ],
        }}
        width={screenWidth - spacing.large} // Width from screen
        height={screenHeight * 0.4} // Height from screen
        yAxisLabel="%"
        chartConfig={{
          backgroundColor: colors.background.lighter,
          backgroundGradientFrom: colors.background.lighter, // Darker background
          backgroundGradientTo: colors.background.darker, // Darker background
          decimalPlaces: 0, // Display whole percentages
          color: (opacity = 0) => colors.secondary.main, // Light primary color for bars
          labelColor: (opacity = 1) => colors.text.primary, // Dark text color for labels

          style: {
            borderRadius: 16,
            elevation: 5, // Elevation for a slight shadow effect
            paddingVertical: 20,
          },
        }}
        verticalLabelRotation={90} // Rotate labels for better fit
        fromZero
        style={styles.chartStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    backgroundColor: colors.background.default, // Default background color
  },
  title: {
    ...typography.heading1,
    color: colors.text.primary,
    marginBottom: spacing.large,
    textAlign: "center", // Center align title
  },
  chartStyle: {
    borderRadius: 16,
    marginVertical: spacing.medium,
  },
});

export default ResultScreen;
