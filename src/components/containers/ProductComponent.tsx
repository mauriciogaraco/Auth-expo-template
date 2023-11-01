import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import { Product } from "../../services/Interfaces";
import { Avatar } from "react-native-paper";

import { FontAwesome5 } from "@expo/vector-icons";
import "intl";
import "intl/locale-data/jsonp/es";

import { colors, palette } from "../../theme/colors";
import {
  formatPrice,
  getMeasureSpanish,
  getTypeProductColor,
  getTypeProductIcon,
  getTypeProductSpanish,
  getTypeProductTextColor,
  isReadyForSale,
} from "../../utils/utils";
import { globals } from "../../theme/styles/global";
import { ProductType } from "./ProductType";
import ProductQuantiyComponent from "../atoms/ProductQuantiyComponent";
import Card from "../atoms/Card";
import Layout from "../../utils/Layout";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import AvatarComponent from "../atoms/AvatarComponent";

interface Products {
  // product: Product;
  onPress: Function;
  cardStyle?: StyleProp<ViewStyle>;
  stockLimit: boolean;
  quantity: number;
  measure: string;
  type: string;
  price: number | undefined;
  codeCurrency: string | undefined;
  thumbnail: string;
  name: string;
  hasPrice: boolean;
}

//DONE: fix product quantity
/* 
case: productType in [MENU, ADDON, SERVICE]
  if stockLimit ===  true
  then CANT = total quantity
  else CANT = 'Unlimited' | 'Ilimitado' color: dark blue

case: productType in [STOCK, RAW, MANUFACTURED, PROCESSED]
  CANT = totalQuantity
*/

//TODO: difference between product type and stock type

// DONE: CHANGE PROPS TO RECEIVE THE SPECIFIC DATA IT NEEDS

const width = Layout.window.width / 2.4;

export default function ProductComponent({
  onPress,
  cardStyle,
  price,
  codeCurrency,
  name,
  thumbnail,
  type,
  hasPrice,
  ...rest
}: Products) {
  return (
    <Card style={[styles.container, cardStyle]} onPress={onPress}>
      <AvatarComponent size={90} uri={thumbnail} />
      <Text
        style={styles.prodName}
        numberOfLines={1}
        // ellipsizeMode="tail"
      >
        {name}
      </Text>
      <View style={{ width: "85%" }}>
        <ProductType
          type={getTypeProductSpanish(type)}
          color={getTypeProductColor(type)}
          textColor={getTypeProductTextColor(type)}
          icon={getTypeProductIcon(type)}
          readyForSale={isReadyForSale(type)}
        />
      </View>
      <View style={{ width: "85%" }}>
        <ProductQuantiyComponent type={type} {...rest} />
      </View>

      <Text style={styles.price}>
        {hasPrice && formatPrice(price, codeCurrency)}
      </Text>

      {/* </View> */}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: width,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    height: 255,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
  },
  cardBody: {
    flexShrink: 1,
    marginLeft: 10,
    // marginTop: '3%',
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingStart: 5,
    // backgroundColor: 'red',
  },
  prodName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: palette.secondary,
    width: "100%",
    // backgroundColor: "whitesmoke",
  },
  price: {
    fontSize: 15,
    color: palette.secondary,
    fontWeight: "bold",
  },
});
