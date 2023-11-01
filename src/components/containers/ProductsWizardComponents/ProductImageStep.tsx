import { StyleSheet, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { Button } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  resetFormState,
  selectProductForm,
} from "../../../store/slices/productFormSlice";
import Layout from "../../../utils/Layout";
import { palette } from "../../../theme/colors";
import UploadImageComponent from "./UploadImageComponent";
import { useAddProductMutation } from "../../../store/api/productsApi";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProductParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Layout.window;

type ProductFormScreenNavigationProp = StackNavigationProp<
  ProductParamList,
  "ProductAddScreen"
>;

export default function ProductImageStep() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectProductForm);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigation = useNavigation<ProductFormScreenNavigationProp>();

  const setRquestData = () => {
    const imagesIds = data.images.map((img) => img.id);
    const datareqData: Record<string, any> = {
      name: data.name,
      type: data.type,
      images: imagesIds,
    };
    switch (data.type) {
      case "STOCK":
        datareqData["productCategoryId"] = data.productCategoryId;
        datareqData["salesCategoryId"] = data.salesCategoryId;
        datareqData["prices"] = [
          { price: data.price, codeCurrency: data.codeCurrency },
        ];
        break;
      case "COMBO":
      case "VARIATION":
        datareqData["salesCategoryId"] = data.salesCategoryId;
        datareqData["prices"] = [
          { price: data.price, codeCurrency: data.codeCurrency },
        ];
        break;
      case "MENU":
      case "SERVICE":
      case "ADDON":
        datareqData["salesCategoryId"] = data.salesCategoryId;
        datareqData["prices"] = [
          { price: data.price, codeCurrency: data.codeCurrency },
        ];
        datareqData["listProductionAreas"] = data.listProductionAreas;
        break;
      case "RAW":
      case "MANUFACTURED":
      case "WASTE":
        datareqData["productCategoryId"] = data.productCategoryId;
        datareqData["measure"] = data.measure;
        break;
      case "ASSET":
        datareqData["productCategoryId"] = data.productCategoryId;
        break;
      default:
        break;
    }
    return datareqData;
  };

  const onFinish = () => {
    const reqData = setRquestData();
    addProduct(reqData as any)
      .unwrap()
      .then(() => {
        dispatch(resetFormState());
        navigation.navigate("SuccessProdFormScreen");
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.data,
          position: "top",
          topOffset: 9,
        });
      });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        alignItems: "center",
      }}
    >
      <View style={styles.imagesContainer}>
        <UploadImageComponent />
      </View>
      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={onFinish}
          buttonColor={palette.primary}
          textColor={palette.secondary}
          labelStyle={{ fontSize: 15, fontWeight: "600", height: 20 }}
          contentStyle={{ width: "100%" }}
          style={{ width: width / 1.8 }}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Finalizando" : "Finalizar"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    width: width / 1.1,
    borderRadius: 20,
    minHeight: height / 1.6,
    borderWidth: 1,
    borderColor: palette.icons,
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
    padding: 5,
    // margin: 10,
  },
  bigButtonContainer: {
    height: 150,
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: width / 2.5,
    height: width / 2.5,
    borderRadius: 15,
    elevation: 2,
    backgroundColor: "#FFF",
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // borderWidth: 1,
    alignContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: palette.icons,
  },
  actions: {
    // width: "100%",
    flex: 1,
    flexShrink: 1,
    // backgroundColor: "lightblue",
    marginTop: 10,
    marginBottom: 5,
    // paddingHorizontal: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
