import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useAppSelector } from "../../../store/hooks";
import RadioBoxController from "../../atoms/formControls/RadioBoxController";
import { useFormContext } from "react-hook-form";
import { getAllProductCategories } from "../../../store/slices/areaSlice";
interface Props {
  labelStyle: StyleProp<TextStyle>;
}
export default function ProductCategoryOptionsList({ labelStyle }: Props) {
  const { control } = useFormContext();
  const productCategory = useAppSelector(getAllProductCategories);
  const productCategoryOptions = productCategory.map((item) => ({
    label: item.name,
    key: item.id,
  }));
  const renderProductCatOptions = ({ item, index }: any) => {
    return (
      <RadioBoxController
        controller={{
          control: control,
          name: "productCategoryId",
        }}
        data={item}
      />
    );
  };
  return productCategory.length > 0 ? (
    <>
      <Text style={labelStyle}>Categor&iacute;a de almac&eacute;n</Text>
      <FlatList
        style={{ flexGrow: 0, marginBottom: 10 }}
        data={productCategoryOptions}
        renderItem={renderProductCatOptions}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </>
  ) : null;
}

const styles = StyleSheet.create({});
