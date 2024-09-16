import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileStackNavigator from "./ProfileStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import MentorshipStackNavigator from "./MentorshipStackNavigator";
import QuestionStackNavigator from "./QuestionStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Tab.Screen name="Home" component={HomeStackNavigator} /> */}
      <Tab.Screen name="Questions" component={QuestionStackNavigator} />
      <Tab.Screen name="Mentorship" component={MentorshipStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
