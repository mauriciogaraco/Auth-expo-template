import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

import Layout from "../../../../utils/Layout";
import Card from "../../../atoms/Card";
import { palette } from "../../../../theme/colors";
import Tags from "../../../atoms/Tags";
import { formatPrice, getMeasureSpanish } from "../../../../utils/utils";
import { useAppSelector } from "../../../../store/hooks";
import { getAreaById } from "../../../../store/slices/areaSlice";
import AvatarComponent from "../../../atoms/AvatarComponent";

interface Props {
  productName: string;
  image: string;
  price?: number;
  priceCurrency?: string;
  oldQuantity?: number;
  newQuantity?: number;
  measure?: string;
  toArea?: number;
}

// TODO: OLD QUANTITY MUST BE LINED THROUGH AFTER A NEW QUANTITY IS ENTERED

const width = Layout.window.width / 2.4;

export default function WizardProductComponent(props: Props) {
  const hasPrice =
    typeof props?.price === "number" && props?.priceCurrency ? true : false;
  const hasQuantity = typeof props?.oldQuantity === "number" ? true : false;

  const newQuantityText = `${props?.newQuantity || 0} ${getMeasureSpanish(
    props?.measure
  )}`;
  const oldQuantityText = `${props?.oldQuantity || 0} ${getMeasureSpanish(
    props?.measure
  )}`;

  const area = useAppSelector(getAreaById(props?.toArea!));

  return (
    <Card style={styles.container} disabled={true} onPress={() => {}}>
      <AvatarComponent size={90} uri={props.image} />
      <Text style={styles.productName} numberOfLines={1}>
        {props.productName}
      </Text>
      {hasQuantity && (
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
              textStyle={{
                textDecorationLine:
                  parseFloat(newQuantityText) > 0 ? "line-through" : "none",
              }}
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
      {area && (
        <View style={{ width: "85%" }}>
          <Tags
            startIcon={
              <FontAwesome5
                name="layer-group"
                color={palette.blue}
                size={11}
                style={{ marginRight: 5 }}
              />
            }
            containerStyle={{ width: "100%" }}
            text={area?.name!}
            textColor={palette.blue}
            textStyle={{ fontSize: 11 }}
          />
        </View>
      )}
      {hasPrice && (
        <Text style={styles.price}>
          {formatPrice(props?.price, props?.priceCurrency)}
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    height: 255,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    marginVertical: 15,
  },
  cardBody: {
    flexShrink: 1,
    marginLeft: 10,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingStart: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: palette.secondary,
    width: "100%",
  },
  price: {
    fontSize: 15,
    color: palette.secondary,
    fontWeight: "bold",
  },
});
