import { StyleSheet, View, StyleProp, TextStyle } from "react-native";
import React from "react";

import { useAppSelector } from "../../../store/hooks";
import { useFormContext } from "react-hook-form";
import { FlatList } from "react-native-gesture-handler";
import { selectCurrentBusiness } from "../../../store/slices/businessSlice";
import RadioButtonController from "../../atoms/formControls/RadioButtonController";
import { globals } from "../../../theme/styles/global";
import { HelperText } from "react-native-paper";
import { palette } from "../../../theme/colors";

interface Props {
  labelStyle: StyleProp<TextStyle>;
}

const operationType = [
  { label: "Crédito", key: "credit" },
  { label: "Débito", key: "debit" },
];

export default function OperationTypeOptions({ labelStyle }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors?.operation;
  return (
    <>
      {/* <Text style={labelStyle}>Tipo</Text> */}
      <View style={[globals.filterBar, styles.bar]}>
        <RadioButtonController
          controller={{
            control: control as any,
            name: "operation",
            rules: { required: "Debe especificar el tipo de operación" },
          }}
          data={operationType[0]}
        />
        <RadioButtonController
          controller={{
            control: control as any,
            name: "operation",
            rules: { required: "Debe especificar el tipo de operación" },
          }}
          data={operationType[1]}
        />
      </View>
      <HelperText
        type="error"
        visible={Boolean(error)}
        style={{ color: palette.red, height: error ? "auto" : 0 }}
      >
        {error?.message?.toString()}
      </HelperText>
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    overflow: "hidden",
    paddingHorizontal: 10,
    height: 40,
    // marginBottom: 5,
    justifyContent: "space-evenly",
  },
});
