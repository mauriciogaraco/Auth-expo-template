import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { FlashList } from "@shopify/flash-list";

import { useGetStockAreaProductsQuery } from "../../../../store/api/areasApi";
import ProductComponent from "../../ProductComponent";
import { Product, StockAreaProducts } from "../../../../services/Interfaces";
import { FooterList } from "../../../atoms/FooterList";
import EmptySearchPlaceholder from "../../../atoms/placeholders/EmptySearchPlaceholder";
import ProductsListSkeleton from "../../../atoms/skeletons/ProductsListSkeleton";
import { useAppDispatch } from "../../../../store/hooks";
import { updateData } from "../../../../store/slices/operationFormSlice";
import { RefreshControl } from "react-native-gesture-handler";
import { palette } from "../../../../theme/colors";

interface Props {
  areaId: number;
  searchQuery: string;
  page: number;
  setPage: any;
  onPress: any;
}
export default function SearchStockAreaProduct({
  areaId,
  searchQuery,
  page,
  setPage,
  onPress,
}: Props) {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isFetching, isLoading, isError, error, refetch } =
    useGetStockAreaProductsQuery({
      page: page,
      search: searchQuery,
      areaId: areaId,
      categoryId: null,
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

  if (isLoading) return <ProductsListSkeleton />;

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    refetch().finally(() => setRefreshing(false));
  };

  const renderItem = ({
    item,
  }: {
    item: StockAreaProducts;
    index?: number;
  }) => {
    const product = item.product;
    const price = product?.prices.find((item) => item.isMain === true);
    const hasImage = product?.images.length > 0;
    return (
      <ProductComponent
        onPress={() => onPress(item.product, item.quantity, item.id)}
        codeCurrency={price?.codeCurrency}
        price={price?.price}
        measure={product.measure}
        name={product.name}
        quantity={item.quantity}
        stockLimit={product.stockLimit}
        thumbnail={hasImage ? product?.images[0]?.thumbnail : ""}
        type={product.type}
        hasPrice={typeof price !== undefined}
      />
    );
  };

  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <FlashList
        data={data?.items || []}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        estimatedItemSize={255}
        onEndReached={() => {
          if (currentPage < totalPages) {
            setPage(currentPage + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing && isFetching}
            colors={[palette.primary]}
          />
        }
        ListEmptyComponent={
          <EmptySearchPlaceholder
            title="Lo Sentimos"
            subtitle="No hay elementos que mostrar"
          />
        }
        ListFooterComponent={<FooterList isLoading={isFetching} />}
      />
    </>
  );
}
