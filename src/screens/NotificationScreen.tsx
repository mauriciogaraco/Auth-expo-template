import React ,{useState} from 'react'

import { View, TouchableOpacity, Text, KeyboardAvoidingView, Platform, 
  ScrollView, Button, StyleSheet, Image, TextInput} from 'react-native'

import { StackScreenProps } from '@react-navigation/stack';
import Layout from '../components/utils/Layout';
import { palette } from '../theme/colors';
//import TextInputController from '../components/atoms/formControls/TextInputController';
import FocusAwareStatusBar from '../components/atoms/FocusAwareStatusBar';
import Formulario from '../components/utils/Formulario'


interface Props extends StackScreenProps<any,any>{

}

const width = Layout.window.width;

export const NotificationScreen = ( {navigation}: Props) => {
  
 
        
  return (
<View>
  
    <ScrollView
      style={stylesRegister.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
 
      <Text>Notificaciones</Text>
         
      
    </ScrollView>
    </View>

  )
}

 export const stylesRegister = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  }
});


