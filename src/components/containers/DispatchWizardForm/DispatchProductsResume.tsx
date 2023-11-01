import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Button, IconButton } from "react-native-paper";
import { palette } from "../../../theme/colors";
import { FlashList } from "@shopify/flash-list";
import {
  FormProduct,
  removeProduct,
  updateData,
} from "../../../store/slices/dispatchOperationSlice";
import { getMeasureSpanish } from "../../../utils/utils";
import Card from "../../atoms/Card";
import AvatarComponent from "../../atoms/AvatarComponent";
import Tags from "../../atoms/Tags";
import Layout from "../../../utils/Layout";

export default function DispatchProductsResume({
  toggle,
  next,
}: {
  toggle: any;
  next: any;
}) {
  const { products: formProducts, toAreaName } = useAppSelector(
    (state) => state.dispatchForm
  );
  const dispatch = useAppDispatch();

  const editProduct = (item: any) => {
    dispatch(
      updateData({
        step: 3,
        currentProduct: item,
      })
    );
  };
  const unselectProduct = (id: number) => {
    dispatch(removeProduct(id));
  };

  const renderSelectedProducts = ({
    item,
    index,
  }: {
    item: FormProduct;
    index: number;
  }) => {
    const oldQuantityText = `${item?.oldQuantity || 0} ${getMeasureSpanish(
      item?.measure
    )}`;
    const quantityText = `${item?.quantity} ${getMeasureSpanish(
      item?.measure
    )}`;
    const newQuantityText = item?.oldQuantity
      ? `${item?.oldQuantity - item?.quantity! || 0} ${getMeasureSpanish(
          item?.measure
        )}`
      : "";
    return (
      <Card
        style={[styles.productContainer]}
        disabled={true}
        //   onPress={props.onPress}
      >
        <AvatarComponent size={90} uri={item.image} />
        <Text
          style={styles.productName}
          numberOfLines={1}
          // ellipsizeMode="tail"
        >
          {item.productName}
        </Text>

        <View style={{ width: "85%" }}>
          <Tags
            startIcon={
              <FontAwesome5
                name="boxes"
                color={palette.icons}
                size={18}
                style={{ marginRight: 5 }}
              />
            }
            containerStyle={{ width: "100%" }}
            text={oldQuantityText}
            textColor={palette.icons}
            textStyle={{ textDecorationLine: "line-through" }}
          />
        </View>
        <View style={{ width: "85%" }}>
          <Tags
            startIcon={
              <FontAwesome5
                name="boxes"
                color={palette.green}
                size={18}
                style={{ marginRight: 5 }}
              />
            }
            containerStyle={{ width: "100%" }}
            text={newQuantityText}
            textColor={palette.green}
          />
        </View>
        <View style={styles.fromToTag}>
          <Tags
            startIcon={
              <FontAwesome5
                name={"layer-group"}
                color={palette.blue}
                size={12}
                style={{ marginRight: 3 }}
              />
            }
            containerStyle={{ maxWidth: "45%" }}
            // text={"111500"}
            text={item.quantity!}
            textColor={palette.blue}
            textStyle={{ fontSize: 11.5, width: "90%" }}
          />
          <Entypo name="chevron-thin-right" size={15} color={palette.blue} />
          <Tags
            startIcon={
              <FontAwesome5
                name="layer-group"
                color={palette.blue}
                size={10}
                style={{ marginRight: 3 }}
              />
            }
            containerStyle={{ width: "45%" }}
            text={toAreaName}
            textColor={palette.blue}
            textStyle={{ fontSize: 11.5, width: "90%" }}
          />
        </View>

        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <IconButton
            icon={"pencil"}
            iconColor={palette.secondary}
            containerColor={palette.datesFilter}
            size={18}
            onPress={() => editProduct(item)}
          />
          <IconButton
            icon={() => (
              <FontAwesome5 name="trash" color={palette.secondary} size={14} />
            )}
            size={18}
            containerColor={palette.datesFilter}
            onPress={() => unselectProduct(item.id!)}
          />
        </View>
        {/* </View> */}
      </Card>
    );
  };

  return (
    <View style={styles.content}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Button
          icon={() => <AntDesign name="plus" size={24} color={palette.white} />}
          mode="contained"
          onPress={toggle}
          buttonColor={palette.primary}
          labelStyle={styles.buttonLabel}
        >
          Añadir
        </Button>
        <Button
          icon={() => (
            <AntDesign name="arrowright" size={24} color={palette.white} />
          )}
          mode="contained"
          onPress={next}
          contentStyle={{ flexDirection: "row-reverse" }}
          buttonColor={palette.primary}
          labelStyle={styles.buttonLabel}
        >
          Continuar
        </Button>
      </View>
      <FlashList
        data={formProducts}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderSelectedProducts}
        numColumns={2}
        contentContainerStyle={{ padding: 2 }}
        estimatedItemSize={300}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: palette.white,
  },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
  productContainer: {
    width: Layout.window.width / 2.3,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    height: 300,
    paddingVertical: 10,
    // paddingHorizontal: 5,
    borderRadius: 12,
    margin: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: palette.secondary,
    width: "100%",
    paddingHorizontal: 5,
    // backgroundColor: "whitesmoke",
  },
  fromToTag: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 2,
    alignItems: "center",
  },
});
