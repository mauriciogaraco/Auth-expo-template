import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { globals } from "../../theme/styles/global";
import { colors } from "../../theme/colors";

const HomeNoDataScreen = () => {
  return (
    <View style={[styles.centerContent]}>
      <View style={[styles.centerContainer]}>
        <View style={styles.iconContainer}>
          <AntDesign
            name="linechart"
            size={100}
            color={colors.grey}
            style={{
              padding: 15,
              borderRadius: 20,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            variant="titleLarge"
            adjustsFontSizeToFit
            style={{
              color: colors.darkGrey,
              fontWeight: "600",
              textAlign: "center",
              // fontFamily: 'poppins-medium'
            }}
          >
            No hay datos para mostrar
          </Text>

          <Text
            variant="titleMedium"
            adjustsFontSizeToFit
            style={{
              color: colors.grey,
              fontWeight: "600",
              paddingHorizontal: 45,
              textAlign: "center",
              // fontFamily: 'poppins-300'
            }}
          >
            No ha realizado ventas esta semana
          </Text>
        </View>
      </View>
        <Text
            variant="bodySmall"
            adjustsFontSizeToFit
            style={{
              color: colors.darkGrey,
              fontWeight: "600",
              textAlign: "center",
              // fontFamily: 'poppins-medium'
            }}
          >
            *Aquí aparecerán los reportes de ventas de la semana
          </Text>
    </View>
  );
};

export default HomeNoDataScreen;

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 10,
    // backgroundColor: "lightblue",
  },
  centerContainer: {
    // backgroundColor: "#FFFFFF",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  iconContainer: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
    marginBottom: 15,
  },
  textContainer: {
    height: "30%",
    // backgroundColor: "whitesmoke",
    alignItems: "center",
  },
});
