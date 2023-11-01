import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { VictoryLabel, VictoryPie } from "victory-native";
import { Svg, Circle } from "react-native-svg";
import { palette } from "../../theme/colors";
import { formatPercentage } from "../../utils/utils";
import Layout from "../../utils/Layout";

interface Props {
  width?: number;
  height?: number;
  percent: number;
  innerRadius?: number;
  middleLabel?: boolean;
  resumeLabel: string;
}

const { width: winWidth, height: winHeight } = Layout.window;
const svgSize = winWidth * 0.9;
const svgPos = svgSize * 0.05;

export default function ProductionCircularProgress(props: Props) {
  const { percent, middleLabel = true, resumeLabel } = props;

  const data = [
    { x: 1, y: percent },
    { x: 2, y: 100 - percent * 100 },
  ];
  // const data2 = [
  //   // { x: 1, y: percent },
  //   { x: 2, y: 100 - percent * 100 },
  // ];
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        height: svgSize * 0.9,
      }}
    >
      <Svg viewBox={`${svgPos} ${svgPos} ${svgSize} ${svgSize}`}>
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          // width={svgWidth}
          // height={svgSize}
          data={data}
          //   innerRadius={120}
          // padAngle={1}
          radius={({ datum }) => (datum.x === 2 ? 150 : 160)}
          innerRadius={({ datum }) => (datum.x === 2 ? 140 : 130)}
          //   cornerRadius={25}
          cornerRadius={({ datum }) => (datum.x === 2 ? 5 : 15)}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                // const color = datum.y > 30 ? "green" : "red";
                return datum.x === 1
                  ? palette.primary
                  : palette.circularProgressBar;
              },
            },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={styles.blackText35}
          x={winWidth * 0.5}
          y={middleLabel ? winHeight / 5 : winWidth / 2.3}
          text={`${formatPercentage(percent)}`}
        />
        {middleLabel && (
          <VictoryLabel
            textAnchor="middle"
            style={styles.blackText25}
            x={winWidth * 0.5}
            y={winHeight / 4}
            text={`Producción Total`}
          />
        )}
        <VictoryLabel
          textAnchor="middle"
          style={styles.grayText}
          x={winWidth * 0.5}
          y={middleLabel ? winHeight / 3.3 : winHeight / 3.6}
          text={resumeLabel}
          // textComponent={}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  blackText25: {
    fontSize: 25,
    color: palette.circularProgressBar,
    fontWeight: "bold",
  },
  blackText35: {
    fontSize: 35,
    color: palette.circularProgressBar,
    fontWeight: "bold",
  },
  grayText: { fill: palette.icons, fontSize: 28, fontWeight: "500" },
});
