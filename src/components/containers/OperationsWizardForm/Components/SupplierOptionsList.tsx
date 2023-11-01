import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import PickerController from "../../../atoms/formControls/PickerController";
import { palette } from "../../../../theme/colors";
import { useGetAllSuppliersQuery } from "../../../../store/api/productsApi";

interface Props {
  labelStyle?: StyleProp<TextStyle>;
  control: any;
}

export default function SupplierOptionsList({ labelStyle, control }: Props) {
  //   const { control } = useFormContext();
  const { data, isLoading, isFetching } = useGetAllSuppliersQuery({
    page: 1,
    search: "",
    all_data: true,
  });

  //   console.log("data", data);

  const pickerData = useMemo(() => {
    return data
      ? data?.items?.map((supplier) => ({
          label: supplier.name,
          value: supplier.id,
        }))
      : [];
  }, [data]);

  //   console.log("pickerData", pickerData);

  return (
    <PickerController
      controller={{ control: control as any, name: "supplierId" }}
      label="Proveedor"
      data={pickerData}
      isLoading={isFetching || isLoading}
      inputStyle={{ borderRadius: 50, borderColor: palette.icons }}
    />
  );
}

const styles = StyleSheet.create({});
