import React from 'react'
import {View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/Navigator/Navigator';
import { HomeNavigation } from './src/Navigator/HomeNavigation';
import { useSelector } from 'react-redux';
import { selectCurrentAuth } from './src/store/slices/sessionSlice';

export default function MainNavigatior() {
  const auth = useSelector(selectCurrentAuth);
  return (
    <NavigationContainer>
      
        {
          (!auth) ?
  <Navigator/>:
     <HomeNavigation/>
        }
      
    </NavigationContainer>
  )
}
