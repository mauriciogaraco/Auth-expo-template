import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Card from "../../atoms/Card";
import ProductionCircularProgress from "../ProductionCircularProgress";
import { palette } from "../../../theme/colors";
import { ProductReduced } from "../../../services/Interfaces";
import AvatarComponent from "../../atoms/AvatarComponent";

interface Props {
  containerStyle: StyleProp<ViewStyle>;
  data: ProductReduced;
}
export default function ProductionProducts(props: Props) {
  const { containerStyle, data } = props;
  const percentage = data.realProduced / data.goalQuantity;
  const label = `${data.realProduced} de ${data.goalQuantity}`;

  return (
    <Card style={[styles.container, containerStyle]} disabled={true}>
      <View style={styles.circularProgress}>
        <ProductionCircularProgress
          percent={percentage}
          middleLabel={false}
          resumeLabel={label}
        />
      </View>
      <AvatarComponent size={60} uri={data?.image} />
      <View>
        <Text style={styles.text} numberOfLines={2}>
          {data.name}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
  },
  circularProgress: {
    width: "100%",
    height: 120,
  },
  text: {
    fontSize: 14,
    color: palette.secondary,
    textAlign: "center",
    fontWeight: "bold",
    height: 40,
  },
});
