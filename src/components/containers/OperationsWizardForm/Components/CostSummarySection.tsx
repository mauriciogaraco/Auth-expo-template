import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { palette } from "../../../../theme/colors";
import { formatPrice } from "../../../../utils/utils";
import { useAppSelector } from "../../../../store/hooks";
import { selectCurrentBusiness } from "../../../../store/slices/businessSlice";

interface Props {
  amount: number;
  prevCost: number;
  newCost: number;
  newCurrency: string;
  priceType: string;
}

export default function CostSummarySection({
  amount,
  prevCost,
  newCost,
  newCurrency,
  priceType,
}: Props) {
  const business = useAppSelector(selectCurrentBusiness);
  const businessCurrency = business?.mainCurrency;
  const exchangeRate =
    business?.availableCurrencies.find((item) => item.code === newCurrency)
      ?.exchangeRate || 1;
  let productCost = newCost;

  if (priceType === "total") {
    productCost = newCost / amount;
  }

  if (businessCurrency !== newCurrency) {
    productCost = productCost * exchangeRate;
  }

  const oldTotal = amount * prevCost;
  const newTotal = amount * productCost;
  const diff = oldTotal - newTotal;

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 10,
      }}
    >
      <View style={styles.summaryRows}>
        <Text style={styles.summaryText}>(U){"   "}Costo</Text>
        <Text style={[styles.summaryText, styles.summaryTextRight]}>Total</Text>
      </View>
      <View style={styles.summaryRows}>
        <Text style={styles.summaryText}>
          {amount} x {formatPrice(prevCost, businessCurrency)}
        </Text>
        <Text style={[styles.summaryText, styles.summaryTextRight]}>
          {formatPrice(oldTotal, businessCurrency)}
        </Text>
      </View>
      <View style={styles.summaryRows}>
        <Text style={[styles.summaryText, { color: palette.primary }]}>
          {amount} x {formatPrice(productCost, businessCurrency)}
        </Text>
        <Text
          style={[
            styles.summaryText,
            styles.summaryTextRight,
            { color: palette.primary },
          ]}
        >
          {formatPrice(newTotal, businessCurrency)}
        </Text>
      </View>
      <View style={{ flexDirection: "column", alignSelf: "flex-end" }}>
        <Text style={[styles.summaryText, styles.summaryTextRight]}>
          Diferencia
        </Text>
        <Text
          style={[
            styles.summaryText,
            styles.summaryTextRight,
            { color: diff >= 0 ? palette.green : palette.red },
          ]}
        >
          {formatPrice(diff, businessCurrency)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.secondary,
  },
  summaryTextRight: {
    textAlign: "right",
  },
});
