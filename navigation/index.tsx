import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../App";

import NotFoundScreen from "../screens/NotFoundScreen";
import SignInScreen from "../screens/SignInScreen";
import Products from "../screens/Products";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import Cart from "../screens/Cart";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const isLoggedIn = useSelector((state: RootState) => state.authReducer.token);
  console.log(isLoggedIn)

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      >
      <Stack.Navigator screenOptions={{ headerShown: false }} initalRouteName="SignIn">

        {isLoggedIn ? (
          <Stack.Screen name="Shop" component={BottomTabNavigator} />

        ) : (
          <Stack.Screen name="SignIn" component={SignInScreen} />
          
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

