import { StyleSheet, View, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { palette } from "../../../../theme/colors";
import { getOperationIcon } from "../../../../utils/utils";
import { Text } from "react-native-paper";
import { useAppDispatch } from "../../../../store/hooks";
import { updateData } from "../../../../store/slices/operationFormSlice";
import Layout from "../../../../utils/Layout";
import Card from "../../../atoms/Card";

const options = [
  {
    name: "Entrada",
    description: "Registro de productos luego de realizada una compra",
    code: "ENTRY",
    color: "#10B981",
  },
  {
    name: "Traslado",
    description: "Movimiento entre áreas de almacén.",
    code: "MOVEMENT",
    color: "#3F83F8",
  },
  {
    name: "Salida",
    description: "Son eliminaciones del inventario",
    code: "OUT",
    color: "#FF5A1F",
  },
  {
    name: "Ajuste",
    description: "Conciliación de inventario",
    code: "ADJUST",
    color: "#FACA15",
  },
];

export default function StepSelectOperation({ areaId }: { areaId: number }) {
  const dispatch = useAppDispatch();

  const onSubmit = (opType: string) => {
    const data = {
      operationType: opType,
      fromArea: areaId,
      step: opType === "MOVEMENT" ? 1 : 2,
    };
    dispatch(updateData(data));
  };

  const renderOptions = (item: any, index: number) => {
    return (
      <Card key={index} style={styles.card} onPress={() => onSubmit(item.code)}>
        <View style={[styles.iconCircle]}>
          <FontAwesome5
            name={getOperationIcon(item.code)}
            size={40}
            color={palette.white}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{item.description}</Text>
        </View>
      </Card>
    );
  };

  return (
    <ScrollView>
      <View style={styles.content}>{options.map(renderOptions)}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 10,
  },
  card: {
    width: Layout.window.width / 2.3,
    // height: Layout.window.width / 1.6,
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
    paddingVertical: 10,
    marginBottom: 15,
    // backgroundColor: "pink",
  },
  iconCircle: {
    height: 90,
    width: 90,
    borderRadius: 100,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: palette.darkGray,
  },
  textContainer: {
    height: 40,
    width: "90%",
    justifyContent: "center",
    // backgroundColor: "lightblue",
  },
  text: {
    fontSize: 15,
    color: palette.secondary,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitleContainer: {
    height: 50,
    width: "90%",
    // backgroundColor: "gray",
  },
  subtitle: {
    fontSize: 13,
    color: palette.icons,
    textAlign: "center",
    lineHeight: 16,
  },
});
