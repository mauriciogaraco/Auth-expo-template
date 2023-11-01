import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "../../utils/Layout";
import {
  formatDate,
  getColorMovementsOperationType,
  getMeasureSpanish,
  getOperationIcon,
  getOperationSpanish,
} from "../../utils/utils";
import Card from "../atoms/Card";
import Tags from "../atoms/Tags";
import { FontAwesome5 } from "@expo/vector-icons";
import { palette } from "../../theme/colors";

const width = Layout.window.width / 2.2;
const dateFormat = "D [de] MMM hh:mm A";

interface Props {
  date: string;
  type: string;
  amount: number;
  name: string;
  onPress: Function;
  measure: string;
}

export default function StockOperationComponent({
  date,
  type,
  amount,
  name,
  measure,
  onPress,
}: Props) {
  const createdDate = formatDate(date, dateFormat) || `No especificada`;
  const typeColor = getColorMovementsOperationType(type);
  return (
    <Card style={styles.card} onPress={onPress}>
      <Text style={styles.dateText} numberOfLines={1}>
        {name}
      </Text>
      <View style={{ width: "80%" }}>
        <Tags
          textColor={typeColor}
          text={getOperationSpanish(type)}
          containerStyle={{ width: "100%" }}
          startIcon={
            <FontAwesome5
              color={typeColor}
              name={getOperationIcon(type)}
              size={15}
              style={{ marginRight: 5 }}
            />
          }
        />
      </View>
      <View style={{ width: "80%" }}>
        <Tags
          startIcon={
            <FontAwesome5
              name={"boxes"}
              color={palette.blue}
              size={15}
              style={{ marginRight: 7 }}
            />
          }
          containerStyle={{ width: "100%" }}
          text={`${amount} ${getMeasureSpanish(measure)}`}
          textColor={palette.blue}
        />
      </View>
      <Text style={styles.dateText} numberOfLines={1}>
        {createdDate}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width,
    height: width,
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
    paddingTop: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: palette.secondary,
    width: "100%",
    // backgroundColor: "whitesmoke",
  },
  fromToTags: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 2,
    alignItems: "center",
  },
});
