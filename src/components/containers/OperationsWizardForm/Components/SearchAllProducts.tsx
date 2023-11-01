import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

import { useGetAllProductsQuery } from "../../../../store/api/productsApi";
import ProductComponent from "../../ProductComponent";
import { Product } from "../../../../services/Interfaces";
import { updateData } from "../../../../store/slices/operationFormSlice";
import { useAppDispatch } from "../../../../store/hooks";
import ProductsListSkeleton from "../../../atoms/skeletons/ProductsListSkeleton";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";
import { palette } from "../../../../theme/colors";
import EmptySearchPlaceholder from "../../../atoms/placeholders/EmptySearchPlaceholder";
import { FooterList } from "../../../atoms/FooterList";

interface Props {
  searchQuery: string;
  page: number;
  setPage: any;
}

export default function SearchAllProducts({
  searchQuery,
  page,
  setPage,
}: Props) {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isFetching, isLoading, isError, error, refetch } =
    useGetAllProductsQuery(
      {
        page: page,
        search: searchQuery,
        type: "STOCK",
      },
      { skip: searchQuery === "" }
    );

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

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

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    refetch().finally(() => setRefreshing(false));
  };
  //  (prodId: number, name: string, image: string, quantity: number, cost: number, measure: string)
  const onPress = (item: Product) => {
    dispatch(
      updateData({
        step: 3,
        currentProduct: {
          id: item.id,
          productName: item.name,
          image: item?.images[0]?.thumbnail ?? "",
          oldQuantity: item.totalQuantity,
          oldPrice: item.averageCost,
          measure: item.measure,
          supplierId: item.supplierId,
        },
      })
    );
  };

  const renderItem = ({ item: product }: { item: Product; index?: number }) => {
    const price = product?.prices.find((item) => item.isMain === true);
    const hasImage = product?.images.length > 0;
    return (
      <ProductComponent
        onPress={() => onPress(product)}
        // onPress={() => {}}
        cardStyle={styles.cardStyle}
        codeCurrency={price?.codeCurrency}
        price={price?.price}
        measure={product?.measure}
        name={product?.name}
        quantity={product?.totalQuantity}
        stockLimit={product?.stockLimit}
        thumbnail={hasImage ? product?.images[0]?.thumbnail : ""}
        type={product?.type}
        hasPrice={typeof price !== undefined}
      />
    );
  };

  const onEndReached = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 0;

  const listData = searchQuery !== "" ? data?.items || [] : [];

  const title = searchQuery ? "Lo sentimos" : "Realice una búsqueda";
  const subtitle = searchQuery
    ? "No se han encontrado coincidencias"
    : "Introduzca un criterio de búsqueda";
  return (
    <>
      {isLoading || isFetching ? (
        <ProductsListSkeleton />
      ) : (
        <FlashList
          data={listData}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ padding: 10 }}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing && isFetching}
              colors={[palette.primary]}
            />
          }
          estimatedItemSize={255}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <EmptySearchPlaceholder title={title} subtitle={subtitle} />
          }
          ListFooterComponent={<FooterList isLoading={isFetching} />}
          renderItem={renderItem}
          onEndReached={onEndReached}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    margin: 5,
  },
});
