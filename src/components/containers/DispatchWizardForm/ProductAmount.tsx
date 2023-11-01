import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { palette } from "../../../theme/colors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addProduct,
  selectCurrentProduct,
  updateProduct,
} from "../../../store/slices/dispatchOperationSlice";
import { RootState } from "../../../store/root";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import TextInputController from "../../atoms/formControls/TextInputController";
import { getMeasureSpanish } from "../../../utils/utils";
import WizardProductComponent from "../OperationsWizardForm/Components/WizardProductComponent";
import { Button } from "react-native-paper";
import Layout from "../../../utils/Layout";

export default function ProductAmount() {
  const currentProduct = useAppSelector(selectCurrentProduct);
  const { toArea } = useAppSelector((state: RootState) => state.opForm);
  const dispatch = useAppDispatch();

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      quantity: currentProduct?.quantity?.toString() || "",
    },
    mode: "onChange",
  });

  const amount = watch("quantity");

  const onSubmit = (data: any) => {
    const productData = {
      ...currentProduct!,
      quantity: Number(data.quantity),
    };

    if (currentProduct?.quantity) {
      dispatch(updateProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }
  };

  return (
    <ScrollView
      // style={{ flex: 1, backgroundColor: "pink" }}
      style={{
        paddingHorizontal: 10,
        flex: 1,
        // backgroundColor: "aliceblue",
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={styles.headline}>{currentProduct?.productName}</Text>
        <TextInputController
          controller={{
            control: control as any,
            name: "quantity",
            rules: {
              required: "Debe indicar una cantidad",
              min: 0,
              max: {
                value: currentProduct?.oldQuantity!,
                message: `Cantidad no debe superar la disponibilidad`,
              },
            },
          }}
          style={styles.input}
          placeholder={`Cantidad en ${getMeasureSpanish(
            currentProduct?.measure
          )}`}
          keyboardType="number-pad"
        />

        <WizardProductComponent
          image={currentProduct?.image!}
          productName={currentProduct?.productName!}
          toArea={toArea || -1}
          oldQuantity={currentProduct?.oldQuantity}
          newQuantity={parseFloat(amount)}
          measure={currentProduct?.measure}
        />

        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            buttonColor={palette.primary}
            textColor={palette.secondary}
            labelStyle={{ fontSize: 15, fontWeight: "600" }}
            contentStyle={{ width: "100%" }}
            style={{ width: Layout.window.width / 1.8 }}
          >
            Siguiente
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headline: {
    color: palette.secondary,
    fontWeight: "700",
    fontSize: 20,
    // textAlign: "center",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    flexGrow: 1,
    // margin: 10,
    alignItems: "flex-start",
    // width: "100%",
    // backgroundColor: colors.lightBlue,
  },
  input: {
    width: "100%",
    borderColor: palette.icons,
    fontSize: 15,
    fontWeight: "300",
    // borderRadius: 20,
  },
  label: {
    // marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 15,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "500",
    color: palette.secondary,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 15,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "500",
    color: palette.secondary,
    marginLeft: 10,
  },

  summaryRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.secondary,
  },
  summaryTextRight: {
    textAlign: "right",
  },
  actions: {
    // width: "100%",
    flex: 1,
    flexShrink: 1,
    // backgroundColor: "lightblue",
    // marginVertical: 10,
    marginBottom: 5,
    // paddingHorizontal: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    overflow: "hidden",
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
});
