import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/AuthScreen";
import { SplashScreen } from "../screens/AuthScreen";

const stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <stack.Screen name="Splash" component={SplashScreen} /> */}
      <stack.Screen name="Login" component={LoginScreen} />
    </stack.Navigator>
  );
};

export default AuthStackNavigator;
