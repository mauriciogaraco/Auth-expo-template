import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useAppSelector } from "../../../store/hooks";
import { selectCurrentBusiness } from "../../../store/slices/businessSlice";
import { GroupSalesInterface } from "../../../services/Interfaces";
import GroupSalesFilterList from "./GroupSalesFilterList";
import GroupSalesStatsCard from "./GroupSalesStatsCard";
import GroupSalesPieChart from "./GroupSalesPieChart";
import FilterListItem from "../../atoms/FilterListItem";
import { Surface } from "react-native-paper";
import { palette } from "../../../theme/colors";
import StatsProgressBar from "../../atoms/StatsProgressBar";
import { formatPrice } from "../../../utils/utils";
import GroupBusinessDataSkeleton from "../../atoms/skeletons/GroupBusinessDataSkeleton";
import GroupBusinessDataPlaceholder from "../../atoms/placeholders/GroupBusinessDataPlaceholder";
import Layout from "../../../utils/Layout";
import ChartsPlaceholder from "../../atoms/placeholders/ChartsPlaceholder";

interface Props {
  fetching: boolean;
  data: GroupSalesInterface[];
  datesRange: string;
}

// TODO: ASK ALEJANDRO FOR NEW COLORS
const GRAPH_COLORS: { tw: string; hx: string }[] = [
  { tw: "sky-500", hx: "#0ea5e9" },
  { tw: "red-600", hx: "#dc2626" },
  { tw: "orange-600", hx: "#ea580c" },
  { tw: "blue-400", hx: "#60a5fa" },
  { tw: "green-500", hx: "#22c55e" },
  { tw: "indigo-600", hx: "#4f46e5" },
  { tw: "purple-400", hx: "#c084fc" },
  { tw: "yellow-300", hx: "#fde047" },
  { tw: "yellow-500", hx: "#ca8a04" },
  { tw: "red-200", hx: "#fecaca" },
  { tw: "orange-300", hx: "#fdba74" },
  { tw: "blue-600", hx: "#2563eb" },
  { tw: "green-300", hx: "#86efac" },
  { tw: "indigo-300", hx: "#a5b4fc" },
  { tw: "purple-800", hx: "#6b21a8" },
];

const width = Layout.window.width;

export default function GroupSalesComponent({
  fetching,
  data,
  datesRange,
}: Props) {
  const [activeBusiness, setActiveBusiness] = useState<number[]>([-1]);
  const business = useAppSelector(selectCurrentBusiness);
  const ref = useRef<FlatList>(null);
  const refFilter = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    ref.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.5,
    });
  };
  const scrollToIndexFilter = (index: number) => {
    refFilter.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  let pieData: any[] = [];
  let barData: any[] = [];
  let businessList: any[] = [];

  // data.length !== 0 &&
  //   data.map((item, index) => {
  //     let pickedColor = index;
  //     const ratio = Math.floor(index / GRAPH_COLORS.length);
  //     if (ratio > 0) {
  //       pickedColor = index - Math.round(ratio * GRAPH_COLORS.length);
  //     }

  //     if (
  //       item.grossProfit !== 0 ||
  //       item.totalCost !== 0 ||
  //       item.totalSales !== 0
  //     ) {
  //       businessList.push({
  //         idx: index,
  //         name: item.name,
  //         color: GRAPH_COLORS[pickedColor].hx,
  //       });
  //       if (activeBusiness.includes(index) || activeBusiness[0] === -1) {
  //         pieData.push({
  //           x: item.name,
  //           y: item.totalSales,
  //           fill: GRAPH_COLORS[pickedColor].hx,
  //         });

  //         barData.push({
  //           idx: index,
  //           title: item.name,
  //           gross: item.grossProfit,
  //           cost: item.totalCost,
  //           sales: item.totalSales,
  //           fill: GRAPH_COLORS[pickedColor].hx,
  //           currency: item.codeCurrency,
  //         });
  //       }
  //     }
  //   });

  if (data.length !== 0) {
    const length = data.length;
    for (let index = 0; index < length; index++) {
      const item = data[index];
      let pickedColor = index;
      const ratio = Math.floor(index / GRAPH_COLORS.length);
      if (ratio > 0) {
        pickedColor = index - Math.round(ratio * GRAPH_COLORS.length);
      }

      if (
        item.grossProfit !== 0 ||
        item.totalCost !== 0 ||
        item.totalSales !== 0
      ) {
        businessList.push({
          idx: index,
          name: item.name,
          color: GRAPH_COLORS[pickedColor].hx,
        });
        if (activeBusiness.includes(index) || activeBusiness[0] === -1) {
          pieData.push({
            x: item.name,
            y: item.totalSales,
            fill: GRAPH_COLORS[pickedColor].hx,
          });

          barData.push({
            idx: index,
            title: item.name,
            gross: item.grossProfit,
            cost: item.totalCost,
            sales: item.totalSales,
            fill: GRAPH_COLORS[pickedColor].hx,
            currency: item.codeCurrency,
          });
        }
      }
    }
  }

  const selectBusiness = (idx: number, scrollTo: number) => {
    if (idx === -1) {
      setActiveBusiness([-1]);
      scrollToIndex(0);
      scrollToIndexFilter(0);
    } else {
      const index = activeBusiness.findIndex((item) => item === idx);
      if (index === -1) {
        // index not found so add it and mark as selected
        const selected = activeBusiness.filter((item) => item !== -1);
        setActiveBusiness([...selected, idx]);
        scrollToIndexFilter(scrollTo);
      } else {
        // index found so remove it
        setActiveBusiness(activeBusiness.filter((value) => value !== idx));
        if (activeBusiness.length === 0) {
          // if after remove the item the list is empty scroll to 0
          scrollToIndexFilter(0);
        } else scrollToIndexFilter(scrollTo); // else scroll to removed item
      }
    }
  };

  useEffect(() => {
    if (activeBusiness.length === 0) {
      setActiveBusiness([-1]);
      scrollToIndexFilter(0);
    }
  }, [activeBusiness]);

  if (fetching) {
    return <GroupBusinessDataSkeleton />;
  }

  if (businessList.length === 0) {
    return (
      <ChartsPlaceholder
        title="No hay datos que mostrar"
        subtitle="Seleccione otro rango de fecha"
      />
    );
  }

  businessList.unshift({ name: "Todos", color: "", idx: -1 });

  return (
    <View style={{ flex: 1 }}>
      <GroupSalesPieChart
        data={pieData}
        onPressed={scrollToIndex}
        currency={business?.mainCurrency!}
        dateRange={datesRange}
      />
      <GroupSalesFilterList
        ref={refFilter}
        data={businessList}
        activeBusiness={activeBusiness}
        onPress={selectBusiness}
      />
      <GroupSalesStatsCard ref={ref} data={barData} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: `#FFFFFF`,
    width: width / 1.25,
    height: 130,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-evenly",
    margin: 5,
  },
  title: {
    color: palette.secondary,
    fontSize: 18,
    fontWeight: "600",
    width: 200,
  },
  row: { flexDirection: "row", alignItems: "center" },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  cardRow: {
    // justifyContent: "space-between",
    width: "100%",
    // backgroundColor: "lightblue",
  },
  salesText: { fontWeight: "500", fontSize: 14 },
  barStyle: { width: 150, marginRight: -5 },
  statsStyle: { width: 95, textAlign: "right" },
});
