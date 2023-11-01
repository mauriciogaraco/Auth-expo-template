import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import React from "react";
import { colors, palette } from "../../theme/colors";
import { DetailsRow } from "./DetailsRow";
import { IpvProduct } from "../../services/Interfaces";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Card from "../atoms/Card";
import FastImage from "react-native-fast-image";
import Layout from "../../utils/Layout";
import Tags from "../atoms/Tags";
import { getMeasureSpanish } from "../../utils/utils";
import AvatarComponent from "../atoms/AvatarComponent";

const width = Layout.window.width / 2.2;

export default function InventoryReportListItem({
  report,
}: {
  report: IpvProduct;
}) {
  const measure = getMeasureSpanish(report.measure);
  return (
    <Card style={styles.card} disabled={true}>
      <View style={{ height: 80, width: 80 }}>
        {/* <FastImage
          style={styles.image}
          source={{
            uri: report.image,
            priority: FastImage.priority.normal,
          }}
          defaultSource={require("../../../assets/images/default.jpeg")}
          resizeMode={FastImage.resizeMode.cover}
        /> */}
        <AvatarComponent size={80} uri={report.image} />
      </View>
      <Text
        style={styles.textName}
        numberOfLines={1}
        // ellipsizeMode="tail"
      >
        {report.name}
      </Text>
      <Tags
        text={`${report.initial} ${measure}`}
        containerStyle={{ width: "60%", maxWidth: "100%" }}
        textStyle={styles.tagText}
        startIcon={
          <FontAwesome5
            name={"play"}
            size={12}
            color={palette.darkGray}
            style={{ marginRight: 5 }}
          />
        }
      />
      <View style={styles.tagsRow}>
        <Tags
          text={`${report.entry} ${measure}`}
          containerStyle={styles.pairTags}
          textStyle={styles.tagText}
          startIcon={
            <FontAwesome5
              name={"sign-in-alt"}
              size={12}
              color={palette.darkGray}
              style={{ marginRight: 5 }}
            />
          }
        />
        <Tags
          text={`${report.outs} ${measure}`}
          containerStyle={styles.pairTags}
          textStyle={styles.tagText}
          startIcon={
            <FontAwesome5
              name={"sign-out-alt"}
              size={12}
              color={palette.darkGray}
              style={{ marginRight: 5 }}
            />
          }
        />
      </View>
      <View style={styles.tagsRow}>
        <Tags
          text={`${report.movements} ${measure}`}
          containerStyle={styles.pairTags}
          textStyle={styles.tagText}
          startIcon={
            <FontAwesome5
              name={"dolly"}
              size={12}
              color={palette.darkGray}
              style={{ marginRight: 5 }}
            />
          }
        />
        <Tags
          text={`${report.sales} ${measure}`}
          containerStyle={styles.pairTags}
          textStyle={styles.tagText}
          startIcon={
            <FontAwesome5
              name={"cash-register"}
              size={12}
              color={palette.darkGray}
              style={{ marginRight: 5 }}
            />
          }
        />
      </View>

      <Tags
        text={`${report.inStock} ${measure}`}
        containerStyle={{ width: "60%", maxWidth: "100%" }}
        textStyle={styles.tagText}
        textColor={palette.green}
        startIcon={
          <FontAwesome5
            name={"boxes"}
            size={12}
            color={palette.green}
            style={{ marginRight: 5 }}
          />
        }
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    height: 255,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    margin: 5,
    marginVertical: 8,
  },
  cardHeader: {
    width: "100%",
    height: 35,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    // marginBottom: 5,
    alignItems: "center",
    alignContent: "space-between",
    justifyContent: "center",
    backgroundColor: colors.lightOrange,
  },
  cardHeadertext: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
  tagText: { fontSize: 11.5 },
  tagsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  pairTags: { width: "49%", maxWidth: "100%" },
  image: {
    height: "100%",
    backgroundColor: palette.primary,
    flex: 1,
    borderRadius: 100,
    width: "100%",
    alignSelf: "center",
  },
  textName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: palette.secondary,
    width: "100%",
    // backgroundColor: "whitesmoke",
  },
});
