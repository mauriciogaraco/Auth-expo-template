import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React from "react";
import { Button, Switch } from "react-native-paper";
import { palette } from "../../../../theme/colors";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store/root";
import { selectCurrentBusiness } from "../../../../store/slices/businessSlice";
import {
  addProduct,
  selectCurrentProduct,
  selectOperationType,
  updateProduct,
} from "../../../../store/slices/operationFormSlice";
import { getMeasureSpanish } from "../../../../utils/utils";
import TextInputController from "../../../atoms/formControls/TextInputController";
import RadioButtonController from "../../../atoms/formControls/RadioButtonController";
import Layout from "../../../../utils/Layout";
import WizardProductComponent from "../Components/WizardProductComponent";
import CostSummarySection from "../Components/CostSummarySection";
import { globals } from "../../../../theme/styles/global";
import SupplierOptionsList from "../Components/SupplierOptionsList";

export default function StepProductAmount() {
  const business = useAppSelector(selectCurrentBusiness);
  const currentProduct = useAppSelector(selectCurrentProduct);
  const { toArea } = useAppSelector((state: RootState) => state.opForm);
  const operationType = useAppSelector(selectOperationType);
  const dispatch = useAppDispatch();

  const priceTypeOptions = [
    {
      label: "Por precio unitario",
      key: "unitario",
    },
    {
      label: "Por precio total",
      key: "total",
    },
  ];
  const currencyOptions = business?.availableCurrencies.map((item) => ({
    label: item.code,
    key: item.code,
  }));

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      quantity: currentProduct?.quantity?.toString() || "",
      hasPrice: currentProduct?.price ? true : false,
      price: currentProduct?.price?.toString() || "",
      priceType: currentProduct?.priceType || "unitario",
      currency: currentProduct?.currency || business?.mainCurrency,
      supplierId: currentProduct?.supplierId || null,
    },
    mode: "onChange",
  });

  const renderPriceTypes = (item: any, index: number) => {
    return (
      <RadioButtonController
        key={index}
        controller={{
          control: control as any,
          name: "priceType",
          defaultValue: currentProduct?.priceType || "unitario",
        }}
        data={item}
      />
    );
  };
  const renderCurrencies = ({ item }: any) => {
    return (
      <RadioButtonController
        controller={{ control: control as any, name: "currency" }}
        data={item}
      />
    );
  };
  const hasPrice = watch("hasPrice");
  const priceType = watch("priceType");
  const amount = watch("quantity");
  const price = watch("price");
  const codeCurrency = watch("currency");

  const onSubmit = (data: any) => {
    const priceData = {
      price: data?.price,
      priceType: data?.priceType,
      currency: data?.currency,
    };
    const productData = {
      ...currentProduct,
      ...(hasPrice && priceData),
      quantity: Number(data.quantity),
      supplierId: data.supplierId,
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
              max:
                operationType === "OUT" || operationType === "MOVEMENT"
                  ? {
                      value: currentProduct?.oldQuantity!,
                      message: `Cantidad no debe superar la disponibilidad`,
                    }
                  : undefined,
            },
          }}
          style={styles.input}
          placeholder={`Cantidad en ${getMeasureSpanish(
            currentProduct?.measure
          )}`}
          keyboardType="number-pad"
        />
        {operationType === "ENTRY" && (
          <>
            <SupplierOptionsList control={control} />
            <View style={styles.switch}>
              <Controller
                name="hasPrice"
                // defaultValue={currentProduct?.price ? true : false}
                control={control}
                render={({ field }) => (
                  <Switch
                    value={field.value}
                    onValueChange={field.onChange}
                    color={palette.primary}
                  />
                )}
              />
              <Text style={styles.switchLabel}>
                Establecer precio de compra
              </Text>
            </View>
          </>
        )}

        {hasPrice && (
          <>
            <View
              style={[
                globals.filterBar,
                styles.bar,
                {
                  justifyContent: "space-around",
                },
              ]}
            >
              {priceTypeOptions.map(renderPriceTypes)}
            </View>
            <TextInputController
              controller={{
                control: control as any,
                rules: { required: hasPrice && "Debe especificar un precio" },
                name: "price",
              }}
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Indique un precio"
            />

            <Text style={styles.label}>Moneda</Text>
            <View style={[globals.filterBar, styles.bar]}>
              <FlatList
                data={currencyOptions}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderCurrencies}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // centerContent={true}
                contentContainerStyle={{
                  justifyContent: "space-evenly",
                  minWidth: "100%",
                }}
              />
            </View>
            {/* summary section */}
            <CostSummarySection
              amount={parseFloat(amount) || 0}
              newCost={parseFloat(price) || 0}
              newCurrency={codeCurrency!}
              prevCost={currentProduct?.oldPrice!}
              priceType={priceType}
            />
          </>
        )}

        {operationType === "MOVEMENT" && (
          <WizardProductComponent
            image={currentProduct?.image!}
            productName={currentProduct?.productName!}
            toArea={toArea || -1}
            oldQuantity={currentProduct?.oldQuantity}
            newQuantity={parseFloat(amount)}
            measure={currentProduct?.measure}
          />
        )}
        {(operationType === "OUT" || operationType === "ADJUST") && (
          <WizardProductComponent
            image={currentProduct?.image!}
            productName={currentProduct?.productName!}
            oldQuantity={currentProduct?.oldQuantity}
            newQuantity={parseFloat(amount)}
            price={currentProduct?.oldPrice}
            priceCurrency={business?.mainCurrency!}
            measure={currentProduct?.measure}
          />
        )}
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
