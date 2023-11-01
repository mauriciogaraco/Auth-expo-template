
import * as React from 'react';
import { Text, View ,Image, ScrollView, StyleSheet, Button, Pressable} from 'react-native'
import { stylesCard } from '../components/utils/MyCard'
import { stylesRegister } from './LoginScreen'
import { IconButton } from 'react-native-paper'
import FocusAwareStatusBar from '../components/atoms/FocusAwareStatusBar';

export const DetallesCardScreen = () => {
  return (
    <View>       
        <FocusAwareStatusBar
    barStyle={"dark-content"}
    backgroundColor="#ffffff"
    translucent={false}
  />
    <View style={styles.container}>
         <ScrollView
      style={stylesRegister.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
 
      
      <View style={styles.montoContainer} >
          <Image source={require('../assets/logo.png')} style={styles.logoPuntos}/>
          <Text style={styles.textMonto}>2341.90</Text>
        </View>
        <View style={styles.OpeContainer}>

        <View style={styles.Operaciones} >
           <Pressable style={styles.btnOpe}>
              <Image source={require('../assets/icons8-plus-64.png')} style={styles.iconsOpe}/>
           </Pressable>
           <Text style={styles.textOperaciones}>Pagar</Text>
        </View>
        <View style={styles.Operaciones} >
           <Pressable style={styles.btnTransf}>
             <Image source={require('../assets/icons8-arrow-64.png')} style={styles.arrowLeft}/>
           </Pressable>
           <Text style={styles.textOperaciones}>Transferir</Text>
         
        </View>
        <View style={styles.Operaciones} >
           <Pressable style={styles.btnRecibir}>
              <Image source={require('../assets/icons8-arrow-64.png')} style={styles.arrowRight}/>
           </Pressable>
           <Text style={styles.textOperaciones}>Recibir</Text>

        </View>
        <View style={styles.Operaciones} >
           <Pressable style={styles.btnNut}>
            <Image source={require('../assets/icons8-production-order-96.png')} style={styles.iconsOpe}/>
           </Pressable>
           <Text style={styles.textOperaciones}>Ajustes</Text>
        </View>
       
        </View>

        <View style={{marginTop:15}}>
            <Text style={styles.ultimasOPeraciones}>Últimas Operaciones</Text>
        </View>
        <View style={{marginTop:20, backgroundColor:'#EFEFEF',width:'100%', borderRadius:20,height:40, }}></View>
        
         <View style={styles.historialContainer}>
           <View style={styles.historial}>
            <View style={{alignItems:'flex-start',justifyContent:'space-between', marginVertical:20,flexDirection:'row'}}>
              <View style={styles.recibirHistorial}>
                
                <Image source={require('../assets/icons8-arrow-64.png')} style={styles.arrowRight}/>
              </View>
              <View style={{marginRight:12}}>
                
                <Text style={{fontWeight:'700', fontSize:18}}>Mauricio García</Text>
               <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text  style={{fontWeight:'700', fontSize:14, color:'#969696'}}>#4455</Text>
                  <Text  style={{fontWeight:'700', fontSize:16, color:'#969696'}}>11/10/23</Text>
               </View>  
              </View>
            <View>
               <Text style={{ fontSize:24, color:'#00CC66', marginTop:6 }}>8989.80</Text>
            </View>
           </View>
           </View>
           <View style={styles.historial}>
            <View style={{alignItems:'flex-start',justifyContent:'space-between', marginVertical:20,flexDirection:'row'}}>

              <View style={styles.pagadoHistorial}>
                
                <Image source={require('../assets/icons8-arrow-64.png')} style={styles.arrowLeft}/>
              </View>
              <View style={{marginRight:12}}>
                
                <Text style={{fontWeight:'700', fontSize:18}}>Mauricio García</Text>
               <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text  style={{fontWeight:'700', fontSize:14, color:'#969696'}}>#4455</Text>
                  <Text  style={{fontWeight:'700', fontSize:16, color:'#969696'}}>11/10/23</Text>
               </View>  
              </View>
            <View>
               <Text style={{fontWeight:'700', fontSize:35, color:'#CC0000', marginTop:6 }}>8989.80</Text>
            </View>
           </View>
           </View>
           <View style={styles.historial}>
            <View style={{alignItems:'flex-start',justifyContent:'space-between', marginVertical:20,flexDirection:'row'}}>

              <View style={styles.pagadoHistorial}>
                
                <Image source={require('../assets/icons8-arrow-64.png')} style={styles.arrowLeft}/>
              </View>
              <View style={{marginRight:12}}>
                
                <Text style={{fontWeight:'700', fontSize:18}}>Mauricio García</Text>
               <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text  style={{fontWeight:'700', fontSize:14, color:'#969696'}}>#4455</Text>
                  <Text  style={{fontWeight:'700', fontSize:16, color:'#969696'}}>11/10/23</Text>
               </View>  
              </View>
            <View>
               <Text style={{fontWeight:'700', fontSize:35, color:'#CC0000', marginTop:6 }}>8989.80</Text>
            </View>
           </View>
           </View>
           <View style={styles.historial}>
            <View style={{alignItems:'flex-start',justifyContent:'space-between', marginVertical:20,flexDirection:'row'}}>

              <View style={styles.pagadoHistorial}>
                
                <Image source={require('../assets/icons8-arrow-64.png')} style={styles.arrowLeft}/>
              </View>
              <View style={{marginRight:12}}>
                
                <Text style={{fontWeight:'700', fontSize:18}}>Mauricio García</Text>
               <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                  <Text  style={{fontWeight:'700', fontSize:14, color:'#969696'}}>#4455</Text>
                  <Text  style={{fontWeight:'700', fontSize:16, color:'#969696'}}>11/10/23</Text>
               </View>  
              </View>
            <View>
               <Text style={{fontWeight:'700', fontSize:35, color:'#CC0000', marginTop:6 }}>8989.80</Text>
            </View>
           </View>
           </View>
         </View>
        </ScrollView>
    </View>
      
    </View>
     
  )
}
const styles = StyleSheet.create({
 container:{
marginHorizontal:10,
marginTop:10,
 },
 arrowLeft:{
  width:40,
  height:40,
justifyContent:'center',
alignItems:'center',
transform:[{rotate:'-40deg'}],
 },
 arrowRight:{
  width:40,
  height:40,
justifyContent:'center',
alignItems:'center',
transform:[{rotate:'130deg'}],
 },
 OpeContainer:{
  marginTop:10,
flexDirection:'row',
justifyContent:'space-around'
 },
 Operaciones:{
  flexDirection:'column',
  alignItems:'flex-start',
 },
 montoContainer:{
flexDirection:'row',
alignItems:'flex-start',

 },
  logoPuntos:{
    borderRadius:100,
    width:25,
    height:25,
    marginRight:10,
    marginTop:15,
   
  },
  textMonto:{
    color:'#2d2d2d',
  fontWeight:'700',
  fontSize:40
  },
  ultimasOPeraciones:{
    fontWeight:'700',
    fontSize:20
  },
  textOperaciones:{
    
    fontWeight:'800',
    fontSize:14 ,
    marginLeft:5,
    marginTop:3
  },
  iconsOpe:{
    width:40,
    height:40,
  justifyContent:'center',
  alignItems:'center',
 
  },
  btnOpe:{
    borderRadius:100,
    width:50,
    height:50,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#0077B2',
  
  },
  btnTransf:{
    borderRadius:100,
    width:50,
    height:50,
    marginLeft:10,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#0096C7',
  },
  btnRecibir:{
    borderRadius:100,
    width:50,
    height:50,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#00B4D8',
  },
  btnNut:{
    borderRadius:100,
    width:50,
    height:50,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#023E88',
  },
  historial:{
    width:'96%',
    height: 100,
    borderTopWidth: 2,
    borderBottomWidth:2,
    borderColor:'#969696',
    justifyContent:'center',
    marginHorizontal:4
  },
  historialContainer:{
  marginTop:10,
  },
  recibirHistorial:{
    borderRadius:100,
    width:50,
    height:50,
    flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#00CC66',
  },
  pagadoHistorial:{
    borderRadius:100,
    width:50,
    height:50,
    flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#CC0000',
  },
})