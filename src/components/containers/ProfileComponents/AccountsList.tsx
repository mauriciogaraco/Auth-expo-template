import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BankAccountCard from "./BankAccountCard";
import { FlashList } from "@shopify/flash-list";
import { useGetBankAccountsQuery } from "../../../store/api/bankAccountApi";
import { BankAccount } from "../../../services/Interfaces";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  onPress: (cardId: number) => void;
  bankAccounts: Array<BankAccount>;
}

export default function AccountsList({ onPress, bankAccounts }: Props) {
  // console.log("bankAccounts =>>", bankAccounts);
  const renderItem = ({ item }: { item: BankAccount }) => {
    return (
      <View style={styles.listItem}>
        <BankAccountCard
          onPress={() => onPress(item.id)}
          accountNumber={item.address}
          isBlocked={item.isBlocked}
          logo={item.business.logo?.thumbnail}
          ownerName={item.owner?.displayName!}
          accountName={item.name}
        />
      </View>
    );
  };
  return (
    <FlatList
      data={bankAccounts}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      centerContent={true}
      //   pagingEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    margin: 5,
    flex: 1,
  },
});
