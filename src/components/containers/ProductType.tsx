import React from "react";

import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Tags from "../atoms/Tags";

interface Props {
  type: string;
  color: string;
  textColor: string;
  icon: string;
  readyForSale: boolean;
}

export const ProductType = ({
  type,
  color,
  textColor,
  icon,
  readyForSale,
}: Props) => {
  return (
    <Tags
      textColor={textColor}
      text={type}
      containerStyle={{ width: "100%" }}
      startIcon={
        <>
          {readyForSale && (
            <Text style={{ marginRight: 6 }}>
              <FontAwesome5
                color={textColor}
                name="money-bill-wave"
                size={15}
              />
            </Text>
          )}
          <Text style={{ marginRight: 5 }}>
            <FontAwesome5 color={textColor} name={icon} size={15} />
          </Text>
        </>
      }
    />
  );
};
