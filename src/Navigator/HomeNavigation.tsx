import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NotificationScreen } from '../screens/NotificationScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { DetallesCardScreen } from '../screens/DetallesCardScreen';

const Stack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:true, 
        cardStyle: {backgroundColor:'white' }
        }}>
        <Stack.Screen name='ProtectedScreen' component={ProtectedScreen}  options={{ title: 'Overview', headerShown:false }} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} options={{ title: 'Notificaciones' }} />
        <Stack.Screen name='PerfilScreen' component={PerfilScreen} options={{ title: 'Perfil' }} />
        <Stack.Screen name='DetallesCardScreen' component={DetallesCardScreen} options={{ title: 'Detalles' }} />
        
    </Stack.Navigator>
  )
}
