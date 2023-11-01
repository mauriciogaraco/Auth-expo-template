import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

interface Props {
  type: string;
  color: string;
  textColor: string;
}

export const CashOperationType = ({ type, color, textColor }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: color,
        // height: 25,
        width: 'auto',
        padding:5,
        paddingHorizontal: 10,
        marginTop: 5,
      }}
    >
      <View>
        <Text style={{ color: textColor }} numberOfLines={1}>
          {type}
        </Text>
      </View>
    </View>
  );
};
