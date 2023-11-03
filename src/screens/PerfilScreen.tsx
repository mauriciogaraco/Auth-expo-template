import React from 'react'
import { Text, View , StyleSheet, Image} from 'react-native'
import { palette } from '../theme/colors'
import { useLogoutMutation } from '../store/api/authApi';
import RenderItemNavList from '../components/atoms/RenderItemNavList';

import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/slices/sessionSlice';


export const PerfilScreen = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const user = useAppSelector(selectCurrentUser);

 
  return (
    <View>
      
       <View style={{backgroundColor:palette.primary , width:'100%', height:300}}>
       <View style={styles.avatarContainer}>
        <Image source={require('../assets/images/default.jpeg')} style={{width:200, height:200, borderRadius:100}}/>
        <Text style={styles.username}>userName</Text>
        <Text style={styles.subTitle}>Propietario de negocio</Text>
      </View>
       </View>
       <View>
       <RenderItemNavList
        text="Cerrar Sesión"
        onPress={() => logout()}
        icon={"sign-out-alt"}
      />
       </View>
   </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "500",
    marginLeft: 30,
    marginVertical: 5,
  },
  avatarContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  avatar: {
    height: 100,
    backgroundColor: palette.primary,
    borderRadius: 100,
    width: 100,
    alignSelf: "center",
  },
  username: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  subTitle: {
    // marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: palette.icons,
  },
});
/*



*/