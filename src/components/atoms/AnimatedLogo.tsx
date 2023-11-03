import { StyleSheet } from "react-native";
import React from "react";
import { View } from "moti";
import { palette } from "../../theme/colors";
import Layout from "../utils/Layout";

const logoSize = Layout.window.width * 0.2;
const logoPiecesSize = logoSize / 2.5;

export default function AnimatedLogo() {
  return (
    <View style={styles.logoContainer}>
      <View
        transition={{ delay: 200, type: "timing", loop: true }}
        animate={{
          opacity: [0.5, 1, 1, 1],
        }}
        style={[styles.square, styles.logoPiece]}
      />
      <View
        transition={{ delay: 200, type: "timing", loop: true }}
        animate={{
          // opacity: [{ value: 0.4, delay: 1000 }],
          opacity: [1, 0.5, 1, 1],
        }}
        style={[styles.square, styles.logoPiece]}
      />
      <View
        transition={{ delay: 200, type: "timing", loop: true }}
        animate={{
          opacity: [1, 1, 1, 0.5],
        }}
        style={[styles.square, styles.logoPiece]}
      />
      <View
        transition={{ delay: 200, type: "timing", loop: true }}
        animate={{
          opacity: [1, 1, 0.5, 1],
        }}
        style={[styles.circle, styles.logoPiece]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flexDirection: "row",
  //   backgroundColor: palette.primary,
  // },
  logoContainer: {
    position: "relative",
    height: logoSize,
    width: logoSize,
    // backgroundColor: "hotpink",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  logoPiece: { height: logoPiecesSize, width: logoPiecesSize },
  square: {
    backgroundColor: palette.secondary,
  },
  circle: {
    backgroundColor: palette.logo,
    borderRadius: 100,
  },
  animatedOpacity: {
    backgroundColor: "#ffffff",
    zIndex: 3000,
    height: 50,
    width: 50,
    opacity: 0.4,
    position: "absolute",
  },
});
