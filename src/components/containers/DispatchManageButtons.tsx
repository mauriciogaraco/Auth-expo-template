import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import {
  getColorStatusDispatch,
  getDispatchStatusIcon,
  translateDispatchStatus,
} from "../../utils/utils";
import { palette } from "../../theme/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useManageDispatchMutation } from "../../store/api/areasApi";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNavigation } from "@react-navigation/native";

export default function DispatchManageButtons({
  dispatchId,
}: {
  dispatchId: number;
}) {
  const [manageDispatch, { isLoading }] = useManageDispatchMutation();
  const navigation = useNavigation();
  const [action, setAction] = useState("");

  const onPress = async (action: string) => {
    setAction(action);
    await manageDispatch({ action: action, dispatchId: dispatchId })
      .unwrap()
      .then(() => {
        //@ts-ignore
        navigation.pop();
      })
      .catch((err) => {
        // console.log("err", err);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: (err as any)?.data || "Ha ocurrido un error!",
          position: "top",
          topOffset: 9,
        });
      });
  };
  return (
    <View
      style={{
        padding: 5,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button
        icon={() => (
          <FontAwesome5
            color={getColorStatusDispatch("ACCEPTED")}
            name={getDispatchStatusIcon("ACCEPTED")}
            size={15}
            style={{ marginRight: 5 }}
          />
        )}
        buttonColor={palette.datesFilter}
        textColor={getColorStatusDispatch("ACCEPTED")}
        style={{ marginRight: 5 }}
        loading={isLoading && action === "ACCEPTED"}
        onPress={() => onPress("ACCEPTED")}
      >
        {translateDispatchStatus("ACCEPTED")}
      </Button>
      <Button
        icon={() => (
          <FontAwesome5
            color={getColorStatusDispatch("REJECTED")}
            name={getDispatchStatusIcon("REJECTED")}
            size={15}
            style={{ marginRight: 5 }}
          />
        )}
        buttonColor={palette.datesFilter}
        textColor={getColorStatusDispatch("REJECTED")}
        loading={isLoading && action === "REJECTED"}
        onPress={() => onPress("REJECTED")}
      >
        {translateDispatchStatus("REJECTED")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
