import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Auth" component={AuthStackNavigator} />
      <stack.Screen name="Main" component={BottomTabNavigator} />
    </stack.Navigator>
  );
};

export default MainNavigator;
