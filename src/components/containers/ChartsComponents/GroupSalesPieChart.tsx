import { Platform, View } from "react-native";
import React from "react";
import { VictoryLabel, VictoryPie } from "victory-native";
import { formatPrice } from "../../../utils/utils";
import { colors } from "../../../theme/colors";
import Svg from "react-native-svg";
import Layout from "../../../utils/Layout";

type Props = {
  data: any[];
  onPressed: (index: number) => void;
  currency: string | undefined;
  dateRange: string;
};

const { height } = Layout.window;
const size = height * 0.5;
const svg = Platform.OS === "android" ? size * 0.9 : size / 0.88;
const svgPos = Platform.OS === "android" ? svg * 0.05 : 0;
export default function GroupSalesPieChart(props: Props) {
  const { data, currency, onPressed, dateRange } = props;

  const totalSales = data?.reduce((total, value, idx) => {
    return total + (value?.y ?? 0);
  }, 0);

  return (
    <View
      style={{
        // flex: 1,
        // flexGrow: 1,
        maxHeight: size,
        // backgroundColor: "lightblue",
      }}
    >
      <Svg
        viewBox={`${svgPos} ${svgPos} ${svg} ${svg}`}
        // height={size}
        // width={size}
        // style={{ backgroundColor: "pink" }}
      >
        <VictoryPie
          animate={{
            duration: 1000,
          }}
          standalone={false}
          // height={size * .5}
          // width={size}
          data={data}
          innerRadius={Platform.OS === "android" ? size / 3.35 : size * 0.37}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: "data",
                      mutation: ({ index }) => onPressed(index),
                    },
                  ];
                },
              },
            },
          ]}
          cornerRadius={20}
          padAngle={1}
          labels={[]}
          style={{
            data: {
              fill: ({ datum }) => datum.fill,
            },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{
            fontSize: 20,
            color: colors.smokyBlack,
            fontWeight: "bolder",
          }}
          x={Platform.OS === "android" ? size * 0.5 : size / 1.75}
          y={Platform.OS === "android" ? size * 0.43 : size / 2.1}
          text={`${formatPrice(totalSales, currency)}`}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{
            fontSize: 20,
            color: colors.smokyBlack,
            fontWeight: "bolder",
          }}
          x={Platform.OS === "android" ? size * 0.5 : size / 1.75}
          y={Platform.OS === "android" ? size * 0.49 : size / 1.75}
          text={`Ingresos Total`}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{
            fill: colors.darkGrey,
            fontSize: 20,
            fontWeight: "400",
            zIndex: 10000,
          }}
          x={Platform.OS === "android" ? size * 0.5 : size / 1.75}
          y={Platform.OS === "android" ? size * 0.56 : size / 1.5}
          text={dateRange}
        />
      </Svg>
    </View>
  );
}
