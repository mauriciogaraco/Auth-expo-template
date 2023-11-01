import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StockVariationInterface } from "../../services/Interfaces";

interface Props {
  variations: Array<StockVariationInterface>;
}

interface FilterState {
  [key: string]: string;
}

export default function ProductVariationsComponent({ variations }: Props) {
  return (
    <View>
      <Text>ProductVariationsComponent</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
