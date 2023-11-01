import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useAppSelector } from "../../../store/hooks";
import { selectAreaByType } from "../../../store/slices/areaSlice";
import { FlatList } from "react-native-gesture-handler";
import SelectChipController from "../../atoms/formControls/SelectChipController";

interface Props {
  labelStyle: StyleProp<TextStyle>;
}
export default function ProductionAreasOptionsList({ labelStyle }: Props) {
  const { control } = useFormContext();
  const productionAreas = useAppSelector(selectAreaByType("MANUFACTURER"));
  const productionAreasOptions = productionAreas.map((item) => ({
    label: item.name,
    key: item.id,
  }));
  const renderProductionAreasOptions = ({ item, index }: any) => {
    return (
      <SelectChipController
        controller={{
          control: control,
          name: `listProductionAreas.${index}`,
        }}
        data={item}
      />
    );
  };
  return productionAreas.length > 0 ? (
    <>
      <Text style={labelStyle}>&Aacute;reas de producci&oacute;n</Text>
      <FlatList
        style={{ flexGrow: 0, marginBottom: 10 }}
        data={productionAreasOptions}
        renderItem={renderProductionAreasOptions}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </>
  ) : null;
}

const styles = StyleSheet.create({});
