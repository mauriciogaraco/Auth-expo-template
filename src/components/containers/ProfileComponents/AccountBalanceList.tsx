import { StyleSheet, Text, View } from "react-native";
import { useEffect, useMemo, useRef } from "react";
import {
  useGetBankAccountByIdQuery,
  useGetBusinessAccountBalanceQuery,
} from "../../../store/api/bankAccountApi";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BalanceBankAccount, PriceInvoice } from "../../../services/Interfaces";
import { palette, skeletonsColors } from "../../../theme/colors";
import { formatPrice } from "../../../utils/utils";
import { FlatList } from "react-native-gesture-handler";
import Layout from "../../../utils/Layout";
import { Skeleton } from "moti/skeleton";
import { Spacer } from "../../atoms/Spacer";

interface Props {
  accountId: number;
  // accountCurrency: string | null;
}
const width = Layout.window.width / 1.1;
export default function AccountBalanceList({ accountId }: Props) {
  const { data, isLoading, isFetching, isError, error } =
    useGetBankAccountByIdQuery(accountId);

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

  // const ref = useRef<FlatList<PriceInvoice>>(null);
  // const scrollToIndex = () => {
  //   ref.current?.scrollToIndex({
  //     animated: true,
  //     index: 0,
  //   });
  // };

  // const currentAccountBalance = useMemo(() => {
  //   if (accountId !== -1) {
  //     const account = data?.actualBalance.find((item) => item.accountId === accountId);
  //     // scrollToIndex();
  //     return account?.currencies;
  //   } else {
  //     // scrollToIndex();
  //     return data[0]?.currencies;
  //   }
  // }, [accountId, data]);

  if (isLoading || isFetching) {
    return (
      <View style={styles.skeletonContainer}>
        <Skeleton
          colorMode={"light"}
          radius="round"
          width={250}
          height={35}
          colors={skeletonsColors}
        />
      </View>
    );
  }
  // const renderItem = ({
  //   item,
  // }: {
  //   item: PriceInvoice;
  //   index: number;
  // }) => {
  //   return (
  //     <View style={styles.totalContainer}>
  //       <Text style={styles.total}>
  //         {formatPrice(item.amount, item.codeCurrency)}
  //       </Text>
  //     </View>
  //   );
  // };

  // return (
  //   <FlatList
  //     ref={ref}
  //     data={currentAccountBalance}
  //     renderItem={renderItem}
  //     horizontal={true}
  //     showsHorizontalScrollIndicator={false}
  //     pagingEnabled={true}
  //     centerContent={true}
  //   />
  // );

  return (
    <>
      {data?.actualBalance?.map((item, index) => {
        return (
          <View style={styles.totalContainer} key={index}>
            <Text
              style={[
                styles.total,
                { color: item.amount >= 0 ? palette.green : palette.lightRed },
              ]}
            >
              {formatPrice(item.amount, item.codeCurrency)}
            </Text>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  totalContainer: {
    width: width,
    // backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  total: {
    fontSize: 28,
    color: palette.secondary,
    fontWeight: "600",
    textAlign: "center",
  },
  skeletonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
