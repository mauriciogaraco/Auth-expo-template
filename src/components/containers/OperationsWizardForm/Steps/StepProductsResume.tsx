import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { palette } from "../../../../theme/colors";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import ProductsResume from "../Components/ProductsResume";

export default function StepProductsResume({
  toggle,
  next,
}: {
  toggle: any;
  next: any;
}) {
  const {
    fromArea,
    products: formProducts,
    operationType,
    toArea,
  } = useAppSelector((state) => state.opForm);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.content}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Button
          icon={() => <AntDesign name="plus" size={24} color={palette.white} />}
          mode="contained"
          onPress={toggle}
          buttonColor={palette.primary}
          labelStyle={styles.buttonLabel}
        >
          Añadir
        </Button>
        <Button
          icon={() => (
            <AntDesign name="arrowright" size={24} color={palette.white} />
          )}
          mode="contained"
          onPress={next}
          contentStyle={{ flexDirection: "row-reverse" }}
          buttonColor={palette.primary}
          labelStyle={styles.buttonLabel}
        >
          Continuar
        </Button>
      </View>
      <ProductsResume
        operationType={operationType}
        toArea={toArea!}
        products={formProducts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: palette.white,
  },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
});
