import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Card from "../atoms/Card";
import Layout from "../../utils/Layout";
import { palette } from "../../theme/colors";
import { SvgProps } from "react-native-svg";

interface Props {
  title: string;
  onPress: Function;
  isMain?: boolean;
  IconSvg: React.FC<SvgProps>;
  cardStyle?: StyleProp<ViewStyle>;
}

const width = Layout.window.width / 2.2;

export default function IconTextCard({
  title,
  onPress,
  isMain = false,
  IconSvg,
  cardStyle,
}: Props) {
  return (
    <Card style={[styles.card, cardStyle]} onPress={onPress}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: isMain ? palette.primary : palette.darkGray },
        ]}
      >
        <IconSvg fill={palette.white} height={"55%"} width={"55%"} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width,
    height: width,
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
    paddingTop: 10,
    marginHorizontal: 5,
  },
  iconCircle: {
    height: 90,
    width: 90,
    borderRadius: 100,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textContainer: {
    height: 40,
    width: "95%",
  },
  text: {
    fontSize: 15,
    color: palette.secondary,
    fontWeight: "700",
    textAlign: "center",
  },
});
