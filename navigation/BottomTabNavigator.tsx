import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Products from "../screens/Products";
import Cart from "../screens/Cart";
import {
  BottomTabParamList,
  CartParamList,
  OrderParamList,
  ProductsParamList,
} from "../types";
import { Alert, Platform } from "react-native";
import Orders from "../screens/Orders";
import { Button, useTheme } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { logout } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { sendOrder } from "../store/actions/orders";
import { RootState } from "../App";

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const theme = useTheme();
  const primaryColor = theme["color-primary-default"];
  const accentColor = theme["color-basic-700"];
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TopTab.Navigator
      initialRouteName="ProductsScreen"
      tabBarOptions={{
        activeTintColor: primaryColor,
        style: { backgroundColor: accentColor, height: 65, },
        showIcon: true,
      }}
      tabBarPosition="bottom"
      lazy={true}>
      <TopTab.Screen
        name="ProductsScreen"
        component={ProductsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
              size={30}
              color={color}
            />
          ),
          title: "Produkter",
        }}
      />
      <TopTab.Screen
        name="CartScreen"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "ios" ? "ios-basket" : "md-basket"}
              size={30}
              color={color}
            />
          ),
          title: "Kundvagn",
        }}
      />
      <TopTab.Screen
        name="OrdersScreen"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "ios" ? "ios-book" : "md-book"}
              size={30}
              color={color}
            />
          ),
          title: "Beställningar",
        }}
      />
    </TopTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const headerStyler = () => {
  const theme = useTheme();
  const primaryColor = theme["color-primary-default"];
  const accentColor = theme["color-basic-700"];

  return () => ({
    headerStyle: { backgroundColor: accentColor },
    headerTintColor: primaryColor,
  });
};

const CartStack = createStackNavigator<CartParamList>();

function CartStackNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="CartScreen"
        component={Cart}

      />
    </CartStack.Navigator>
  );
}

const ProductsStack = createStackNavigator<ProductsParamList>();

function ProductsStackNavigator() {
  const style = headerStyler()();
  const dispatch = useDispatch();

  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        name="ProductsScreen"
        component={Products}
        options={{
          headerTitle: "Produkter",
          headerRight: () => (
            <Ionicons
              name="md-log-out"
              size={30}
              color={style.headerTintColor}
              onPress={() => dispatch(logout())}
              style={{marginRight:20}}
              ></Ionicons>
          ),
          ...style,
        }}
      />
    </ProductsStack.Navigator>
  );
}

const OrderStack = createStackNavigator<OrderParamList>();

function OrderStackNavigator() {
  const style = headerStyler()();

  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="OrdersScreen"
        component={Orders}
        options={{
          headerTitle: "Beställningar",
          ...style,
        }}
      />
    </OrderStack.Navigator>
  );
}
