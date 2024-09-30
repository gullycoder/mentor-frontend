// NavigationService.js
//use this file very carefully as it is not recommended to use it in the latest version of react-navigation
// NavigationService.js
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const globalNavigationRef = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
