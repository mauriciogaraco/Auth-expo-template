import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { forwardRef } from "react";
import { MotiView } from "moti";
import { palette } from "../../theme/colors";
import { useGetStockAreaCategoriesQuery } from "../../store/api/areasApi";
import FilterListSkeleton from "../atoms/skeletons/FilterListSkeleton";
import FilterListItem from "../atoms/FilterListItem";
import { ProductCategory } from "../../services/Interfaces";

type FilterOptions = {
  key: number;
  label: string;
};

type Props = {
  areaId: number;
  onPress: (category: number, indexCategory: number) => void;
  activeCategory: number | string;
};

export default forwardRef<FlatList, Props>(function StockCategoriesComponent(
  { areaId, onPress, activeCategory },
  ref
) {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetStockAreaCategoriesQuery({
    page: 1,
    areaId: areaId,
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductCategory;
    index: number;
  }) => {
    const isSelected = item.id === activeCategory;
    return (
      <FilterListItem
        onPress={() => onPress(item.id, index)}
        selected={isSelected}
        label={item.name}
      />
    );
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {isLoading || isFetching ? (
        <FilterListSkeleton />
      ) : (
        <FlatList
          ref={ref}
          initialScrollIndex={0}
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({});
