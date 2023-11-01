import { StyleSheet, View } from "react-native";
import React from "react";
import { StoreParamList } from "../../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/root";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import {
  resetFormState,
  updateData,
} from "../../../store/slices/dispatchOperationSlice";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ScrollView } from "react-native-gesture-handler";
import { Button, IconButton, Text } from "react-native-paper";
import TextInputController from "../../atoms/formControls/TextInputController";
import { palette } from "../../../theme/colors";
import Layout from "../../../utils/Layout";
import { useMakeDispatchMutation } from "../../../store/api/areasApi";

type WizardFormScreenNavigationProp = StackNavigationProp<
  StoreParamList,
  "WizardFormScreen"
>;

export default function DispatchDetails() {
  const formState = useAppSelector((state: RootState) => state.dispatchForm);
  const navigation = useNavigation<WizardFormScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [newDispatch, { isLoading }] = useMakeDispatchMutation();

  const onBack = (formData: any) => {
    dispatch(
      updateData({
        step: 2,
        details: formData.details,
      })
    );
  };

  const onSubmit = async (formData: any) => {
    const data = {
      mode: formState.mode || "MOVEMENT",
      products: formState.products.map((prod) => {
        return {
          stockAreaProductId: prod.id,
          quantity: prod.quantity!,
        };
      }),
      stockAreaToId: formState.toAreaId!,
      stockAreaFromId: formState.fromAreaId!,
      observations: formData.details,
    };

    // console.log("data", data);

    await newDispatch(data)
      .unwrap()
      .then(() => {
        dispatch(resetFormState());
        navigation.navigate("SuccessWizardScreen");
      })
      .catch((err) => {
        // console.log("err", err);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: (err as any)?.data || "Ha ocurrido un error!",
          position: "top",
          topOffset: 9,
        });
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        // backgroundColor: "lightgreen",
        padding: 10,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.labelContainer}>
          <IconButton
            icon={() => (
              <AntDesign name="arrowleft" size={24} color={palette.primary} />
            )}
            iconColor={palette.primary}
            size={20}
            onPress={handleSubmit(onBack)}
          />
          <Text variant="labelLarge">Agregue una nota: </Text>
        </View>
        <TextInputController
          controller={{
            control: control,
            defaultValue: formState?.details,
            name: "details",
            rules: {
              required: "Agregue una descripción para la operación",
            },
          }}
          multiline={true}
          placeholder="Nota"
          outlineStyle={{
            borderRadius: 30,
            backgroundColor: palette.white,
          }}
          style={{
            minHeight: Layout.window.height / 2,
            width: "100%",
            padding: 10,
          }}
        />
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            buttonColor={palette.primary}
            textColor={palette.secondary}
            labelStyle={{ fontSize: 15, fontWeight: "600" }}
            style={{ width: Layout.window.width / 1.8 }}
            loading={isLoading || isSubmitting}
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? "Finalizando " : "Finalizar "}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    flexGrow: 1,
  },
  actions: {
    flex: 1,
    flexShrink: 1,
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  labelContainer: {
    // flex: 1,
    // alignSelf: "center",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // paddingHorizontal: 10,
  },
});
