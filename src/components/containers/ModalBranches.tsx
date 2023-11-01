import { StyleSheet, View, Modal, Pressable, FlatList } from "react-native";
import React from "react";
import { List, Text, Avatar, Divider, Badge, Button } from "react-native-paper";
import { globals } from "../../theme/styles/global";
import { Branch } from "../../services/Interfaces";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { colors, palette } from "../../theme/colors";
import {
  selectBranches,
  selectCurrentBranch,
  selectCurrentBusiness,
  setCurrentBranch,
} from "../../store/slices/businessSlice";
import AvatarComponent from "../atoms/AvatarComponent";

export default function ModalBranches(props: any) {
  const { visible, toggle } = props;
  const dispatch = useAppDispatch();
  const branches = useAppSelector(selectBranches);
  const currentBranch = useAppSelector(selectCurrentBranch);

  const changeBranch = (id?: number | null) => {
    if (id && id !== currentBranch) {
      dispatch(setCurrentBranch(id));
    }
    toggle(false);
  };

  const mainBranch = branches?.find((item) => item.isMain);
  const otherBranches = branches?.filter((item) => !item.isMain);

  const renderItem = ({ item }: { item: Branch }) => {
    return (
      <List.Item
        style={{
          //   backgroundColor: colors.lightLogoOrange,
          marginVertical: 3,
          paddingStart: 10,
        }}
        title={item.name}
        left={(props) => (
          <AvatarComponent size={35} uri={item?.logo?.thumbnail} />
        )}
        right={(props) => (
          <Badge
            style={{ backgroundColor: colors.lightGreen }}
            visible={item.id === currentBranch}
            size={10}
          ></Badge>
        )}
        titleNumberOfLines={2}
        onPress={() => changeBranch(item.id)}
      />
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        toggle(!visible);
      }}
    >
      {/* <View style={globals.container}> */}
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View>
            <List.Item
              style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
              centered
              title={() => (
                <Text numberOfLines={2} variant="titleLarge">
                  {mainBranch?.name}
                </Text>
              )}
              onPress={() => changeBranch(mainBranch?.id)}
              left={(props) => (
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <AvatarComponent
                    size={50}
                    uri={mainBranch?.logo?.thumbnail}
                  />

                  <Badge
                    style={{ backgroundColor: colors.lightGreen }}
                    visible={
                      mainBranch?.id === currentBranch || currentBranch === null
                    }
                    size={10}
                  ></Badge>
                </View>
              )}
              borderless
            />
          </View>
          <Divider style={{ marginBottom: 2 }} />
          <FlatList
            data={otherBranches}
            contentContainerStyle={{
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={(item) => renderItem(item)}
          />
          <Divider />
          <View
            style={{
              height: 70,
              marginTop: 5,
              width: "100%",
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => toggle(false)}
              mode="elevated"
              buttonColor={palette.primary}
              textColor={palette.secondary}
              contentStyle={{ width: 150 }}
              labelStyle={{ fontSize: 15 }}
            >
              Cerrar
            </Button>
          </View>
        </View>
        {/* </View> */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ECECEC99",
  },
  modalContent: {
    height: "80%",
    width: 300,
    backgroundColor: palette.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
