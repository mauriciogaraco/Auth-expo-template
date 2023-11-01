import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import RadioBoxController from "../../atoms/formControls/RadioBoxController";
import { useFormContext } from "react-hook-form";
import { FlatList } from "react-native-gesture-handler";
import { palette } from "../../../theme/colors";
import { getAllSalesCategories } from "../../../store/slices/areaSlice";

interface Props {
  labelStyle: StyleProp<TextStyle>;
}

export default function SalesCategoryOptionsList({ labelStyle }: Props) {
  const { control } = useFormContext();
  const salesCategory = useAppSelector(getAllSalesCategories);
  const salesCategoryOptions = salesCategory.map((item) => ({
    label: item.name,
    key: item.id,
  }));
  const renderSalesOptions = ({ item, index }: any) => {
    return (
      <RadioBoxController
        controller={{
          control: control,
          name: "salesCategoryId",
        }}
        data={item}
      />
    );
  };
  return salesCategory.length > 0 ? (
    <>
      <Text style={labelStyle}>Categor&iacute;a de venta</Text>
      <FlatList
        style={{ flexGrow: 0, marginBottom: 10 }}
        data={salesCategoryOptions}
        renderItem={renderSalesOptions}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </>
  ) : null;
}

const styles = StyleSheet.create({});
