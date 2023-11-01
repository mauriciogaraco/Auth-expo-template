import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../atoms/Card";
import Layout from "../../utils/Layout";
import { DispatchStatus } from "../../services/Interfaces";
import { palette } from "../../theme/colors";
import Tags from "../atoms/Tags";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import {
  formatDate,
  getColorStatusDispatch,
  getDispatchStatusIcon,
  translateDispatchStatus,
} from "../../utils/utils";

const width = Layout.window.width / 2.2;
const dateFormat = "D [de] MMM hh:mm A";

interface Props {
  date: string;
  status: DispatchStatus;
  areaFrom: string;
  areaTo: string;
  onPress: Function;
}

export default function DispatchComponent({
  date,
  status,
  areaFrom,
  areaTo,
  onPress,
}: Props) {
  const createdDate = formatDate(date, dateFormat) || `No especificada`;
  const statusColor = getColorStatusDispatch(status);
  return (
    <Card style={styles.card} onPress={onPress}>
      <Text style={styles.dateText} numberOfLines={1}>
        {createdDate}
      </Text>
      <View style={{ width: "80%" }}>
        <Tags
          textColor={statusColor}
          text={translateDispatchStatus(status)!}
          containerStyle={{ width: "100%" }}
          startIcon={
            <FontAwesome5
              color={statusColor}
              name={getDispatchStatusIcon(status)}
              size={15}
              style={{ marginRight: 5 }}
            />
          }
        />
      </View>
      <View style={styles.fromToTags}>
        <Tags
          startIcon={
            <FontAwesome5
              name={"layer-group"}
              color={palette.blue}
              size={10}
              style={{ marginRight: 3 }}
            />
          }
          containerStyle={{ maxWidth: "45%" }}
          text={areaFrom}
          textColor={palette.blue}
          textStyle={{ fontSize: 10, width: "90%" }}
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
          text={areaTo}
          textColor={palette.blue}
          textStyle={{ fontSize: 10, width: "90%" }}
        />
      </View>
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
    fontSize: 15,
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
