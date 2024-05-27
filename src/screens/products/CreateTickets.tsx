import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ProductsParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import { stylesRegister } from "../auth/LoginScreen";
import { palette } from "../../theme/colors";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";

import { Button, TextInput } from "react-native-paper";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import { useLoginMutation } from "../../store/api/authApi";
import { useForm } from "react-hook-form";
import TextInputController from "../../components/atoms/formControls/TextInputController";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/sessionSlice";
import Toast from "react-native-toast-message";
import { useCreateTicketMutation } from "../../store/api/productsApi";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props extends StackScreenProps<ProductsParamList, "CreateTickets"> {}
export const CreateTickets = ({ navigation, route }: Props) => {
  const user = useAppSelector(selectCurrentUser);

  const [showPassword, setShowPassword] = useState(false);
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const { category } = route.params;

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      category: category || "e",
      email: user?.email || "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    const Data = {
      email: data.email,
      description: data.description,
      title: data.title,
      username: user?.name || "",
      category: data.category,
    };

    await createTicket(Data)
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: "success",
          text1: "Èxito",
          text2: `Ticket creado con éxito`,
        });
        navigation.navigate("ProductsScreen");
      })
      .catch((res: any) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${res.data}`,
        });
      });
  };

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={stylesRegister.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginTop: heigth * 0.03,
            borderRadius: 10,
            width: width * 0.9,
            alignSelf: "center",
            backgroundColor: "#fff",
            marginBottom: 10,
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <View style={stylesRegister.formContainer}>
            <View style={{ marginHorizontal: "auto" }}>
              <Text style={styles.LabelInput}>Título</Text>
              <TextInputController
                controller={{
                  name: "title",
                  rules: {
                    required: {
                      value: true,
                      message: "Título requerido requerido",
                    },
                  },
                  control: control as any,
                }}
                style={styles.input}
                placeholder="Eje: Tiempo de Entrega del producto"
                dense
                textColor={palette.secondary}
                autoCapitalize={"none"}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => setFocus("email")}
              />
              <Text style={styles.LabelInput}>email</Text>
              <TextInputController
                controller={{
                  name: "email",
                  control: control as any,
                  rules: {
                    required: { value: true, message: "correo requerida" },
                  },
                }}
                style={styles.inputPassword}
                dense
                disabled
                returnKeyType="done"
                onSubmitEditing={() => handleSubmit(onSubmit)()}
              />
              <Text style={styles.LabelInput}>Categoría</Text>
              <TextInputController
                controller={{
                  name: "category",
                  control: control as any,
                  rules: {
                    required: { value: true, message: "Categoría requerida" },
                  },
                }}
                style={styles.inputPassword}
                disabled
                dense
                returnKeyType="done"
                onSubmitEditing={() => handleSubmit(onSubmit)()}
              />
              <Text style={styles.LabelInput}>Descripción</Text>

              <TextInputController
                controller={{
                  name: "description",

                  control: control as any,
                }}
                style={styles.inputObservations}
                placeholder="Describe el problema"
                dense
                textColor={palette.secondary}
                autoCapitalize={"none"}
                multiline={true}
                returnKeyType="next"
                outlineStyle={{ borderRadius: 12 }}
              />
            </View>

            <Button
              style={[stylesRegister.btnLogIn]}
              mode="contained"
              buttonColor={palette.primary}
              rippleColor={palette.datesFilter}
              onPress={handleSubmit(onSubmit)}
              textColor={palette.white}
              loading={isSubmitting}
              disabled={(isDirty && !isValid) || isSubmitting || isLoading}
              labelStyle={stylesRegister.textLogIn}
            >
              {isSubmitting ? "Creando" : "Crear"}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputObservations: {
    width: 300,
    height: 180,

    backgroundColor: palette.white,
    borderColor: palette.icons,
    // paddingLeft: 20,
    paddingVertical: 5,
    marginVertical: 2,
  },
  LabelInput: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    // flex: 1,
    // backgroundColor: "#20a17c",
  },

  formContainer: {
    // flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,
  },
  inputPassword: {
    width: 300,
    height: 45,
    backgroundColor: palette.white,
  },
});
