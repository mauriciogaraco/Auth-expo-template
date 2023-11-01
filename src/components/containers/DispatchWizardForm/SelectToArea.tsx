import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar, TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectAreaByType } from "../../../store/slices/areaSlice";
import { useDebouncedValue } from "../../../utils/useDebouncedValue";
import IconTextCard from "../IconTextCard";
import { LayerGroupSolid } from "../../../theme/icons";
import Layout from "../../../utils/Layout";
import { palette } from "../../../theme/colors";
import { globals } from "../../../theme/styles/global";
import { FlatList } from "react-native-gesture-handler";
import EmptySearchPlaceholder from "../../atoms/placeholders/EmptySearchPlaceholder";
import { FooterList } from "../../atoms/FooterList";
import { Area } from "../../../services/Interfaces";
import { updateData } from "../../../store/slices/dispatchOperationSlice";

const width = Layout.window.width;

export default function SelectToArea() {
  const dispatch = useAppDispatch();
  const stockAreas = useAppSelector(selectAreaByType("STOCK"));
  const fromArea = useAppSelector((state) => state.dispatchForm.fromAreaId);

  const [query, setQuery] = useState<string>("");
  const debouncedValue = useDebouncedValue(query, 700);
  const onChangeSearch = (query: string) => setQuery(query);
  const onClearSearch = () => setQuery("");

  const nextStep = (areaId: number, areaName: string) => {
    dispatch(
      updateData({
        step: 2,
        toAreaId: areaId,
        toAreaName: areaName,
      })
    );
  };

  const renderItem = ({ item }: { item: Area }) => {
    return (
      <IconTextCard
        onPress={() => nextStep(item.id, item.name)}
        title={item.name || "Nombre no especificado"}
        isMain={item.isMainStock}
        IconSvg={LayerGroupSolid}
      />
    );
  };

  const filteredAreas = useMemo(() => {
    return stockAreas
      .filter((area) => area.id !== fromArea)
      .filter((data) => {
        return (
          data.name.toLowerCase().indexOf(debouncedValue.toLowerCase()) > -1
        );
      });
  }, [stockAreas, debouncedValue]);

  return (
    <View style={styles.content}>
      <View style={styles.searchContainer}>
        <View
          style={{
            width: width / 1.1,
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
      </View>
      <FlatList
        data={filteredAreas}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ margin: 5 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptySearchPlaceholder />}
        ListFooterComponent={<FooterList isLoading={false} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    // padding: 10,
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
