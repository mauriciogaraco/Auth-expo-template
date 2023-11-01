import React from "react";

import { View, Text, StyleSheet, Platform } from "react-native";

import { CashRegisterOperation } from "../../services/Interfaces";
import { Avatar, IconButton } from "react-native-paper";

import "intl";
import "intl/locale-data/jsonp/es";

import { palette } from "../../theme/colors";
import {
  formatPrice,
  getTextColorCashOperation,
  getTypeCashOperation,
} from "../../utils/utils";
import Tags from "../atoms/Tags";
import Card from "../atoms/Card";
import Layout from "../../utils/Layout";
import { UserIcon } from "../../theme/icons";
import TimeChip from "./TimeChip";
import FastImage from "react-native-fast-image";
import AvatarComponent from "../atoms/AvatarComponent";

interface OperationProps {
  operation: CashRegisterOperation;
}

const width = Layout.window.width;

export const OperationComponent = ({
  operation,
}: //navigateToOperationDetails,
OperationProps) => {
  return (
    <Card disabled={true} style={styles.mainCardView}>
      <AvatarComponent
        size={70}
        uri={operation?.madeBy?.avatar?.thumbnail}
        userPlaceholder={true}
      />
      <Text style={{ textTransform: "capitalize", marginVertical: 5 }}>
        {operation?.madeBy?.displayName}
      </Text>
      <Tags
        textColor={getTextColorCashOperation(operation.operation)}
        text={getTypeCashOperation(operation.operation)}
        containerStyle={{ width: "75%", marginBottom: 5 }}
      />
      <TimeChip time={operation.createdAt} />
      {/* <Tags
        textColor={palette.darkGray}
        text={createdAtTime}
        containerStyle={{ width: "75%" }}
        startIcon={
          <MaterialCommunityIcons
            color={palette.darkGray}
            name={"clock"}
            size={18}
            style={{ marginRight: 5 }}
          />
        }
      /> */}
      <View style={{ height: 40 }}>
        <Text
          numberOfLines={2}
          style={{
            padding: 5,
            fontSize: 13,
            fontWeight: "300",
            color: palette.darkGray,
          }}
        >
          {operation.observations.trim() || "No hay observaciones"}
        </Text>
      </View>
      <View>
        <Text style={{ color: getTextColorCashOperation(operation.operation) }}>
          {formatPrice(operation.amount, operation.codeCurrency)}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainCardView: {
    width: width / 2.3,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    height: 265,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    margin: 8,
    // marginHorizontal: 10,
  },
  contentView: {
    alignItems: "flex-start",
    flexShrink: 1,
    marginLeft: "4%",
    flexGrow: 1,
    flexDirection: "column",
  },
});
