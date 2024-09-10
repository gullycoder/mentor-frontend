import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";

const stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="HomeScreen" component={HomeScreen} />
    </stack.Navigator>
  );
};

export default HomeStackNavigator;
