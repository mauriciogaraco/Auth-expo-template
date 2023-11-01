import { forwardRef } from "react";
import { StyleSheet, Text } from "react-native";
import { StyleProp, TextStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FilterListItem from "../atoms/FilterListItem";

type FilterOptions = {
  key: string;
  label: string;
};

type Props = {
  onPress: (status: string, indexStatus: number) => void;
  activeStatus: string;
};
const STATUS: FilterOptions[] = [
  { key: "", label: "Todas" },
  { key: "CREATED", label: "Pendiente" },
  { key: "ACCEPTED", label: "Recibido" },
  { key: "REJECTED", label: "Rechazado" },
];

export default forwardRef<FlatList, Props>(function DispatchStatusFilter(
  { activeStatus, onPress },
  ref
) {
  const renderItem = ({
    item,
    index,
  }: {
    item: FilterOptions;
    index: number;
  }) => {
    const isSelected = item.key === activeStatus;
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
      <Text style={styles.text}>Filtrar despachos</Text>
      <FlatList
        ref={ref}
        style={{ flexGrow: 0, marginBottom: 5 }}
        data={STATUS}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </>
  );
});

const styles = StyleSheet.create({
  text: { fontSize: 15, fontWeight: "600", margin: 5, marginBottom: 10 },
});
