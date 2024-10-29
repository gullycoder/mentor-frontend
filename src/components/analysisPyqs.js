import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors, typography, spacing } from "../styles";

const AnalysisComponent = ({ topic, index }) => {
  // Determine which field to display based on topic properties
  const topicName =
    topic.questionTopic ||
    topic.questionSubtopic ||
    topic.questionYear ||
    "Unknown";
  return (
    <View key={index} style={styles.container}>
      <View style={styles.topicNameContainer}>
        <Text style={styles.topicName}>{topicName}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{topic.total}</Text>
        <Text style={styles.percentageText}>{topic.percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.small,
    backgroundColor: colors.surface.light,
    elevation: 2,
    marginBottom: spacing.smallMedium,
    borderRadius: 3,
  },
  topicNameContainer: {
    flex: 2,
  },
  topicName: {
    ...typography.body1,
    color: colors.text.primary,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: spacing.medium,
  },
  valueText: {
    ...typography.body2,
    color: colors.primary.dark,
  },
  percentageText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
});

export { AnalysisComponent };
