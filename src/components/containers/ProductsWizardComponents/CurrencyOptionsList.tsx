import { StyleSheet, Text, StyleProp, TextStyle, View } from "react-native";
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
  options?: string | null;
  label?: boolean;
}

export default function CurrencyOptionsList({
  labelStyle,
  options,
  label = true,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors?.codeCurrency;

  const business = useAppSelector(selectCurrentBusiness);
  const currencyOptions = business?.availableCurrencies.map((item) => ({
    label: item.code,
    key: item.code,
  }));

  const currency = [{ label: options, key: options }];

  const renderCurrencies = ({ item }: any) => {
    return (
      <RadioButtonController
        controller={{
          control: control as any,
          name: "codeCurrency",
          rules: { required: "Debe especificar una moneda" },
        }}
        data={item}
      />
    );
  };

  const data = options ? currency : currencyOptions;

  return (
    <>
      {label ? <Text style={labelStyle}>Moneda</Text> : null}
      <View style={[globals.filterBar, styles.bar]}>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderCurrencies}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // centerContent={true}
          contentContainerStyle={{
            justifyContent: "space-evenly",
            minWidth: "100%",
          }}
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
    // marginBottom: 10,
  },
});
