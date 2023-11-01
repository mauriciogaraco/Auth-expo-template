import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import React from "react";

import { useAppSelector } from "../../../store/hooks";
import { useFormContext } from "react-hook-form";
import { FlatList } from "react-native-gesture-handler";
import RadioButtonController from "../../atoms/formControls/RadioButtonController";
import { globals } from "../../../theme/styles/global";
import { getAllMeasures } from "../../../store/slices/areaSlice";

interface Props {
  labelStyle: StyleProp<TextStyle>;
}

export default function MeasureOptionsList({ labelStyle }: Props) {
  const { control } = useFormContext();
  const measures = useAppSelector(getAllMeasures);

  const measureOptions = measures.map((item) => ({
    label: item.value,
    key: item.code,
  }));
  const renderMeasures = ({ item }: any) => {
    return (
      <RadioButtonController
        controller={{ control: control as any, name: "measure" }}
        data={item}
      />
    );
  };
  return measures.length > 0 ? (
    <>
      <Text style={labelStyle}>Unidad de medida</Text>
      <View style={[globals.filterBar, styles.bar]}>
        <FlatList
          data={measureOptions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderMeasures}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // centerContent={true}
          contentContainerStyle={{
            justifyContent: "space-evenly",
            minWidth: "100%",
          }}
        />
      </View>
    </>
  ) : null;
}

const styles = StyleSheet.create({
  bar: {
    overflow: "hidden",
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
});
