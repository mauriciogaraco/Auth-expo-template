 /* React Native
You will get the same performance boost and enhancement in React Native. To integrate with input component, you can wrap it with Controller.

COPY
EXPO
JS*/
import { Text, View,  Button, Alert ,StyleSheet} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { palette } from "../../theme/colors"
import TextInputController from "../atoms/formControls/TextInputController"
import { TextInput } from "react-native-paper"

export default function () {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })
  const onSubmit = (data: any) => console.log(data)

  return (
    <View>
      <TextInputController
              controller={{
                name: "name",
                rules: {
                  required: {
                    value: true,
                    message: "Correo electrónico requerido",
                  },
                  
                },
                control: control as any,
              }}
              style={styles.input}
              placeholder="Nombre"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
            
              returnKeyType="next"
              right={
                <TextInput.Icon
                icon='human'
                color="#c1c1c1"
                />
              }
            
              />  
     <TextInputController
              controller={{
                name: "email",
                rules: {
                  required: {
                    value: true,
                    message: "Correo electrónico requerido",
                  },
                  
                },
                control: control as any,
              }}
              style={styles.input}
              placeholder="Correo electr&oacute;nico"
              dense
              textColor={palette.secondary}
              autoCapitalize={"none"}
              keyboardType="email-address"
              returnKeyType="next"
              right={
                <TextInput.Icon
                icon='email'
                color="#c1c1c1"
                />
              }
            
              />
    
    { /* <Button  title="Submit" onPress={handleSubmit(onSubmit)} />*/}
    <TextInputController
              controller={{
                name: "password",
                control: control as any,
                rules: {
                  required: { value: true, message: "Contraseña requerida" },
                },
              }}
              style={styles.input}
              placeholder="Contrase&ntilde;a"
              dense
              
              returnKeyType="done"
              onSubmitEditing={() => handleSubmit(onSubmit)()}
              right={
                <TextInput.Icon
                icon='eye'
                color="#c1c1c1"
                />
              }
            />
     <TextInputController
              controller={{
                name: "password",
                control: control as any,
                rules: {
                  required: { value: true, message: "Contraseña requerida" },
                },
              }}
              style={styles.input}
              placeholder="Confirma contraseña"
              dense
              
              returnKeyType="done"
              onSubmitEditing={() => handleSubmit(onSubmit)()}
              right={
                <TextInput.Icon
                icon='eye'
                color="#c1c1c1"
                />
              }
            />        
    </View> 
  )
}/*
TypeScript
React Hook Form is built with TypeScript, and you can define a FormData type to support form values.

COPY
CODESANDBOX
TS
import * as React from "react"
import { useForm } from "react-hook-form"

type FormData = {
  firstName: string
  lastName: string
}

export default function App() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => console.log(data))
  // firstName and lastName will have correct type

  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Last Name</label>
      <input {...register("lastName")} />
      <button
        type="button"
        onClick={() => {
          setValue("lastName", "luo") // ✅
          setValue("firstName", true) // ❌: true is not string
          errors.bill // ❌: property bill does not exist
        }}
      >
        SetValue
      </button>
    </form>
  )
}*/
const styles = StyleSheet.create({
 
  
    viewContainer: {
      marginRight: 40,
      marginLeft: 40,
      marginTop: 20,
      // flex: 1,
      // backgroundColor: "#20a17c",
    },
  
    textLogIn: {
      marginTop: 15,
      fontWeight: "bold",
      fontSize: 22,
      alignSelf: "center",
    },
  
    formContainer: {
      // flex: 1,
      paddingVertical: 20,
      alignItems: "center",
      justifyContent: "center",
      
    },
    input: {
      width: 280,
      height:30,
      backgroundColor: palette.white,
      borderColor: palette.icons,
      borderRadius: 100,
      
      paddingHorizontal:20,
      paddingVertical:5,
      margin:10
    },
    btnLogIn: {
      marginTop: 20,
      width: 240,
      // height: 50,
    },
  });
  