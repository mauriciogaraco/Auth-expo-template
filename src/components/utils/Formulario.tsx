
import { Text, View,  Button, Alert ,StyleSheet, TextInput, TouchableOpacity} from "react-native"

import { palette } from "../../theme/colors"

import { IconButton} from "react-native-paper"
import { useForm } from "../../hooks/useForm";
import { loginStyles } from "../../theme/loginTheme";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<any,any>{

}
export default function ({navigation}:Props) {

  const { email,password, onChange}=  useForm({
    email:'',
    password:''
    });
    const onLogin = () =>{
        console.log({email,password})
    }

  const onSubmit = (data: any) => console.log(data);

  return (
    <View >
      
    </View> 
  )
}


  