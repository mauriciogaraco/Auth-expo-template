import { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import { StyleProp, TextStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FilterListItem from "../atoms/FilterListItem";
import { getOperationSpanish } from "../../utils/utils";

type FilterOptions = {
  key: string;
  label: string;
};

type Props = {
  onPress: (status: string, indexStatus: number) => void;
  activeType: string;
};

const opTypes = [
  "ENTRY",
  "MOVEMENT",
  "PROCESSED",
  "OUT",
  "ADJUST",
  "REMOVED",
  "WASTE",
  "SALE",
];

const TYPES: FilterOptions[] = [
  { key: "", label: "Todas" },
  ...opTypes.map((item) => ({ key: item, label: getOperationSpanish(item) })),
];

export default forwardRef<FlatList, Props>(function StockOperationFilterType(
  { activeType, onPress },
  ref
) {
  const renderItem = ({
    item,
    index,
  }: {
    item: FilterOptions;
    index: number;
  }) => {
    const isSelected = item.key === activeType;
    return (
      <FilterListItem
        onPress={() => onPress(item.key, index)}
        selected={isSelected}
        label={item.label}
      />
    );
  };
  return (
    <>
      <Text style={styles.text}>Filtrar operaciones</Text>
      <FlatList
        ref={ref}
        style={{ flexGrow: 0, marginBottom: 5 }}
        data={TYPES}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </>
  );
});

const styles = StyleSheet.create({
  text: { fontSize: 15, fontWeight: "700", margin: 5, marginBottom: 10 },
});
