import React from "react";
import { TextInput } from "react-native-paper";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Background } from "../../components/Background";

import { loginStyles } from "../../theme/loginTheme";
import { useForm } from "../../hooks/useForm";
import { StackScreenProps } from "@react-navigation/stack";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";

import { stylesRegister } from "./LoginScreen";

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor="#023E88"
        translucent={false}
      />
      <ScrollView
        style={stylesRegister.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={stylesRegister.containerStyle}>
          <View style={stylesRegister.sliderContainerStyle}></View>
        </View>

        <View style={stylesRegister.viewContainer}>
          <View style={stylesRegister.formContainer}>
            <View style={loginStyles.btnConatiner}>
              <TouchableOpacity activeOpacity={0.8} style={loginStyles.btn}>
                <Text style={loginStyles.btnText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
            <View style={loginStyles.newUserContainer}>
              <Text>¿ Ya Tienes Cuenta ?</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text style={loginStyles.btnRegisterText}>Inicia Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
