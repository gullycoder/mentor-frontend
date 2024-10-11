import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "../../components";
import { ButtonComponent, LoadingIndicator } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../redux";
import { SafeAreaView } from "react-native-safe-area-context";

const QuestionFilterScreen = ({ navigation, route }) => {
  const { source } = route.params;
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const dispatch = useDispatch();
  const isQuestionsLoading = useSelector(
    (state) => state.question.isQuestionsLoading
  );

  //get filterOptions from redux state
  const { filterOptions } = useSelector((state) => state.rule.rules);
  // const { get } = useSelector((state) => state.question);

  // Get subtopics based on the selected topic
  const subTopics = selectedTopic ? filterOptions.subTopics[selectedTopic] : [];

  //collecting the selected filters to pass to the api call to get the questions
  const selectedFilters = {
    questionTopic: selectedTopic,
    questionSubtopic: selectedSubTopic,
    questionYear: selectedYear,
    questionSource: source,
  };
  console.log("selectedFilters", selectedFilters);
  // function to handle the submit button
  const handleSubmit = async () => {
    const response = await dispatch(getQuestions(selectedFilters));
    if (response) {
      navigation.navigate("QuestionDetailScreen");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filter Questions</Text>

      {/* Topic Dropdown */}
      <Dropdown
        label="Topic"
        options={filterOptions.topics}
        selectedValue={selectedTopic}
        onValueChange={(value) => {
          setSelectedTopic(value);
          setSelectedSubTopic(""); // Reset subtopic when topic changes
        }}
      />

      {/* Subtopic Dropdown (conditional on selected topic) */}
      {selectedTopic && (
        <Dropdown
          label="Subtopic"
          options={subTopics}
          selectedValue={selectedSubTopic}
          onValueChange={(value) => setSelectedSubTopic(value)}
        />
      )}

      {/* Year dropdown*/}
      {selectedSubTopic && (
        <Dropdown
          label="Year"
          options={filterOptions.questionYear}
          selectedValue={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
        />
      )}

      {/* Submit Button */}
      {selectedTopic && (
        <ButtonComponent
          title="Submit"
          onPress={() => {
            handleSubmit();
          }}
        />
      )}

      {/* Loading Indicator */}
      {isQuestionsLoading && <LoadingIndicator />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default QuestionFilterScreen;
