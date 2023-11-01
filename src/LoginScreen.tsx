import React from 'react'
import { TextInput } from 'react-native-paper';
import { View, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native'
import { Background } from '../components/Background'
import { TecoLogo } from '../components/TecoLogo'
import { loginStyles } from '../theme/loginTheme'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any,any>{

}


export const LoginScreen = ( {navigation}: Props) => {
    const { email,password,onChange}=  useForm({
        email:'',
        password:''
        });
        const onLogin = () =>{
            console.log({email,password})
        }
  return (
    <View >
    {/* Backgorund*/ }
        <Background/>
        <KeyboardAvoidingView>
        <TecoLogo/>
        <View style={{alignItems:'center', top:220}}>
            
        <TextInput
      label="Email"
      
      onChangeText={(value) => onChange( value,'email')}
      value={email}
      autoCapitalize='none'
      autoCorrect={false}
      right={<TextInput.Icon icon="email" />}
      selectionColor='gray'
      style={loginStyles.inputField}
      onSubmitEditing={onLogin}
    />
    <TextInput
      onChangeText={(value) => onChange( value,'password')}
      value={password}
      onSubmitEditing={onLogin}
    label="Password"
    secureTextEntry
    right={<TextInput.Icon icon="eye" />}
    style={loginStyles.inputField}
  />
          <View style={loginStyles.btnConatiner}>
             <TouchableOpacity activeOpacity={0.8} style={loginStyles.btn} onPress={onLogin}>
                 <Text style={loginStyles.btnText}>Login</Text>
             </TouchableOpacity>
        </View>
          <View style={loginStyles.newUserContainer}>
             <TouchableOpacity activeOpacity={0.8} onPress={ ()=> navigation.replace('RegisterScreen')}>
               <Text style={loginStyles.btnRegisterText}>Toca para Registrarte</Text>
             </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
    </View>

  )
}
/*placeholder='email' 
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
         keyboardType="email-address"
         underlineColorAndroid='white'
         style={loginStyles.inputField} */ 