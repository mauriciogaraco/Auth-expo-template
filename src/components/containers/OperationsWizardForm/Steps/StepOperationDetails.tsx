import {
  StyleSheet,
  View,
  // KeyboardAvoidingView,
  // Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { Button, IconButton, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { palette } from "../../../../theme/colors";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store/root";
import {
  // FormStepProduct,
  FormStepsData,
  resetFormState,
  updateData,
} from "../../../../store/slices/operationFormSlice";
import { useNewStockMovementMutation } from "../../../../store/api/areasApi";
import { StoreParamList } from "../../../../navigation/types";
import TextInputController from "../../../atoms/formControls/TextInputController";
import Layout from "../../../../utils/Layout";
// import { selectCurrentBusiness } from "../../../../store/slices/businessSlice";

// Final data structure to be send to the server
// It may vary depending on the selected operation
// interface NewStockMovementProduct {
//   productId: number;
//   price: {
//     amount: number;
//     codeCurrency: string;
//   };
//   quantity: number;
// description: string
// }

type WizardFormScreenNavigationProp = StackNavigationProp<
  StoreParamList,
  "WizardFormScreen"
>;

export default function StepOperationDetails() {
  const formState = useAppSelector((state: RootState) => state.opForm);
  // const business = useAppSelector(selectCurrentBusiness);
  // const businessCurrency = business?.mainCurrency;
  const navigation = useNavigation<WizardFormScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [newOperation, { isLoading }] = useNewStockMovementMutation();

  const getSubmitData = (item: FormStepsData, details: string) => {
    const { operationType, products } = item;

    switch (operationType) {
      case "ENTRY":
        return {
          type: "entry",
          data: {
            products: products.map((prod) => {
              const { price: cost, priceType, quantity, currency } = prod;
              // const exchangeRate =
              // business?.availableCurrencies.find((item) => item.code === currency)
              //   ?.exchangeRate || 1;

              //   if (businessCurrency !== currency) {
              //     productCost = productCost * exchangeRate;
              //   }
              const priceAmount =
                priceType === "total" ? cost! / quantity! : cost;
              const price = cost
                ? { amount: priceAmount, codeCurrency: currency }
                : null;

              return {
                productId: prod.id,
                quantity: prod.quantity,
                supplierId: prod.supplierId,
                ...(price && { price: price }),
              };
            }),
            stockAreaId: item.fromArea,
            description: details,
          },
        };
      case "OUT":
        return {
          type: "out",
          data: {
            products: products.map((prod) => ({
              productId: prod.id,
              quantity: prod.quantity,
            })),
            stockAreaId: item.fromArea,
            description: details,
          },
        };
      case "MOVEMENT":
        return {
          type: "move",
          data: {
            products: products.map((prod) => {
              return {
                productId: prod.id,
                quantity: prod.quantity,
              };
            }),
            stockAreaToId: item.toArea,
            stockAreaFromId: item.fromArea,
            description: details,
          },
        };
      case "ADJUST":
        return {
          type: "adjust",
          data: {
            products: products.map((prod) => {
              return {
                productId: prod.id,
                quantity: prod.quantity,
              };
            }),
            stockAreaId: item.fromArea,
            description: details,
          },
        };
    }
    return;
  };

  const onBack = (formData: any) => {
    dispatch(
      updateData({
        step: 2,
        details: formData.details,
      })
    );
  };

  const onSubmit = async (formData: any) => {
    const data = getSubmitData(formState, formData.details);
    // console.log("data", JSON.stringify(data));
    await newOperation(data)
      .unwrap()
      .then(() => {
        dispatch(resetFormState());
        navigation.navigate("SuccessWizardScreen");
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: (err as any)?.data || "Ha ocurrido un error!",
          position: "top",
          topOffset: 9,
        });
      });
  };

  const requiredField =
    formState.operationType === "OUT" || formState.operationType === "ADJUST";

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
              required: {
                value: requiredField,
                message: "Agregue una descripción para la operación",
              },
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
