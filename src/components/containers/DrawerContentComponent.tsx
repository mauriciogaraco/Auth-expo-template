import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Drawer, IconButton } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
// import { useAuthentication } from "../../services/uses/useAuthentication";
import { useAppSelector } from "../../store/hooks";
import DrawerItemComponent from "../atoms/DrawerItemComponent";
import { selectCurrentUser } from "../../store/slices/sessionSlice";
import { selectCurrentBusiness } from "../../store/slices/businessSlice";

export default function DrawerContentComponent(
  props: DrawerContentComponentProps
) {
  // const { logOut } = useAuthentication({ startLoading: false });

  const user = useAppSelector(selectCurrentUser);
  const business = useAppSelector(selectCurrentBusiness);

  return (
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <DrawerContentScrollView {...props} style={{ flexDirection: "column" }}>
        <Drawer.Section>
          {/* <Text>Here goes logo brand + close icon button</Text> */}
          <View
            style={{
              // backgroundColor: "pink",
              justifyContent: "space-around",
              height: 100,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              source={
                business?.logo?.thumbnail
                  ? { uri: business?.logo?.thumbnail }
                  : require("../../../assets/images/default.jpeg")
              }
              size={40}
            />
            <Text
              style={{
                fontWeight: "700",
                color: colors.smokyBlack,
                width: "60%",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {business?.name}
            </Text>
            <IconButton
              icon={"close"}
              size={20}
              onPress={() => props.navigation.closeDrawer()}
            />
          </View>
        </Drawer.Section>
        <Drawer.Section style={{ paddingVertical: 10 }}>
          <DrawerItemComponent
            label={"Inicio"}
            startIcon="home"
            onPress={() => {
              props.navigation.navigate("HomeNavigator");
            }}
            active={
              props.state.routes[props.state.index].name === "HomeNavigator"
            }
          />
          <DrawerItemComponent
            label="Almacenes"
            startIcon={"layer-group"}
            onPress={() => props.navigation.navigate("StoreNavigator")}
            active={
              props.state.routes[props.state.index].name === "StoreNavigator"
            }
          />
          <DrawerItemComponent
            label={"Ciclos económicos"}
            startIcon="sync-alt"
            onPress={() => {
              props.navigation.navigate("EconomicCycleNavigator");
            }}
            active={
              props.state.routes[props.state.index].name ===
              "EconomicCycleNavigator"
            }
          />
          <DrawerItemComponent
            label="Productos"
            onPress={() => props.navigation.navigate("ProductNavigator")}
            active={
              props.state.routes[props.state.index].name === "ProductNavigator"
            }
            startIcon={"boxes"}
          />
          {/* <DrawerItemList {...props} /> */}
        </Drawer.Section>
        {/* <Drawer.Item
            label='Reportes'
            icon={"content-paste"}
            active= {activeScreen==='ReportsNavigator'}
            right={() => <IconButton icon="chevron-right" style={{marginRight: -25}}/>}
            onPress={() => onChangeScreen("ReportsNavigator")}
          />
          <Drawer.Item

            label='Capital humanos'
            icon={"account-multiple"}
            active= {activeScreen==='CapitalNavigator'}
            right={() => <IconButton icon="chevron-right" style={{marginRight: -25}}/>}
            onPress={() => onChangeScreen("CapitalNavigator")}
          />
          
          <Drawer.Item
            label='Clientes'
            icon={"account-group"}
            active= {activeScreen==='ClientsNavigator'}
            right={() => <IconButton icon="chevron-right" style={{marginRight: -25}}/>}
            onPress={() => onChangeScreen("ClientsNavigator")}
          /> */}
        {/* <Drawer.Section title='Theme Section'>
        <Text>Here goes the theme switch</Text>
        <TouchableRipple>
        <View style={styles.preferences}>
          <Text> Tema oscuro</Text>
          <Switch
            color="#FC7C03"
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
        </View>
      </TouchableRipple> 
      </Drawer.Section> */}
        <Drawer.Section showDivider={false}>
          {/* <Text>Here goes profile nav element + logout button </Text> */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ProfileNavigator")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
              borderRadius: 18,
              height: 55,
              overflow: "hidden",
              backgroundColor:
                props.state.routes[props.state.index].name ===
                "ProfileNavigator"
                  ? "#E96844B9"
                  : colors.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <Avatar.Image
                  size={45}
                  source={
                    user?.avatar?.thumbnail
                      ? { uri: user?.avatar?.thumbnail }
                      : require("../../../assets/images/user.jpeg")
                  }
                  style={{ backgroundColor: colors.lightLogoOrange }}
                />
              </View>

              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 10,
                  marginRight: 5,
                  paddingRight: 20,
                  width: "75%",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {user?.username}
                </Text>
                <Text
                  style={{ fontSize: 14, color: "#393939" }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {user?.email}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* <Drawer.Item
          label={user?.username! || "Anónimo"}
          icon={() => (
            <Avatar.Image
              source={
                { uri: user?.avatar?.thumbnail } ||
                require("../../../assets/images/user.jpeg")
              }
              size={40}
            />
          )}
        /> */}
          {/* <DrawerItem 
        label={
          ()=><View>

          </View>
        } */}
          {/* /> */}
        </Drawer.Section>
      </DrawerContentScrollView>
      <DrawerItemComponent
        label="Cerrar sesión"
        startIcon={"sign-out-alt"}
        onPress={() => {}}
        trailingIcon={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
