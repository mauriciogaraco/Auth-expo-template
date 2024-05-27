import { createStackNavigator } from "@react-navigation/stack";

import { ProfileParamList } from "./types";
import AppBar from "../components/containers/AppBar";
import React from "react";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { EditTickets } from "../screens/profile/EditTickets";
import { ViewTicket } from "../screens/profile/ViewTicket";

const Stack = createStackNavigator<ProfileParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
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
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
      <Stack.Screen
        name="EditTickets"
        component={EditTickets}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: route.params.titleScreen,
        })}
      />
      <Stack.Screen
        name="ViewTicket"
        component={ViewTicket}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: route.params.titleScreen,
        })}
      />
    </Stack.Navigator>
  );
};
