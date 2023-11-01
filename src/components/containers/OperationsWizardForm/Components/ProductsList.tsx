import React from "react";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { RefreshControl } from "react-native-gesture-handler";
import { Product } from "../../../../services/Interfaces";
import { palette } from "../../../../theme/colors";
import EmptySearchPlaceholder from "../../../atoms/placeholders/EmptySearchPlaceholder";
import { FooterList } from "../../../atoms/FooterList";

interface Props extends Omit<FlashListProps<any>, "onRefresh"> {
  onPress: Function;
  onRefresh: any;
  isRefreshing: boolean;
  isFetching: boolean;
}
export default function ProductsList({
  onPress,
  data,
  onRefresh,
  isRefreshing,
  isFetching,
  ...rest
}: Props) {
  return (
    <FlashList
      data={data || []}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      contentContainerStyle={{ padding: 10 }}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          colors={[palette.primary]}
        />
      }
      estimatedItemSize={255}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        <EmptySearchPlaceholder
          title="Lo Sentimos"
          subtitle="No hay elementos que mostrar"
        />
      }
      ListFooterComponent={<FooterList isLoading={isFetching} />}
      {...rest}
    />
  );
}
