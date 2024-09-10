import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MentorshipHomeScreen,
  MentorshipLiveScreen,
} from "../screens/MentorshipScreen";

const stack = createNativeStackNavigator();

const MentorshipStackNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen
        name="MentorshipHomeScreen"
        component={MentorshipHomeScreen}
      />
      <stack.Screen
        name="MentorshipLiveScreen"
        component={MentorshipLiveScreen}
      />
    </stack.Navigator>
  );
};

export default MentorshipStackNavigator;
