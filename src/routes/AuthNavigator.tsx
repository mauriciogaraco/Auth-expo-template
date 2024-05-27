import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthenticationParamList } from "./types";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";

const AuthenticationStack = createStackNavigator<AuthenticationParamList>();
//const auth = useSelector(selectCurrentAuth);
//const {isAuth} = useSelector((state:any)=> state.session)
export const AuthNavigator = () => {
  return (
    <AuthenticationStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      <AuthenticationStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthenticationStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </AuthenticationStack.Navigator>
  );
};
