import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppNavigator from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingOverlay from "./src/components/loadingOverlay";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
        <LoadingOverlay />
      </SafeAreaProvider>
    </Provider>
  );
}
