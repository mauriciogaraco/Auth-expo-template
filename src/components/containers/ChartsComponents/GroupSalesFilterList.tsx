import { StyleSheet, View } from "react-native";
import React, { forwardRef } from "react";
import { FlatList } from "react-native";
import FilterListItem from "../../atoms/FilterListItem";

type Props = {
  data: Array<any>;
  onPress: Function;
  activeBusiness: number[];
};

export default forwardRef<FlatList, Props>(function GroupSalesFilterList(
  props: Props,
  ref
) {
  const { data, onPress, activeBusiness } = props;

  const renderItem = ({ item, index }: any) => {
    const isSelected = activeBusiness.includes(item.idx);
    const isDisabled = activeBusiness[0] === -1 && item.idx === -1;
    return (
      <FilterListItem
        onPress={() => onPress(item.idx, index)}
        selected={isSelected}
        label={item.name}
        disabled={isDisabled}
      />
    );
  };
  return (
    <View style={{ marginBottom: 10 }}>
      <FlatList
        ref={ref}
        initialScrollIndex={0}
        style={{ flexGrow: 0, marginBottom: 10 }}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderItem}
      />
    </View>
  );
});

const styles = StyleSheet.create({});
