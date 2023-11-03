import React, { useEffect, useState } from 'react'
import { Text, View, Button ,Pressable, Image, StyleSheet , ScrollView} from 'react-native'
import FocusAwareStatusBar from '../components/atoms/FocusAwareStatusBar'
import { StackScreenProps } from '@react-navigation/stack'
import { MyCard, stylesCard } from '../components/utils/MyCard'
import { stylesRegister } from './LoginScreen'
import { NavigationProp } from '@react-navigation/native';


type ProtectedScreenProps = {
  navigation : NavigationProp<any>
}

export const ProtectedScreen = ({navigation}:ProtectedScreenProps) =>  {
  const handleProfilePress = () => {
    navigation.navigate('PerfilScreen');
  };
  const handleNotifPress = () => {
    navigation.navigate('NotificationScreen');
  };
  const handleDetallesfPress = () => {
    navigation.navigate('DetallesCardScreen');
  };
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
        <Pressable style={styles.btnPerfil} onPress={ handleProfilePress}>
            <Image  source={require('../assets/Screenshot_2023-07-15-10-32-16-115_com.facebook.lite.jpg')} 
            style={styles.perfil}  />
        </Pressable>
        <View style={styles.nombreContaine}>
        <Text style={styles.bienvenido}>¡Bienvenido!!!</Text>
        <Text style={styles.userName}>Nombre de usuario</Text>
        </View>
        <View>
           <Pressable onPress={ handleNotifPress} style={styles.btnNotif}>
             <Image source={require('../assets/icons8-bell-100.png')} style={{width:20, height:20}}/>
           </Pressable>
        </View>
        </View>
        
        <View>
          <Text style={styles.misTarjetas}>Mis tarjetas</Text>

        </View>
        <View>
           <MyCard onPress={handleDetallesfPress} 
            color="#E05E28" number="1234 5678 9101 1121" monto='3434.11'
             entidad='TecoPos' vence='11/25' logo={require('../assets/images/icon.png')}/>

           <MyCard onPress={handleDetallesfPress}  color="#be0f0f" 
           number="1234 5678 9101 1121" monto='3434.11'
            entidad='Aceña' vence='11/25' logo={require('../assets/images/aceñaLogo.jpeg')}/>
           
           <MyCard onPress={handleDetallesfPress}  
           color="#33B5D3" number="2356 0925 9101 2533" monto='3434.11'
            entidad='Gelato' vence='11/25' logo={require('../assets/images/icon.png')}/>
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
  top:30,
  marginBottom:50
 }
})