import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

interface Props {
  type: string;
  color: string;
  textColor: string;
}

export const OrderType = ({ type, color, textColor }: Props) => {
  return (
    <View
      style={{
        // flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        // alignSelf: "flex-start",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: color,
        height: 25,
        width: 'auto',
        // marginTop: 5,
        paddingHorizontal: 10,
      }}
    >
      <View>
        <Text style={{ color: textColor }} >
          {type}
        </Text>
      </View>
    </View>
  );
};
