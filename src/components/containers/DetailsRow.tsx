import React from "react";

import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Underline } from "../atoms/Underline";
import { colors, palette } from "../../theme/colors";

interface DetailsRowProps {
  title: string;
  text: string | number;
  backgroundColor?: string;
  textStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const DetailsRow = ({
  title,
  text,
  backgroundColor = "white",
  textStyle,
  containerStyle,
  titleStyle,
}: DetailsRowProps) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 5,
          paddingHorizontal: 5,
          backgroundColor: backgroundColor,
        },
        containerStyle,
      ]}
    >
      <Text
        style={[
          {
            fontSize: 15,
            fontWeight: "600",
            width: "48%",
            color: palette.secondary,
          },
          titleStyle,
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>
      <Text
        style={[
          {
            fontSize: 15,
            fontWeight: "600",
            color: palette.secondary,
            textAlign: "right",
            width: "50%",
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};
