import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import Card from "../../atoms/Card";
import { palette } from "../../../theme/colors";
import Layout from "../../../utils/Layout";
import { Avatar } from "react-native-paper";
import { BankAccount } from "../../../services/Interfaces";
import { mask } from "react-native-mask-text";
import AvatarComponent from "../../atoms/AvatarComponent";

interface Props {
  // account: BankAccount;
  onPress: Function;
  accountNumber: string;
  isBlocked: boolean;
  logo?: string;
  ownerName: string;
  accountName: string;
}

const width = Layout.window.width;
const cardWidth = width / 1.2;
const cardHeight = width / 2;

export default function BankAccountCard({
  accountNumber,
  isBlocked,
  logo,
  ownerName,
  onPress,
  accountName,
}: Props) {
  const maskedCardNumber = mask(accountNumber, "9999 9999 9999");
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.status}>
            <MaterialCommunityIcons
              name={isBlocked ? "lock" : "lock-open"}
              size={24}
              color={palette.white}
            />
            <FontAwesome5 name="credit-card" size={35} color={palette.white} />
          </View>
          <View>
            <AvatarComponent uri={logo} size={45} />
          </View>
        </View>
        <View style={styles.middle}>
          <Text style={styles.number}>{maskedCardNumber}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.details}>
            <Text style={styles.detailsText}>{accountName}</Text>
            <Text style={styles.detailsText}>{ownerName}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.accountCard,
    width: cardWidth,
    height: cardHeight,
    padding: 10,
    borderRadius: 18,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    paddingHorizontal: 5,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  status: {
    paddingVertical: 5,
  },
  middle: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 3,
    height: 50,
  },
  number: {
    fontSize: 25,
    color: palette.white,
    fontWeight: "500",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  details: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  detailsText: {
    fontSize: 13,
    color: palette.white,
    fontWeight: "500",
  },
});
