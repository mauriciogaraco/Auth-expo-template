import { createStackNavigator } from "@react-navigation/stack";

import AppBar from "../components/containers/AppBar";

import React from "react";
import { ProductsParamList } from "./types";
import { ProductsScreen } from "../screens/products/ProductsScreen";
import { ProductsDetail } from "../screens/products/ProductsDetail";
import { palette } from "../theme/colors";
import { CreateTickets } from "../screens/products/CreateTickets";

const ProductsStack = createStackNavigator<ProductsParamList>();

export const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "Poppins-Medium" },
        cardStyle: { backgroundColor: "#ffffff" },
        header: ({ navigation, route, options, back }) => {
          return (
            <AppBar
              title={options.title || ""}
              back={back}
              navigation={navigation}
            />
          );
        },
      }}
    >
      <ProductsStack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />
      <ProductsStack.Screen
        name="ProducstDetail"
        component={ProductsDetail}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: route.params.titleScreen,
        })}
      />
      <ProductsStack.Screen
        name="CreateTickets"
        component={CreateTickets}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: route.params.titleScreen,
        })}
      />
    </ProductsStack.Navigator>
  );
};
