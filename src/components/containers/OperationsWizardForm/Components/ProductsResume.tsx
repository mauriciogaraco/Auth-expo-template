import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { useAppDispatch } from "../../../../store/hooks";
import {
  FormStepProduct,
  removeProduct,
  updateData,
} from "../../../../store/slices/operationFormSlice";
import WizardSummaryProduct from "./WizardSummaryProduct";

interface Props {
  products: FormStepProduct[];
  operationType: string;
  toArea?: number;
}

export default function ProductsResume({
  products,
  operationType,
  toArea,
}: Props) {
  const dispatch = useAppDispatch();

  const editProduct = (item: any) => {
    dispatch(
      updateData({
        step: 3,
        currentProduct: item,
      })
    );
  };
  const unselectProduct = (id: number) => {
    dispatch(removeProduct(id));
  };

  const renderSelectedProducts = ({
    item,
    index,
  }: {
    item: FormStepProduct;
    index: number;
  }) => {
    return (
      <WizardSummaryProduct
        image={item.image!}
        productName={item.productName!}
        quantity={item.quantity!}
        oldQuantity={item.oldQuantity}
        opType={operationType}
        toArea={toArea}
        measure={item.measure!}
        price={item.price!}
        priceType={item.priceType!}
        currency={item.currency!}
        onDelete={() => unselectProduct(item.id!)}
        onEdit={() => editProduct(item)}
      />
    );
  };

  return (
    <>
      <FlashList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderSelectedProducts}
        numColumns={2}
        contentContainerStyle={{ padding: 2 }}
        estimatedItemSize={300}
      />
    </>
  );
}

const styles = StyleSheet.create({});
