import React from  'react'
import { Text,View ,StyleSheet, Pressable,Image, ScrollView} from 'react-native'
import { stylesRegister } from '../../screens/LoginScreen'
import Layout from './Layout';
import { StackScreenProps } from '@react-navigation/stack';

 
const width = Layout.window.width;







export const stylesCard = StyleSheet.create({
    tarjetaContainer:{
      alignItems:'center',
      
    },
    btnTargeta1:{
      backgroundColor: '#E05E28',
      width:width * 0.90,
      height:180,
      borderRadius:15,
      marginBottom:20
      
    },
    btnTargeta2:{
      backgroundColor: '#BE1522',
      width:width * 0.90,
      height:180,
      borderRadius:15,
      marginBottom:20
    },
    btnTargeta3:{
      backgroundColor: '#33B5D3',
      width:width * 0.90,
      height:180,
      borderRadius:15,
      marginBottom:20
      
    },
    container:{
      flexDirection:'column',
      marginTop:50
    },
    imagenLogo:{
      borderRadius:100,
      width:45,
      height:45,
      top:8
      
    },
    logos:{
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      marginHorizontal:10
    },
  textTarjeta:{
    fontSize:16,
    fontWeight:'bold',
    color:'white',
    
  },
  montoContainer:{
  
  alignItems:'flex-start',
  marginLeft:25,
  top:20
  
  },
  textMonto:{
  color:'white',
  fontWeight:'900',
  fontSize:30
  },
detallesContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'flex-end',
  marginHorizontal:10,
},
fechaContainer:{
marginTop:28,
marginLeft:20
},
detallesText:{
  color:'white',
  fontWeight:'bold',
  fontSize:20
},
nombreEmpresa:{
  color:'white',
  fontWeight:'bold',
  fontSize:14
}
})