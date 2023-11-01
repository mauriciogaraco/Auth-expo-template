import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import { Avatar, IconButton } from "react-native-paper";

import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { MostSelledProduct } from "../../services/Interfaces";
import { colors, palette } from "../../theme/colors";

import "intl";
import "intl/locale-data/jsonp/es";
import { compactNumber, formatPrice } from "../../utils/utils";
import Tags from "../atoms/Tags";
import Card from "../atoms/Card";
import PercentageBar from "../PercentageBar";
import Layout from "../../utils/Layout";
import AvatarComponent from "../atoms/AvatarComponent";

interface MostSelledProductParams {
  mostSelledProduct: MostSelledProduct;
}

const width = Layout.window.width;
const cardWidth = width / 1.1;
const cardStatsWidth = cardWidth * 0.65;
// const cardStatsWidth = width / 1.8;
const barWidth = cardStatsWidth * 0.7;
const statsWidth = cardStatsWidth * 0.4;

export const MostSelledProductsRow = ({
  mostSelledProduct,
}: MostSelledProductParams) => {
  const color: string =
    mostSelledProduct.amountRemain > 3 ? colors.green : colors.red;

  const productQuantity = () => {
    const types = ["MENU", "ADDON", "SERVICE"];

    return types.includes(mostSelledProduct.type) &&
      mostSelledProduct.stockLimit === false
      ? "Ilimitado"
      : compactNumber(mostSelledProduct.amountRemain);
  };

  const price = mostSelledProduct.prices[0];

  const priceString = formatPrice(price.price, price.codeCurrency);

  const { averageCost, totalSale } = mostSelledProduct;

  const totalSales = price.price * totalSale;
  const cost = averageCost * totalSale;
  const progressCost = cost / totalSales;
  const earning = totalSales - cost;
  const progressEarning = earning / totalSales;

  // console.log("totalSales", totalSales);
  // console.log("cost", cost);
  // console.log("earning", earning);

  return (
    <Card style={styles.cardContainer}>
      <View
        style={{
          width: cardStatsWidth,
        }}
      >
        {/* price + quantity row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{priceString}</Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                styles.iconsContainer,
                {
                  marginRight: 5,
                },
              ]}
            >
              <FontAwesome5
                name="cash-register"
                size={15}
                color={palette.icons}
                style={styles.icons}
              />
              <Text style={styles.resumeText}>
                {compactNumber(mostSelledProduct.totalSale)}
              </Text>
            </View>
            <View style={styles.iconsContainer}>
              {/* {productQuantity()} */}
              <FontAwesome5
                name="boxes"
                size={15}
                color={palette.icons}
                style={styles.icons}
              />
              <Text style={styles.resumeText}>
                {productQuantity()}
                {/* {compactNumber(mostSelledProduct.amountRemain)} */}
              </Text>
            </View>
          </View>
        </View>

        {/* product sales resume */}
        <View style={styles.resume}>
          <View style={[styles.percentageRow]}>
            {/* Sales Percentage Resume */}
            <PercentageBar
              showTitle={false}
              progress={1}
              color={palette.blue}
              showProgress={false}
              containerStyle={styles.barContainer}
            />
            <Text style={styles.totalSalesStats}>
              {compactNumber(totalSales)}
            </Text>
          </View>
          <View style={[styles.percentageRow]}>
            {/* Sales Percentage Resume */}
            <PercentageBar
              title="Costos"
              progress={progressCost}
              color={palette.red}
              containerStyle={styles.barContainer}
            />
            <Text style={styles.stats}>{compactNumber(cost)}</Text>
          </View>
          <View style={[styles.percentageRow]}>
            {/* Sales Percentage Resume */}
            <PercentageBar
              title="Ganancias"
              progress={progressEarning}
              color={palette.green}
              containerStyle={styles.barContainer}
            />
            <Text style={styles.stats}>{compactNumber(earning)}</Text>
          </View>
        </View>
      </View>
      {/* product image */}
      <View style={styles.imageColumn}>
        <AvatarComponent
          uri={mostSelledProduct.images[0]?.thumbnail}
          size={70}
        />
        {/* DONE: FIX IMAGE TEXT */}
        <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
          {mostSelledProduct.name}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 10,
  },
  cardBody: {
    flexShrink: 1,
    marginLeft: "2%",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    // backgroundColor: 'red',
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  percentageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignContent: "flex-end",
    width: cardStatsWidth,
    justifyContent: "space-between",
    paddingRight: 3,
    // backgroundColor: "pink",
    // padding: 3,
    // paddingHorizontal: 5,
  },
  barContainer: { width: barWidth },
  stats: { fontWeight: "500", fontSize: 14 },
  totalSalesStats: {
    fontWeight: "500",
    fontSize: 14,
    textAlign: "right",
    textAlignVertical: "bottom",
  },
  resume: {
    flexGrow: 1,
    // backgroundColor: "violet",
    alignContent: "space-between",
    justifyContent: "space-evenly",
  },
  resumeText: {
    fontSize: 14,
    color: palette.icons,
    fontWeight: "400",
  },
  icons: { marginLeft: 2, marginRight: 5 },
  iconsContainer: { flexDirection: "row", alignItems: "center" },
  priceRow: {
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "space-between",
    // backgroundColor: "lightgreen",
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: palette.secondary,
  },

  imageColumn: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexGrow: 1,
    // backgroundColor: "lightblue",
    maxWidth: 100,
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    height: 35,
  },
});
