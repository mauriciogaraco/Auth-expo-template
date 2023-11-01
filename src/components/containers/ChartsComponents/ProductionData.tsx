import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";

import { useGetProductionOrderQuery } from "../../../store/api/graphsDataApi";
import { palette } from "../../../theme/colors";
import ProductionCircularProgress from "../ProductionCircularProgress";
import { ProductReduced } from "../../../services/Interfaces";
import ProductionProducts from "./ProductionProducts";
import Layout from "../../../utils/Layout";
import ProductionBusinessDataSkeleton from "../../atoms/skeletons/ProductionBusinessDataSkeleton";
import ProductionBusinessPlaceholder from "../../atoms/placeholders/ProductionBusinessPlaceholder";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import ChartsPlaceholder from "../../atoms/placeholders/ChartsPlaceholder";

export default function ProductionData({
  id,
  navigation,
}: {
  id: number | undefined;
  navigation: Function;
}) {
  const {
    data: graphData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetProductionOrderQuery(typeof id === "number" ? id : skipToken, {
    refetchOnMountOrArgChange: 30,
  });

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: (error as any)?.data || "Ha ocurrido un error!",
        position: "top",
        topOffset: 9,
      });
    }
  }, [error]);

  if (isLoading || isFetching) return <ProductionBusinessDataSkeleton />;

  if (!graphData)
    return (
      <ChartsPlaceholder
        title="No hay datos que mostrar"
        subtitle="Seleccione una fecha"
      />
    );

  const { productionOrder, endProducts } = graphData;

  const totalProduction = {
    goal: productionOrder.totalGoalQuantity ?? 0,
    produced: productionOrder.totalProduced ?? 1,
    percentage:
      (productionOrder.totalProduced ?? 0) /
      (productionOrder.totalGoalQuantity ?? 1),
  };

  const renderItem = ({ item }: { item: ProductReduced }) => (
    <ProductionProducts data={item} containerStyle={styles.products} />
  );

  return (
    <>
      {/* <View style={{ height: 250, padding: 0 }}> */}
      <ProductionCircularProgress
        percent={totalProduction.percentage}
        resumeLabel={`${totalProduction.produced} de ${totalProduction.goal}`}
      />
      {/* </View> */}
      <View
        style={{
          height: 30,
          justifyContent: "center",
          alignItems: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <IconButton
          icon={() => (
            <Ionicons name="arrow-forward" size={24} color={palette.primary} />
          )}
          iconColor={palette.primary}
          size={20}
          onPress={() => navigation()}
        />
      </View>
      <FlatList
        data={endProducts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 5, paddingHorizontal: 10 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  products: {
    width: Layout.window.width / 2.7,
    marginHorizontal: 5,
    padding: 5,
    height: 250,
  },
});
