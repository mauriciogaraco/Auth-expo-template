import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentAuth } from "../store/slices/sessionSlice";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Modal, View } from "react-native";
import { AppParamList, MainParamList } from "./types";
import { ThemeContext } from "../Context/theme/ThemeContext";
import { LoadingPage } from "../components/containers/LoadingPage";
import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";

//Firebase
//import analytics from "@react-native-firebase/analytics";
//import messaging, {
// FirebaseMessagingTypes,
//} from "@react-native-firebase/messaging";
//import crashlytics from "@react-native-firebase/crashlytics";

const MainStack = createStackNavigator<MainParamList>();

export const MainNavigator = () => {
  //Firebase Analytics
  const navigationRef = useNavigationContainerRef<AppParamList | any>();
  const routeNameRef = useRef<any>();
  const [isReady, setIsReady] = useState<boolean>(false);

  //Read from redux isLogged
  const isAuth = useSelector(selectCurrentAuth);

  //Managing Messages
  // const checkData = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  //Code to action when message is received
  // };

  const { theme } = useContext(ThemeContext);

  return (
    <>
      {!isReady && (
        <View style={{ flex: 1 }}>
          <Modal
            style={{
              backgroundColor: theme.colors.background,
            }}
          >
            <LoadingPage title="" />
          </Modal>
        </View>
      )}
      <NavigationContainer
        //theme={theme}
        ref={navigationRef}
        onReady={() => {
          setIsReady(true);
          routeNameRef.current = navigationRef.getCurrentRoute()!.name;
        }}
      >
        <MainStack.Navigator>
          {isAuth ? (
            <>
              <MainStack.Screen
                name="AppNavigator"
                options={{
                  headerShown: false,
                }}
                component={AppNavigator}
              />
            </>
          ) : (
            <MainStack.Screen
              name="AuthenticationNavigator"
              options={{
                headerShown: false,
              }}
              component={AuthNavigator}
            />
          )}
        </MainStack.Navigator>
      </NavigationContainer>
      {/* <StatusBar
        style="dark"
        backgroundColor="#FFFFFF"
        animated={true}
        translucent={false}
      /> */}
    </>
  );
};
