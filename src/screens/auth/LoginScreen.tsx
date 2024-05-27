import React, { useContext, useState } from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Image,
  ToastAndroid,
  Dimensions,
  Pressable,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

import { StackScreenProps } from "@react-navigation/stack";

import Toast from "react-native-toast-message";
import { useForm } from "react-hook-form";

import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import TextInputController from "../../components/atoms/formControls/TextInputController";
import { validateEmail } from "../../utils/validation";
import { loginStyles } from "../../theme/loginTheme";
import { useLoginMutation } from "../../store/api/authApi";
import { AuthenticationParamList } from "../../routes/types";

//import { AuthContext } from '../../Redux/authContext'

interface Props
  extends StackScreenProps<AuthenticationParamList, "LoginScreen"> {}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const LoginScreen = ({ navigation }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    const loginData = { email: data.email, password: data.password };

    await login(loginData)
      .unwrap()
      .catch((res: any) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${res.data}`,
        });
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={{ flex: 1 }}
    >
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={palette.primary}
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
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 30,
              textAlign: "center",
            }}
          ></Text>
          <View style={stylesRegister.formContainer}>
            <View style={{ marginHorizontal: "auto" }}>
              <TextInputController
                controller={{
                  name: "email",
                  rules: {
                    required: {
                      value: true,
                      message: "Correo electrónico requerido",
                    },
                    validate: { validateEmail },
                  },
                  control: control as any,
                }}
                style={styles.input}
                placeholder="Correo electr&oacute;nico"
                dense
                textColor={palette.secondary}
                autoCapitalize={"none"}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => setFocus("password")}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Fontisto name="email" size={22} color="#c1c1c1" />
                    )}
                    color={(isTextInputFocused) => "#c1c1c1"}
                  />
                }
              />
              <TextInputController
                controller={{
                  name: "password",
                  control: control as any,
                  rules: {
                    required: { value: true, message: "Contraseña requerida" },
                  },
                }}
                style={styles.inputPassword}
                placeholder="Contrase&ntilde;a"
                dense
                secureTextEntry={showPassword ? false : true}
                returnKeyType="done"
                onSubmitEditing={() => handleSubmit(onSubmit)()}
                right={
                  <TextInput.Icon
                    icon={() => (
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color={palette.icons}
                      />
                    )}
                    color={(isTextInputFocused) => "#c1c1c1"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Ionicons
                        name={"lock-closed-outline"}
                        size={20}
                        color={palette.icons}
                      />
                    )}
                    color={(isTextInputFocused) => "#c1c1c1"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log("m")}
            >
              <Text
                style={{
                  marginLeft: width * 0.32,
                  color: "#03045E",
                  fontFamily: "Poppins-Medium",
                  fontSize: 14,
                }}
              >
                ¿Olvidó su contraseña?
              </Text>
            </TouchableOpacity>

            <Button
              style={[stylesRegister.btnLogIn]}
              mode="contained"
              buttonColor={palette.primary}
              rippleColor={palette.datesFilter}
              onPress={handleSubmit(onSubmit)}
              textColor={palette.white}
              loading={isSubmitting}
              disabled={(isDirty && !isValid) || isSubmitting || isLoading}
              labelStyle={stylesRegister.textLogIn}
            >
              {isSubmitting ? "Iniciando sesión" : "Acceder"}
            </Button>

            <View style={loginStyles.newUserContainer}>
              <Text style={{ fontSize: 15, fontFamily: "Poppins-Medium" }}>
                ¿No tienes cuenta?
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.replace("RegisterScreen")}
              >
                <Text style={loginStyles.btnRegisterText}>
                  {""}Regístrate aquí
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const stylesRegister = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  containerStyle: {
    alignSelf: "center",
    width: width,
    overflow: "hidden",
    height: width * 0.6,
    marginBottom: 30,
  },
  sliderContainerStyle: {
    backgroundColor: palette.primary,
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    // marginLeft: -(width / 2),
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  logo: {
    width: "30%",
    height: "30%",
    marginTop: 350,

    alignSelf: "center",
    // backgroundColor: "pink",
  },

  viewContainer: {
    marginRight: 40,
    marginLeft: 40,

    // flex: 1,
    // backgroundColor: "#20a17c",
  },

  formContainer: {
    // flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#3425ad",
  },

  btnLogIn: {
    marginTop: 20,

    height: height * 0.06,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  textLogIn: {
    marginBottom: 2,
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Poppins-Medium",
    height: height * 0.05,
    textAlignVertical: "center",
    width: width * 0.62,
  },
});
const styles = StyleSheet.create({
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    // flex: 1,
    // backgroundColor: "#20a17c",
  },

  formContainer: {
    // flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,

    marginVertical: 10,
  },
  inputPassword: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,

    marginTop: 10,
  },
});
