import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, IconButton } from "react-native-paper";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

import Layout from "../../../../utils/Layout";
import Card from "../../../atoms/Card";
import { palette } from "../../../../theme/colors";
import {
  formatPrice,
  getMeasureSpanish,
  getOperationIcon,
} from "../../../../utils/utils";
import Tags from "../../../atoms/Tags";
import { useAppSelector } from "../../../../store/hooks";
import { getAreaById } from "../../../../store/slices/areaSlice";
import AvatarComponent from "../../../atoms/AvatarComponent";

interface Props {
  opType: string;
  image: string;
  productName: string;
  oldQuantity?: number;
  quantity: number;
  measure: string;
  toArea?: number;
  price?: number;
  priceType?: string;
  currency?: string;
  onDelete: Function;
  onEdit: Function;
}
export default function WizardSummaryProduct(props: Props) {
  const movIcon = getOperationIcon(props.opType);
  const hasPrice = props?.price && props?.currency ? true : false;
  const area = useAppSelector(getAreaById(props?.toArea!));

  const oldQuantityText = `${props?.oldQuantity || 0} ${getMeasureSpanish(
    props?.measure
  )}`;
  const quantityText = `${props?.quantity} ${getMeasureSpanish(
    props?.measure
  )}`;
  const newQuantityText = props.oldQuantity
    ? `${props?.oldQuantity - props.quantity || 0} ${getMeasureSpanish(
        props?.measure
      )}`
    : "";

  return (
    <Card
      style={[styles.container]}
      disabled={true}
      //   onPress={props.onPress}
    >
      <AvatarComponent size={90} uri={props.image} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          color: palette.secondary,
          width: "100%",
          paddingHorizontal: 5,
          // backgroundColor: "whitesmoke",
        }}
        numberOfLines={1}
        // ellipsizeMode="tail"
      >
        {props.productName}
      </Text>
      {props.opType === "ENTRY" && (
        <>
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
              text={quantityText}
              textColor={palette.green}
            />
          </View>
          {hasPrice && (
            <View style={{ width: "100%" }}>
              <Tags
                containerStyle={{
                  width: "85%",
                  justifyContent: "center",
                  marginBottom: 5,
                }}
                text={props.priceType!}
                textColor={palette.green}
                textStyle={{ textTransform: "capitalize", fontSize: 15 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: palette.secondary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {formatPrice(props?.price, props?.currency)}
              </Text>
            </View>
          )}
        </>
      )}
      {props.opType === "MOVEMENT" && (
        <>
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
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              paddingHorizontal: 2,
              alignItems: "center",
            }}
          >
            <Tags
              startIcon={
                <FontAwesome5
                  name={getOperationIcon(props.opType)}
                  color={palette.blue}
                  size={12}
                  style={{ marginRight: 3 }}
                />
              }
              containerStyle={{ maxWidth: "45%" }}
              // text={"111500"}
              text={props.quantity}
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
              text={area?.name!}
              textColor={palette.blue}
              textStyle={{ fontSize: 11.5, width: "90%" }}
            />
          </View>
        </>
      )}
      {props.opType === "OUT" && (
        <>
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
        </>
      )}
      {props.opType === "ADJUST" && (
        <>
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
              text={quantityText}
              textColor={palette.green}
            />
          </View>
        </>
      )}
      <View
        style={{ width: "85%", flexDirection: "row", justifyContent: "center" }}
      >
        <IconButton
          icon={"pencil"}
          iconColor={palette.secondary}
          containerColor={palette.datesFilter}
          size={18}
          onPress={() => props.onEdit()}
        />
        <IconButton
          icon={() => (
            <FontAwesome5 name="trash" color={palette.secondary} size={14} />
          )}
          size={18}
          containerColor={palette.datesFilter}
          onPress={() => props.onDelete()}
        />
      </View>
      {/* </View> */}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
