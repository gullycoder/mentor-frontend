import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, HomeScreen2 } from "../screens/HomeScreen";

const stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="HomeScreen" component={HomeScreen} />
      <stack.Screen name="HomeScreen2" component={HomeScreen2} />
    </stack.Navigator>
  );
};

export default HomeStackNavigator;
