import React, { useState } from "react";
import { View } from "react-native";
import { ButtonComponent } from "../../components";
import { questions } from "../../temp/data";
import { QuestionCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../redux";
import { styles } from "./styles";

const MCQScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const dispatch = useDispatch();
  // const { questions } = useSelector((state) => state.questions);
  const questionArray = questions;

  const query = {
    limit: 10,
    page: 1,
  };

  // React.useEffect(() => {
  //   dispatch(getQuestions(query));
  // }, []);

  const currentQuestion = questionArray[currentQuestionIndex];

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <View style={styles.container}>
      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentQuestionIndex >= 0 && (
          <ButtonComponent
            title="previous"
            onPress={handlePreviousQuestion}
            variant="secondary"
            disabled={currentQuestionIndex === 0}
          />
        )}
        {currentQuestionIndex < questionArray.length - 1 ? (
          <ButtonComponent
            title="   next   "
            onPress={handleNextQuestion}
            variant="primary"
          />
        ) : (
          <ButtonComponent
            title="End Quiz"
            onPress={() => alert("Quiz Finished")}
            variant="primary"
          />
        )}
      </View>
      <QuestionCard currentQuestion={currentQuestion} />
    </View>
  );
};

export default MCQScreen;
