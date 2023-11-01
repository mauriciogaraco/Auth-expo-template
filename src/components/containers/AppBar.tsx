import React, { useState } from "react";
import { Appbar, Avatar, Provider } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { globals } from "../../theme/styles/global";
import { useAppSelector } from "../../store/hooks";
import { colors } from "../../theme/colors";
import ModalBranches from "./ModalBranches";
import {
  selectMode,
  selectCurrentBusiness,
  selectBranches,
} from "../../store/slices/businessSlice";
import Layout from "../../utils/Layout";
import AvatarComponent from "../atoms/AvatarComponent";

type AppBarProps = {
  back: {} | undefined;
  search?: boolean;
  title: string;
  navigation: any;
  route?: any;
};
export default function AppBar(props: AppBarProps) {
  const { back, search, title, navigation, route } = props;

  const business = useAppSelector(selectCurrentBusiness);
  const branches = useAppSelector(selectBranches);

  const leftAction = () => {
    back && navigation.goBack();
  };

  const [toggleModal, setToggleModal] = useState(false);

  const openModal = () => {
    if (branches?.length !== 0) {
      // setToggleModal(true);
      navigation.navigate("BusinessBranchScreen");
    }
  };

  return (
    // <Provider>
    <Appbar.Header style={{ backgroundColor: "#FFFFFF" }}>
      {back && (
        <Appbar.Action
          animated={false}
          icon={() => (
            <FontAwesome5 name={"arrow-left"} size={20} color="black" />
          )}
          onPress={leftAction}
        />
      )}
      <Appbar.Content
        title={title}
        titleStyle={[globals.headerTitle]}
        // style={{ width: (3 * Layout.window.width) / 5 }}
        style={{
          alignItems: back ? "center" : "stretch",
          width: (3 * Layout.window.width) / 5,
        }}
        mode="center-aligned"
      />
      {search && (
        <Appbar.Action
          animated={false}
          icon={() => <FontAwesome5 name="search" size={20} color={"black"} />}
          onPress={() =>
            navigation.navigate("SearchProductsScreen", {
              idStore: route?.params?.id || -1,
            })
          }
        />
      )}
      <Appbar.Action
        animated={false}
        onPress={openModal}
        icon={() => (
          <AvatarComponent size={35} uri={business?.logo?.thumbnail} />
        )}
      />
      <ModalBranches visible={toggleModal} toggle={setToggleModal} />
    </Appbar.Header>
    // </Provider>
  );
}
