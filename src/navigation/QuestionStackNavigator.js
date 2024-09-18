import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  QuestionHomeScreen,
  QuestionDetailScreen,
  QuestionResultScreen,
  QuestionFilterScreen,
} from "../screens/QuestionScreen";

const stack = createNativeStackNavigator();

const QuestionStackNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="QuestionHomeScreen" component={QuestionHomeScreen} />
      <stack.Screen
        name="QuestionFilterScreen"
        component={QuestionFilterScreen}
      />
      <stack.Screen
        name="QuestionDetailScreen"
        component={QuestionDetailScreen}
      />
      <stack.Screen
        name="QuestionResultScreen"
        component={QuestionResultScreen}
      />
    </stack.Navigator>
  );
};

export default QuestionStackNavigator;
