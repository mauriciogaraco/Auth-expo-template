import React from 'react'
import { TextInput } from 'react-native-paper';
import { Text, View,KeyboardAvoidingView,TouchableOpacity ,Platform,Image, ScrollView, StyleSheet} from 'react-native'
import { Background } from '../components/Background'
import { TecoLogo } from '../components/TecoLogo'
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import FocusAwareStatusBar from '../components/atoms/FocusAwareStatusBar';
import { palette } from '../theme/colors';
import Layout from '../components/utils/Layout';
import Formulario from '../components/utils/Formulario';
import { stylesRegister } from './LoginScreen';
import FormularioRegister from '../components/utils/FormularioRegister';

interface Props extends StackScreenProps <any,any>{

}


export const RegisterScreen = ({navigation }:Props) => {
  const { email,password,onChange, name}=  useForm({
    email:'',
    password:'',
    name:''
    });
    const onRegister = () =>{
        console.log({email,password , name})
    }
    const width = Layout.window.width;

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
                  
           <FormularioRegister/>
    
          
             <View style={loginStyles.btnConatiner}>
               <TouchableOpacity activeOpacity={0.8} style={loginStyles.btn} >
                   <Text style={loginStyles.btnText}>Registrarse</Text>
               </TouchableOpacity>
          </View>
          <View style={loginStyles.newUserContainer}>
                <Text>¿ Ya Tienes Cuenta ?
                </Text>
               <TouchableOpacity activeOpacity={0.8} onPress={ ()=> navigation.replace('LoginScreen')}>
                 <Text style={loginStyles.btnRegisterText}>Inicia Sesión</Text>
               </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
    
  )
}

