import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { palette } from "../../theme/colors";
import { useLogoutMutation } from "../../store/api/authApi";
import RenderItemNavList from "../../components/atoms/RenderItemNavList";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  closeTokens,
  selectCurrentUser,
} from "../../store/slices/sessionSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { ProfileParamList } from "../../routes/types";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { stylesRegister } from "../home/NotificationScreen";
import { HomeBaner } from "../../components/atoms/support/HomeBaner";
import { Ionicons } from "@expo/vector-icons";
import Ticket from "../../components/atoms/support/Ticket";
import { useGetTicketsQuery } from "../../store/api/productsApi";

interface Props extends StackScreenProps<ProfileParamList, "ProfileScreen"> {}

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

export const ProfileScreen = ({ navigation }: Props) => {
  const { data: tickets, refetch, isFetching } = useGetTicketsQuery();
  const [load, setload] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  /* useEffect(() => {
    if (!load) {
      onRefresh();
      setload(true);
    }
  }, []);*/

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={palette.primary}
        translucent={false}
      />

      <HomeBaner isProfile={true} />

      <Text
        style={{
          fontFamily: "Poppins-Medium",
          color: palette.primary,
          fontSize: 24,
          marginTop: 60,
          marginHorizontal: 20,
        }}
      >
        Mis Tickets
      </Text>
      <View
        style={{ paddingBottom: heigth * 0.56, paddingVertical: heigth * 0.02 }}
      >
        <FlatList
          data={tickets?.items}
          renderItem={({ item }) => (
            <Ticket
              status={item.status}
              category={item.category}
              title={item.title}
              onView={() =>
                navigation.navigate("ViewTicket", {
                  category: item.category,
                  description: item.description,
                  email: item.email,
                  titleScreen: "Detalles del Ticket",
                  titleTicket: item.title,
                })
              }
              onEdit={() =>
                navigation.navigate("EditTickets", {
                  category: item.category,
                  description: item.description,
                  email: item.email,
                  id: item._id,
                  titleScreen: "Editar Ticket",
                  titleTicket: item.title,
                })
              }
            />
          )}
          keyExtractor={(item) => item._id}
          // horizontal={true}

          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
        />
      </View>
      {/* <Ticket
          status="COMPLETED"
          category="Diseño de paginas web"
          title="ticket test 2"
        />
        <Ticket
          status="UNCOMPLETED"
          category="Diseño de paginas web"
          title="ticket test 1"
        /> */}
      {/* <View
          style={{
            justifyContent: "flex-end",
            bottom: 0,
            // position: "absolute",
          }}
        >
          <RenderItemNavList
            text="Cerrar Sesión"
            onPress={() => Dispatch(closeTokens)}
            icon={"sign-out-alt"}
          />
        </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "500",
    marginLeft: 30,
    marginVertical: 5,
  },
  avatarContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  avatar: {
    height: 100,
    backgroundColor: palette.primary,
    borderRadius: 100,
    width: 100,
    alignSelf: "center",
  },
  username: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  subTitle: {
    // marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: palette.icons,
  },
  ticket: {
    flexDirection: "row",
    width: 200,
    height: 100,
  },
  greenHalf: {
    width: 100,
    height: 100,
    backgroundColor: "green",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  whiteHalf: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
/*



*/
