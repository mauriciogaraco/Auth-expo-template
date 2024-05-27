import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ProductsParamList, ProfileParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import { stylesRegister } from "../auth/LoginScreen";
import { palette } from "../../theme/colors";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";

import { Button, TextInput } from "react-native-paper";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import { useLoginMutation } from "../../store/api/authApi";
import { useForm } from "react-hook-form";
import TextInputController from "../../components/atoms/formControls/TextInputController";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props extends StackScreenProps<ProfileParamList, "ViewTicket"> {}
export const ViewTicket = ({ navigation, route }: Props) => {
  const { category, description, email, titleTicket } = route.params;

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      password: "",
    },
  });

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
            marginTop: heigth * 0.1,
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
          <View style={{ padding: 10 }}>
            <View style={{ marginHorizontal: "auto" }}>
              <Text style={styles.LabelInput}>Título:</Text>
              <Text style={styles.textView}>{titleTicket}</Text>
              <View
                style={{
                  borderColor: "#c1c1c1",
                  borderWidth: 1,
                  marginBottom: 10,
                }}
              />
              <Text style={styles.LabelInput}>Email:</Text>
              <Text style={styles.textView}>{email}</Text>
              <View
                style={{
                  borderColor: "#c1c1c1",
                  borderWidth: 1,
                  marginBottom: 10,
                }}
              />
              <Text style={styles.LabelInput}>Categoría:</Text>
              <Text style={styles.textView}>{category}</Text>
              <View
                style={{
                  borderColor: "#c1c1c1",
                  borderWidth: 1,
                  marginBottom: 10,
                }}
              />
              <Text style={styles.LabelInput}>Descripción:</Text>
              <Text style={styles.textView}>{category}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputObservations: {
    width: 280,
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
  textView: {
    fontFamily: "Poppins-Light",
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
