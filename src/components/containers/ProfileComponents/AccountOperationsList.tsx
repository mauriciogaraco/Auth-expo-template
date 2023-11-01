import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import {
  useGetAccountOperationsQuery,
  useGetBankAccountsQuery,
} from "../../../store/api/bankAccountApi";
import AccountsOperationsListSkeleton from "../../atoms/skeletons/AccountsOperationsListSkeleton";
import { BankAccountOperation } from "../../../services/Interfaces";
import Card from "../../atoms/Card";
import { palette } from "../../../theme/colors";
import Layout from "../../../utils/Layout";
import { formatPrice } from "../../../utils/utils";
import { FooterList } from "../../atoms/FooterList";
import BankAccountOperationsPlaceholder from "../../atoms/placeholders/BankAccountOperationsPlaceholder";
import { FlashList } from "@shopify/flash-list";
import AccountOperationSkeleton from "../../atoms/skeletons/AccountOperationSkeleton";

const getOperationType = (type: number) => {
  if (type === 1) {
    return "debit";
  } else if (type === 2) {
    return "credit";
  } else return "";
};

export default function AccountOperationsList({
  id,
  type,
  ListHeaderComponent,
}: {
  id: number;
  type: number;
  ListHeaderComponent: ReactElement;
}) {
  const opType = getOperationType(type);
  const initialPage = 1;
  const [page, setPage] = useState<number>(initialPage);
  const { data, isLoading, isFetching, isError, error } =
    useGetAccountOperationsQuery(
      { accountId: id, operation: opType, page: page },
      { skip: id === -1 }
    );

  useEffect(() => {
    setPage(initialPage);
  }, [type, id]);

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

  // if (isLoading) {
  //   return <AccountsOperationsListSkeleton />;
  // }

  // if (!data)
  //   return (
  //     <BankAccountOperationsPlaceholder
  //       title="No hay operaciones para mostrar"
  //       subtitle="Seleccione otra cuenta"
  //     />
  //   );

  // const { items, currentPage, totalPages } = data;

  const onEndReached = () => {
    if (data?.currentPage! < data?.totalPages!) {
      setPage(data?.currentPage! + 1);
    }
  };

  // console.log("isFetching", isFetching);
  const renderItem = ({
    item,
  }: {
    item: BankAccountOperation;
    index: number;
  }) => {
    return isFetching ? (
      <AccountOperationSkeleton />
    ) : (
      <View style={styles.container}>
        <View style={styles.start}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="credit-card"
              size={24}
              color="white"
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsTitle} numberOfLines={2}>
              {item.description || "Sin descripción"}
            </Text>
            {item.accountTag ? (
              <Text style={styles.detailsSubtitle} numberOfLines={1}>
                {item.accountTag?.name}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.end}>
          <View style={styles.amount}>
            <Text
              style={[
                styles.number,
                item.amount?.amount! > 0 ? styles.green : styles.red,
              ]}
            >
              {formatPrice(item.amount?.amount, item.amount?.codeCurrency)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const showFooter = isFetching && data?.currentPage! < data?.totalPages!;

  return (
    <FlatList
      data={data?.items || []}
      renderItem={renderItem}
      // contentContainerStyle={{
      //   padding: 10,
      // }}
      // estimatedItemSize={56}
      keyExtractor={(_, index) => index.toString()}
      onEndReachedThreshold={0.5}
      // stickyHeaderHiddenOnScroll
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={<FooterList isLoading={showFooter} />}
      ListEmptyComponent={
        isLoading || isFetching ? (
          <AccountsOperationsListSkeleton loading={isLoading || isFetching} />
        ) : data?.totalItems === 0 ? (
          <BankAccountOperationsPlaceholder
            title="No hay operaciones para mostrar"
            subtitle="Seleccione otra cuenta"
          />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    padding: 3,
    marginVertical: 2,
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  start: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    alignContent: "center",
    alignItems: "center",
  },
  icon: {
    backgroundColor: palette.accountCard,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginRight: 5,
    width: 50,
    height: 50,
  },
  details: {
    justifyContent: "space-evenly",
    width: "100%",
    flexShrink: 1,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.circularProgressBar2,
  },
  detailsSubtitle: {
    fontSize: 13,
    color: palette.icons,
  },
  end: {
    alignSelf: "flex-end",
    marginLeft: 5,
  },
  amount: {
    flex: 1,
    justifyContent: "center",
    alignItems: "baseline",
  },
  number: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.circularProgressBar2,
    textAlign: "right",
  },
  green: { color: palette.green },
  red: { color: palette.lightRed },
});
