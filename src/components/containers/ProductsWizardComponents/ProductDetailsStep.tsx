import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import TextInputController from "../../atoms/formControls/TextInputController";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { palette } from "../../../theme/colors";
import { Button } from "react-native-paper";
import Layout from "../../../utils/Layout";
import {
  selectProductForm,
  updateData,
} from "../../../store/slices/productFormSlice";
import CurrencyOptionsList from "./CurrencyOptionsList";
import SalesCategoryOptionsList from "./SalesCategoryOptionsList";
import ProductCategoryOptionsList from "./ProductCategoryOptionsList";
import ProductionAreasOptionsList from "./ProductionAreasOptionsList";
import MeasureOptionsList from "./MeasureOptionsList";

const width = Layout.window.width;

export default function ProductDetailsStep() {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProductForm);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: product.name || "",
      price: product.price || "",
      codeCurrency: product.codeCurrency || "",
      salesCategoryId: product.salesCategoryId || "",
      productCategoryId: product.productCategoryId || "",
      measure: product.measure || "",
      prodAreas: product.listProductionAreas || [],
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: any) => {
    let prodAreas = [];
    if (data.listProductionAreas) {
      prodAreas = data.listProductionAreas?.filter(
        (area: any) => area !== undefined
      );
    }
    const salesCategoryId =
      data.salesCategoryId !== -1 ? data.salesCategoryId : null;
    const productCategoryId =
      data.productCategoryId !== -1 ? data.productCategoryId : null;
    dispatch(
      updateData({
        step: 2,
        ...data,
        listProductionAreas: prodAreas,
        salesCategoryId,
        productCategoryId,
      })
    );
  };

  const showSalesAndPrice = [
    "STOCK",
    "VARIATION",
    "MENU",
    "COMBO",
    "SERVICE",
    "ADDON",
  ].includes(product.type);
  const showProductCategories = [
    "STOCK",
    "RAW",
    "MANUFACTURED",
    "WASTE",
    "ASSET",
  ].includes(product.type);
  const showProductionAreas = ["MENU", "ADDON", "SERVICE"].includes(
    product.type
  );
  const showMeasure = ["RAW", "MANUFACTURED", "WASTE"].includes(product.type);

  return (
    <ScrollView
      style={{
        padding: 10,
        flex: 1,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <FormProvider {...methods}>
        <View style={styles.content}>
          <Text style={styles.label}>Nombre del producto</Text>
          <TextInputController
            controller={{
              control: control as any,
              name: "name",
              rules: {
                required: "Debe indicar el nombre del producto",
              },
            }}
            style={styles.input}
            placeholder="Inserte el nombre del producto"
          />
          {showSalesAndPrice ? (
            <>
              <Text style={styles.label}>Precio de venta</Text>
              <TextInputController
                controller={{
                  control: control as any,
                  rules: { required: "Debe especificar un precio" },
                  name: "price",
                }}
                style={styles.input}
                inputMode="numeric"
                placeholder="0"
              />
              <CurrencyOptionsList labelStyle={styles.label} />
              <SalesCategoryOptionsList labelStyle={styles.label} />
            </>
          ) : null}

          {showProductCategories ? (
            <ProductCategoryOptionsList labelStyle={styles.label} />
          ) : null}
          {showMeasure ? (
            <MeasureOptionsList labelStyle={styles.label} />
          ) : null}
          {showProductionAreas ? (
            <ProductionAreasOptionsList labelStyle={styles.label} />
          ) : null}

          <View style={styles.actions}>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              buttonColor={palette.primary}
              textColor={palette.secondary}
              labelStyle={{ fontSize: 15, fontWeight: "600" }}
              contentStyle={{ width: "100%" }}
              style={{ width: width / 1.8 }}
            >
              Siguiente
            </Button>
          </View>
        </View>
      </FormProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    // padding: 10,
    flexGrow: 1,
    alignItems: "flex-start",
  },
  input: {
    width: "100%",
    borderColor: palette.icons,
    fontSize: 15,
    fontWeight: "300",
    color: palette.icons,
  },
  label: {
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 15,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "500",
    color: palette.secondary,
    paddingHorizontal: 5,
  },
  actions: {
    flex: 1,
    flexShrink: 1,
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
