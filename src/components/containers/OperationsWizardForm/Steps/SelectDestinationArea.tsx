import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectAreaByType } from "../../../../store/slices/areaSlice";
import { RootState } from "../../../../store/root";
import { updateData } from "../../../../store/slices/operationFormSlice";
import IconTextCard from "../../IconTextCard";
import { LayerGroupSolid } from "../../../../theme/icons";
import { palette } from "../../../../theme/colors";

export default function SelectDestinationArea() {
  const stockAreas = useAppSelector(selectAreaByType("STOCK"));
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state: RootState) => state.opForm);
  const filteredAreas = stockAreas.filter(
    (area) => area.id !== formState.fromArea
  );
  const onPress = (toAreaId: number) => {
    dispatch(updateData({ toArea: toAreaId, step: 2 }));
  };
  const renderItem = ({ item }: any) => {
    return (
      <IconTextCard
        onPress={() => onPress(item.id)}
        title={item.name || "Nombre no especificado"}
        isMain={item.isMainStock}
        IconSvg={LayerGroupSolid}
      />
    );
  };

  return (
    <View style={styles.content}>
      <FlatList
        data={filteredAreas}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ margin: 5 }}
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
});
