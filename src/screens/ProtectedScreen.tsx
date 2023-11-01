import React, { useEffect, useState } from 'react'
import { Text, View, Button ,Pressable, Image, StyleSheet , ScrollView} from 'react-native'
import FocusAwareStatusBar from '../components/atoms/FocusAwareStatusBar'
import { StackScreenProps } from '@react-navigation/stack'
import { stylesCard } from '../components/utils/MyCard'
import { stylesRegister } from './LoginScreen'
import * as Font from 'expo-font'

interface Props extends StackScreenProps<any,any>{

} 
export const ProtectedScreen = ({navigation}:Props) => {
  
  return (
    <View >
         <FocusAwareStatusBar
      barStyle={"dark-content"}
      backgroundColor="#ffffff"
      translucent={false}
    />
     <ScrollView
      style={stylesRegister.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
        <View style={styles.container}>
        <Pressable style={styles.btnPerfil} onPress={ ()=> navigation.navigate('PerfilScreen')}>
            <Image  source={require('../assets/Screenshot_2023-07-15-10-32-16-115_com.facebook.lite.jpg')} 
            style={styles.perfil}  />
        </Pressable>
        <View style={styles.nombreContaine}>
        <Text style={styles.bienvenido}>¡Bienvenido!!!</Text>
        <Text style={styles.userName}>Nombre de usuario</Text>
        </View>
        <View>
           <Pressable onPress={ ()=> navigation.navigate('NotificationScreen')} style={styles.btnNotif}>
             <Image source={require('../assets/icons8-bell-100.png')} style={{width:20, height:20}}/>
           </Pressable>
        </View>
        </View>
        
        <View>
          <Text style={styles.misTarjetas}>Mis tarjetas</Text>

        </View>
        <View>
        <View style={stylesCard.container}>
             <View style={stylesCard.tarjetaContainer} >
        <Pressable style={stylesCard.btnTargeta1} onPress={()=> navigation.navigate('DetallesCardScreen')} >
          <View style={stylesCard.logos}>
              <Text style={stylesCard.textTarjeta}>Ptos</Text>
              <Image source={require('../assets/images/icon.png')} style={stylesCard.imagenLogo}/>
          </View>
         <View style={stylesCard.montoContainer}>
            <Text style={stylesCard.textMonto}>2,035.90</Text>
         </View>
         <View style={stylesCard.detallesContainer}>
           <View style={stylesCard.fechaContainer}>
              <Text style={stylesCard.detallesText}>3738..903..890</Text>
              <Text style={stylesCard.nombreEmpresa}>Tecopos</Text>
           </View>
           <View>
            <Text style={{  color:'white',
                  fontWeight:'bold',
                                fontSize:18 }}>11/25</Text>
           </View>
         </View>
        </Pressable>
      </View>
     
     </View> 
            
        </View>
        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    margin:10,
    justifyContent:'space-between'
  },
 btnNotif:{
 backgroundColor:'#023E88',
 padding:10,
 borderRadius:100,
 width:40,
 alignItems:'center',
 justifyContent:'center',
 height:40,
 shadowColor:'#023E88',
 shadowOpacity:0.25,
 shadowRadius: 16.00,
 elevation:24,
 shadowOffset:{width:12, height:12}
 },
 btnPerfil :{
  padding:10,
  borderRadius:100,
  width:50,
  alignItems:'center',
  justifyContent:'center',
  height:50,
  shadowColor:'#000',
  shadowOpacity:0.25,
  shadowRadius: 16.00,
  elevation:24,
  shadowOffset:{width:12, height:12}
 },
 perfil:{
  width:50, height:50, borderRadius:100

 },
 nombreContaine:{
  flexDirection:'column',
  position:'absolute',
  left:65
 },
 bienvenido:{
  color:'#c1cccc',
  fontWeight:'bold'
 },
 userName:{
 fontSize:16,
 fontWeight:'bold',
 
 },
 misTarjetas:{
  fontSize:18,
  fontWeight:'bold',
  marginHorizontal:20,
  top:30
 }
})