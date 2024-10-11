import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileStackNavigator from "./ProfileStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import MentorshipStackNavigator from "./MentorshipStackNavigator";
import QuestionStackNavigator from "./QuestionStackNavigator";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Questions") {
            iconName = focused ? "question-circle" : "question-circle-o";
          } else if (route.name === "Mentorship") {
            iconName = focused ? "users" : "users";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeStackNavigator} /> */}
      <Tab.Screen name="Questions" component={QuestionStackNavigator} />
      <Tab.Screen name="Mentorship" component={MentorshipStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
