import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, palette } from "../../theme/colors";
import { SelledProductReport } from "../../services/Interfaces";
import { DetailsRow } from "./DetailsRow";
import { formatPrice } from "../../utils/utils";
import Card from "../atoms/Card";
import { Divider } from "react-native-paper";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentBusiness } from "../../store/slices/businessSlice";

interface Props {
  report: SelledProductReport[];
  currencies: Array<string>;
}

export default function SelledProductsDetails({ report, currencies }: Props) {
  const business = useAppSelector(selectCurrentBusiness);

  const subtotal = currencies.map((curr) => {
    const total = report.reduce((total, value) => {
      const x =
        value.totalSales.find((sale) => sale.codeCurrency === curr)?.amount ||
        0;
      return total + x;
    }, 0);
    return { amount: total, code: curr };
  });

  return (
    <Card style={styles.mainCardView} disabled={true}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeadertext}>Cant, Nombre</Text>
        <Text style={styles.cardHeadertext}>Total de Venta</Text>
      </View>
      <Divider bold />
      <View style={{}}>
        {report?.map((item, index) => (
          <DetailsRow
            key={index}
            title={`(x${item.quantitySales}) ${item.name}`}
            text={
              item.totalSales
                .map((item) => formatPrice(item.amount, item.codeCurrency))
                .join(`\n`) || formatPrice(0, business?.mainCurrency)
            }
            titleStyle={{ fontSize: 14 }}
          />
        ))}
      </View>
      <Divider bold />
      <DetailsRow
        title={`Subtotal`}
        text={
          subtotal
            .map((item) => formatPrice(item.amount, item.code))
            .join(`\n`) || formatPrice(0, business?.mainCurrency)
        }
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    height: "auto",
    // height: "60%",
    backgroundColor: palette.white,
    borderRadius: 10,
    flexDirection: "column",
    padding: 5,
    margin: 5,
  },
  cardHeader: {
    width: "100%",
    // height: 30,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 5,
  },
  cardHeadertext: {
    color: palette.secondary,
    fontWeight: "bold",
    fontSize: 15,
  },
});
