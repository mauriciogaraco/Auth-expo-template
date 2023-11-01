import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { palette } from "../../../theme/colors";
import Layout from "../../../utils/Layout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useDebouncedValue } from "../../../utils/useDebouncedValue";
import { updateData } from "../../../store/slices/dispatchOperationSlice";
import { IconButton, Searchbar, TextInput } from "react-native-paper";
import { globals } from "../../../theme/styles/global";
import SearchStockAreaProduct from "../OperationsWizardForm/Components/SearchStockAreaProduct";
import DispatchProductsResume from "./DispatchProductsResume";
import { Product } from "../../../services/Interfaces";

const width = Layout.window.width;

export default function SearchAreaProducts() {
  const dispatch = useAppDispatch();

  const { fromAreaId, products: formProducts } = useAppSelector(
    (state) => state.dispatchForm
  );

  const [query, setQuery] = useState<string>("");
  const debouncedValue = useDebouncedValue(query, 700);

  const [page, setPage] = useState(1);

  const [showProducts, setShowProducts] = useState(false);
  const hasProducts = formProducts.length > 0;

  useEffect(() => {
    setPage(1);
  }, [debouncedValue]);

  const onChangeSearch = (query: string) => setQuery(query);
  const onClearSearch = () => setQuery("");

  const nextStep = () => {
    dispatch(
      updateData({
        step: 4,
      })
    );
  };

  const onPressProduct = (
    item: Product,
    stockQuantity: number,
    productStockId: number
  ) => {
    dispatch(
      updateData({
        step: 3,
        currentProduct: {
          id: productStockId,
          productName: item?.name,
          image: item?.images[0]?.thumbnail ?? "",
          oldQuantity: stockQuantity,
          measure: item?.measure,
        },
      })
    );
  };

  const toggleProducts = () => {
    if (hasProducts) {
      setShowProducts((prev) => !prev);
    }
  };

  return !showProducts ? (
    <View style={styles.content}>
      <View style={styles.searchContainer}>
        {/* done: INPUT WIDTH FULL IF NO ARROW 88% IF ARROW */}
        <View
          // style={{flex: 1}}
          style={{
            width: hasProducts ? "88%" : Layout.window.width / 1.1,
          }}
        >
          <Searchbar
            value={query}
            onChangeText={onChangeSearch}
            placeholder="Buscar"
            placeholderTextColor={palette.icons}
            returnKeyType="search"
            icon={() => (
              <TextInput.Icon
                icon={() => (
                  <Ionicons
                    name={"search-outline"}
                    size={18}
                    color={palette.primary}
                    style={{ fontWeight: "bold" }}
                  />
                )}
              />
            )}
            style={globals.search}
            inputStyle={globals.searchInput}
            autoCapitalize="none"
            cursorColor={palette.primary}
            clearButtonMode="while-editing"
            enablesReturnKeyAutomatically
            clearIcon={() =>
              query ? (
                <TextInput.Icon
                  color={palette.primary}
                  icon={() => (
                    <Ionicons
                      name={"close-outline"}
                      size={24}
                      color={palette.primary}
                      style={{ fontWeight: "bold" }}
                    />
                  )}
                  onPress={onClearSearch}
                />
              ) : null
            }
            iconColor={palette.primary}
          />
        </View>
        <View>
          {hasProducts && (
            <IconButton
              icon={() => (
                <AntDesign
                  name="arrowright"
                  size={24}
                  color={palette.primary}
                />
              )}
              iconColor={palette.primary}
              size={20}
              onPress={toggleProducts}
            />
          )}
        </View>
      </View>
      <SearchStockAreaProduct
        areaId={fromAreaId || -1}
        searchQuery={query}
        page={page}
        setPage={setPage}
        onPress={onPressProduct}
      />
    </View>
  ) : (
    <DispatchProductsResume toggle={toggleProducts} next={nextStep} />
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: palette.white,
  },
  searchContainer: {
    width: width,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
