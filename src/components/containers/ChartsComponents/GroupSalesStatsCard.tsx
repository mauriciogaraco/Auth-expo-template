import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import { colors, palette } from "../../../theme/colors";
import { formatPrice } from "../../../utils/utils";
import { Surface } from "react-native-paper";
import StatsProgressBar from "../../atoms/StatsProgressBar";
import Layout from "../../../utils/Layout";

type Props = {
  data: any[];
};

const width = Layout.window.width;
const cardWidth = width / 1.25;
const barWidth = cardWidth * 0.43;
const statsWidth = cardWidth * 0.4;

export default forwardRef<FlatList, Props>(function GroupSalesBarChart(
  props,
  ref
) {
  const { data } = props;
  const renderItem = ({ item, idx }: any) => {
    return (
      <Surface style={styles.card}>
        <Text
          style={[
            styles.title,
            {
              color: item.fill,
            },
          ]}
        >
          {item.title}
        </Text>
        <StatsProgressBar
          title="Total en ventas"
          progress={1}
          color={palette.blue}
          showProgress={false}
          containerStyle={styles.cardRow}
          barStyle={styles.barStyle}
          statsStyle={styles.statsStyle}
          stats={formatPrice(item?.sales, item?.currency)}
        />

        <StatsProgressBar
          title="Costos"
          progress={item?.cost / item?.sales}
          color={palette.red}
          stats={formatPrice(item?.cost, item?.currency)}
          containerStyle={styles.cardRow}
          barStyle={styles.barStyle}
          statsStyle={styles.statsStyle}
        />

        <StatsProgressBar
          title="Ganancias"
          progress={item?.gross / item?.sales}
          color={palette.green}
          stats={formatPrice(item?.gross, item?.currency)}
          containerStyle={styles.cardRow}
          barStyle={styles.barStyle}
          statsStyle={styles.statsStyle}
        />
      </Surface>
    );
  };
  return (
    <View>
      <FlatList
        ref={ref}
        initialScrollIndex={0}
        horizontal
        data={data}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: `#FFFFFF`,
    width: cardWidth,
    minHeight: 150,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-evenly",
    margin: 5,
  },
  title: {
    fontSize: 15,
    textAlign: "right",
    fontWeight: "500",
    width: "100%",
  },
  cardRow: {
    justifyContent: "space-between",
    width: "100%",
    // backgroundColor: "lightblue",
    paddingEnd: 0,
  },
  salesText: { fontWeight: "500", fontSize: 14 },
  barStyle: {
    width: barWidth,
    marginRight: -6,
    // backgroundColor: "aliceblue",
  },
  statsStyle: {
    width: statsWidth,
    textAlign: "right",
    // backgroundColor: "pink",
    paddingEnd: 3,
  },
});
