import React ,{useContext, useState} from 'react'
import { Fontisto, Ionicons } from "@expo/vector-icons";

import { View, TouchableOpacity, Text, KeyboardAvoidingView, Platform, 
  ScrollView, StyleSheet, Image,} from 'react-native'
  import { TextInput, Button } from "react-native-paper";
import { TecoLogo } from '../components/TecoLogo'
import { loginStyles } from '../theme/loginTheme'
import { validateEmail } from "../utils/validation";
import { StackScreenProps } from '@react-navigation/stack';
import Layout from '../components/utils/Layout';
import { palette } from '../theme/colors';
//import TextInputController from '../components/atoms/formControls/TextInputController';
import FocusAwareStatusBar from '../components/atoms/FocusAwareStatusBar';
import Formulario from '../components/utils/Formulario'
import FormularioRegister from '../components/utils/FormularioRegister'
import { IconButton } from 'react-native-paper'
import { useLoginMutation } from '../store/api/authApi'
import Toast from 'react-native-toast-message'
import { useForm } from 'react-hook-form'
import TextInputController from '../components/atoms/formControls/TextInputController'
//import { AuthContext } from '../../Redux/authContext'

interface Props extends StackScreenProps<any,any>{

}

const width = Layout.window.width;

export const LoginScreen = ( {navigation}: Props) => {
 
  
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
    const loginData = { username: data.email, password: data.password };
    await login(loginData)
      .unwrap()
      .catch((res) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: res?.data,
          position: "top",
          topOffset: 9,
        });
      });
  };
         
  const pressEye = () => {
    if(!showPassword){
     setShowPassword(true);
    }
    else{
      setShowPassword(false);

    }
  }
        
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "android" ? "height" : "padding"}
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
        <View style={stylesRegister.sliderContainerStyle}>
          <Image
            source={require("../assets/logo-w.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={stylesRegister.logo}
          />
        </View>
      </View>

      <View style={stylesRegister.viewContainer}>
        <View style={stylesRegister.formContainer}>
        
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
              right={
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
              style={styles.input}
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
            />
            <Button
              style={[styles.btnLogIn]}
              mode="contained"
              buttonColor={palette.primary}
              rippleColor={palette.datesFilter}
              onPress={handleSubmit(onSubmit)}
              textColor={palette.secondary}
              loading={isSubmitting}
              disabled={(isDirty && !isValid) || isSubmitting || isLoading}
              labelStyle={{
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              {isSubmitting ? "Iniciando sesión" : "Iniciar Sesión"}
            </Button>
        <View style={loginStyles.newUserContainer}>
              <Text>¿ No Tienes Cuenta ?
              </Text>
             <TouchableOpacity activeOpacity={0.8} onPress={ ()=> navigation.replace('RegisterScreen')}>
               <Text style={loginStyles.btnRegisterText}> Registrate Aquí</Text>
             </TouchableOpacity>
          </View>  
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  </KeyboardAvoidingView>

  )
}

 export const stylesRegister = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  containerStyle: {
    alignSelf: "center",
    width: width,
    overflow: "hidden",
    height: width / 1,
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
    width: width - 100,
    height: 400,
    // marginTop: 350,
    // marginLeft: 235,
    alignSelf: "center",
    // backgroundColor: "pink",
  },

  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    // flex: 1,
    // backgroundColor: "#20a17c",
  },

  textLogIn: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
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
    width: 240,
    // height: 50,
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

  textLogIn: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: "center",
  },

  formContainer: {
    // flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    
  },
  input: {
    width: 280,
    height:40,
    backgroundColor: palette.white,
    borderColor: palette.icons,
    borderRadius: 100,
    borderWidth:2,
    paddingLeft:20,
    paddingVertical:5,
    marginVertical:10,
    marginLeft:50
  },
  btnLogIn: {
    marginTop: 20,
    width: 240,
    // height: 50,
  },
});


