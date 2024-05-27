import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NotificationScreen } from "../screens/home/NotificationScreen";

import { HomeScreen } from "../screens/home/HomeScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { HomeParamList } from "./types";

const HomeStack = createStackNavigator<HomeParamList>();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        initialParams={undefined}
        component={HomeScreen}
        options={{ title: "Overview", headerShown: false }}
      />
      <HomeStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ title: "Notificaciones" }}
      />
    </HomeStack.Navigator>
  );
};
