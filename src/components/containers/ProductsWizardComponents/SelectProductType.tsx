import { StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import Card from "../../atoms/Card";
import { palette } from "../../../theme/colors";
import Layout from "../../../utils/Layout";
import {
  BoxesSolid,
  CalculatorSolid,
  FireSolid,
  LayerGroupSolid,
  MinusSquareSolid,
  PalletSolid,
  PlusSolid,
  ProjectDiagram,
  SquareSolid,
  UserTieSolid,
} from "../../../theme/icons";
import { FlatList } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateData } from "../../../store/slices/productFormSlice";
import {
  selectBusinessProductTypes,
  selectCurrentBusiness,
} from "../../../store/slices/businessSlice";

const productTypes = [
  {
    icon: LayerGroupSolid,
    title: "Almacén",
    description:
      "Formato contable y tangible que se gestiona a ravés de opraciones de entradas y salidas de un área.",
    code: "STOCK",
  },
  {
    icon: PalletSolid,
    title: "Variable",
    description:
      "Productos contables y tangibles de almacén que corresonden a una misma agrupación y que cuentan con diferentes atributos.",
    code: "VARIATION",
  },
  {
    icon: PlusSolid,
    title: "Agregos",
    description: "Productos que hacen función de agrego en otros productos.",
    code: "ADDON",
  },
  {
    icon: SquareSolid,
    title: "Materia prima",
    description:
      "Productos sin elaborar y que sirven de base para los procesos de producción.",
    code: "RAW",
  },
  {
    icon: ProjectDiagram,
    title: "Procesado",
    description:
      "Aquellos que son resultado de un proceso de producción utilizando materias primas.",
    code: "MANUFACTURED",
  },
  {
    icon: MinusSquareSolid,
    title: "Desperdicio",
    description:
      "Recursos derivados de operaciones de procesado y que pueden ser considerado como merma, o productos sin utilidad.",
    code: "WASTE",
  },
  {
    icon: FireSolid,
    title: "Elaborado",
    description: "Requiere una elaboración previa o procesado.",
    code: "MENU",
  },
  {
    icon: UserTieSolid,
    title: "Servicio",
    description:
      "Formato para denominar las prestaciones de utilidades que no consisten en productos materiales.",
    code: "SERVICE",
  },
  {
    icon: CalculatorSolid,
    title: "Activos",
    description:
      "Bienes o servicios tangibles o intangibles que forman parte de los procesos del negocio.",
    code: "ASSET",
  },
  {
    icon: BoxesSolid,
    title: "Combo",
    description:
      "Permite agrupa un conjunto de productos de formato Elaborado o de Almacén.",
    code: "COMBO",
  },
];

const width = Layout.window.width;

export default function SelectProductType() {
  const dispatch = useAppDispatch();
  const businessProductTypes = useAppSelector(selectBusinessProductTypes);
  // console.log("businessProductTypes", businessProductTypes);
  const onPress = (code: string) => {
    dispatch(updateData({ type: code, step: 1 }));
  };

  const memoizedData = useMemo(() => {
    return productTypes.filter(
      (type) => businessProductTypes.indexOf(type.code) !== -1
    );
  }, [businessProductTypes]);

  const renderOptions = ({ item, index }: any) => {
    const IconSvg = item.icon;
    return (
      <Card key={index} style={styles.card} onPress={() => onPress(item.code)}>
        <View
          style={[styles.iconCircle, { backgroundColor: palette.darkGray }]}
        >
          <IconSvg fill={palette.white} height={"55%"} width={"55%"} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{item.description}</Text>
        </View>
      </Card>
    );
  };

  return (
    <FlatList
      data={memoizedData}
      renderItem={renderOptions}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={{ margin: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: width / 2.25,
    // height: Layout.window.width / 1.6,
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    padding: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
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
    height: 35,
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
    height: 80,
    width: "100%",
    // backgroundColor: "gray",
  },
  subtitle: {
    fontSize: 12.5,
    color: palette.icons,
    textAlign: "center",
    lineHeight: 16,
  },
});
