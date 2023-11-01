import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useMemo } from "react";
import { IpvProduct } from "../../services/Interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { getMeasureSpanish } from "../../utils/utils";
import { MotiPressable } from "moti/interactions";
import { Divider } from "react-native-paper";

type Props = {
  show: boolean;
  onClose?: () => void;
  product: IpvProduct | undefined;
};

export default function InventoryProductModal(props: Props) {
  const Item = ({
    iconName,
    label,
    value,
  }: {
    iconName: string;
    label: string;
    value: string | number;
  }) => (
    <View
      style={{
        alignItems: "center",
        // justifyContent: "space-evenly",
        flexDirection: "row",
        // backgroundColor: "pink",
        margin: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          width: "55%",
        }}
      >
        <View style={{ marginRight: 15 }}>
          <FontAwesome5 name={iconName} size={15} color={colors.smokyBlack} />
        </View>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>{label}</Text>
      </View>
      <View style={{ width: "45%" }}>
        <View>
          <View style={{ alignSelf: "flex-start" }}>
            <Text>{value}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={props.show}
      onRequestClose={props.onClose}
      transparent
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000055",
        }}
      >
        <View
          style={{
            height: "auto",
            paddingBottom: 10,
            width: 300,
            backgroundColor: "#fffbfe",
            borderRadius: 10,
          }}
        >
          {/* MODAL TITLE */}
          <View
            style={{
              height: "auto",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.jetBlack,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                margin: 10,
                fontWeight: "600",
                color: colors.white,
                textAlign: "center",
              }}
            >
              {props.product?.name}
            </Text>
          </View>

          {/* MODAL BODY */}
          <View
            style={{
              paddingHorizontal: 10,
              alignSelf: "center",
            }}
          >
            <Item
              iconName={"balance-scale-left"}
              label={"Medida"}
              value={
                getMeasureSpanish(props.product?.measure) || "No especificada"
              }
            />
            <Item
              iconName={"play"}
              label={"Inicio"}
              value={props.product?.initial || 0}
            />
            <Item
              iconName={"arrow-right"}
              label={"Entradas"}
              value={props.product?.entry || 0}
            />
            <Item
              iconName={"shopping-cart"}
              label={"Movimientos"}
              value={props.product?.movements || 0}
            />
            <Item
              iconName={"arrow-circle-left"}
              label={"Salidas"}
              value={props.product?.outs || 0}
            />
            <Item
              iconName={"minus-square"}
              label={"Desperdicios"}
              value={props.product?.waste || 0}
            />
            <Item
              iconName={"project-diagram"}
              label={"Procesados"}
              value={props.product?.processed || 0}
            />
            <Item
              iconName={"cash-register"}
              label={"Ventas"}
              value={props.product?.sales || 0}
            />
            <Item
              iconName={"boxes"}
              label={"Existencias"}
              value={props.product?.inStock || 0}
            />
          </View>
          <Divider style={{ marginVertical: 5 }} />
          {/* MODAL FOOTER */}
          <View
            style={{
              // height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <MotiPressable
              onPress={props.onClose}
              animate={useMemo(
                () =>
                  ({ hovered, pressed }) => {
                    "worklet";
                    return {
                      opacity: hovered || pressed ? 0.5 : 1,
                    };
                  },
                []
              )}
              containerStyle={{
                backgroundColor: colors.jetBlack,
                width: 100,
                height: 35,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "600", color: colors.white }}
              >
                Cerrar
              </Text>
            </MotiPressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
