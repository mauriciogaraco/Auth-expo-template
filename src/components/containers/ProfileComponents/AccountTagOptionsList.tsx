import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import PickerController from "../../atoms/formControls/PickerController";
import { useGetBankAccountTagsQuery } from "../../../store/api/bankAccountApi";
import { palette } from "../../../theme/colors";

interface Props {
  labelStyle?: StyleProp<TextStyle>;
  accountId: number;
}

export default function AccountTagOptionsList({
  labelStyle,
  accountId,
}: Props) {
  const { control } = useFormContext();
  const { data, isLoading, isFetching } = useGetBankAccountTagsQuery({
    page: 1,
    search: "",
    accountId: accountId,
  });

  const pickerData = useMemo(() => {
    return data
      ? data?.items.map((tag) => ({ label: tag.name, value: tag.id }))
      : [];
  }, [data]);

  return (
    <PickerController
      controller={{ control: control as any, name: "accountTagId" }}
      label="Concepto"
      data={pickerData}
      isLoading={isFetching || isLoading}
      inputStyle={{ borderRadius: 50, borderColor: palette.icons }}
    />
  );
}

const styles = StyleSheet.create({});
