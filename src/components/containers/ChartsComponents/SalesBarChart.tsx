import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from "victory-native";
import { palette } from "../../../theme/colors";
import { compactNumber, formatPrice } from "../../../utils/utils";
import FilterComponent from "../../atoms/FilterComponent";
import Layout from "../../../utils/Layout";
import moment from "moment";

export default function SalesBarChart({ data, currency }: any) {
  const reducedSales = data.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.sales,
    0
  );
  const [selected, setSelected] = useState<string>("Todos");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [totalSales, setTotalSales] = useState(reducedSales);

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const filterOptions = weekDays.map((item, index) => ({
    label: item,
    key: index,
  }));

  filterOptions.unshift({ label: "Todos", key: -1 });

  const [state, setState] = useState<{
    externalMutations: undefined | Array<any>;
  }>({
    externalMutations: undefined,
  });

  const removeMutation = () => {
    setState({
      externalMutations: undefined,
    });
  };

  const selectAll = () => {
    setState({
      externalMutations: [
        {
          childName: "bar",
          target: "data",
          eventKey: "all",
          mutation: () => ({ style: { fill: palette.primary } }),
          callback: removeMutation,
        },
      ],
    });
  };

  const selectDay = (item: any) => {
    setState({
      externalMutations: [
        {
          childName: "bar",
          target: "data",
          eventKey: "all",
          mutation: (props: any) => ({
            style: {
              fill:
                props.datum.day === item.key
                  ? palette.primary
                  : palette.lightPrimary,
            },
          }),
          callback: removeMutation,
        },
      ],
    });
  };

  const onDayPressed = (item: any) => {
    setSelected(item.label);
    if (item.key === -1) {
      selectAll();
      setSelectedDate("");
      setTotalSales(reducedSales);
    } else {
      selectDay(item);
      const dayStats = data.find((stat: any) => stat.day === item.key);
      const date = moment(dayStats.date).format("ddd, D [de] MMMM");
      setSelectedDate(date);
      setTotalSales(dayStats.sales);
    }
  };

  // console.log("compactNumber(5000)", compactNumber(5000));

  return (
    <View
      style={{
        paddingHorizontal: 20,
        width: Layout.window.width,
      }}
    >
      <FilterComponent
        data={filterOptions}
        selected={selected}
        setSelected={onDayPressed}
      />
      <View style={{ marginTop: 20 }}>
        <VictoryChart domainPadding={{ x: 15 }}>
          <VictoryLabel
            text={"Ingresos Total"}
            x={315}
            y={10}
            textAnchor="end"
            style={{ fill: palette.secondary, fontSize: 16, fontWeight: "700" }}
          />
          <VictoryLabel
            text={`$${formatPrice(totalSales, currency)}`}
            x={315}
            y={30}
            textAnchor="end"
            style={{ fill: palette.secondary, fontSize: 16, fontWeight: "700" }}
          />
          <VictoryLabel
            text={`${selectedDate}`}
            // x={120}
            y={30}
            textAnchor="start"
            style={{
              fill: palette.secondary,
              fontSize: 15,
              fontWeight: "400",
            }}
          />
          <VictoryBar
            name="bar"
            externalEventMutations={state.externalMutations}
            data={data}
            x={(d) => weekDays[d.day]}
            y={"sales"}
            alignment="middle"
            // minDomain={{ y: 0 }}
            barRatio={0.7}
            events={[
              {
                target: "data",
                eventHandlers: {},
              },
            ]}
            // domain={{ y: [0, 1] }}
            categories={{ x: weekDays }}
            style={{ data: { fill: palette.primary } }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `$${compactNumber(tick)}`}
            style={{
              tickLabels: {
                fill: palette.secondary,
                fontSize: 13,
                fontWeight: "500",
              },
              axis: {
                stroke: "transparent",
              },
              ticks: {
                fill: "transparent",
                stroke: "transparent",
              },
              grid: {
                fill: palette.icons,
                stroke: palette.icons,
                pointerEvents: "painted",
                strokeWidth: 0.5,
              },
            }}
          />
          <VictoryAxis
            style={{
              tickLabels: {
                fill: palette.secondary,
                fontSize: 13,
                fontWeight: "500",
              },
              axis: {
                stroke: palette.icons,
              },
              ticks: {
                fill: "transparent",
                stroke: "transparent",
              },
              grid: {
                stroke: "transparent",
              },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
