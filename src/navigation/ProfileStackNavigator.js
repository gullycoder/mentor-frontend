import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileHomeScreen, ProfileEditScreen } from "../screens/ProfileScreen";

const stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="ProfileHomeScreen" component={ProfileHomeScreen} />
      <stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
    </stack.Navigator>
  );
};

export default ProfileStackNavigator;
