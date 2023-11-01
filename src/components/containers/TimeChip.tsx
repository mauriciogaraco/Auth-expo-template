import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Tags from "../atoms/Tags";
import { palette } from "../../theme/colors";
import { formatDate } from "../../utils/utils";

interface Props {
  color?: string;
  time: string | number | Date;
}
export default function TimeChip({ color, time }: Props) {
  const textTime = formatDate(time, "hh:mm A");
  return (
    <Tags
      textColor={color}
      text={textTime}
      containerStyle={{ width: "75%" }}
      startIcon={
        <MaterialCommunityIcons
          color={color || palette.darkGray}
          name={"clock"}
          size={18}
          style={{ marginRight: 5 }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({});
