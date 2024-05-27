import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { StackScreenProps } from "@react-navigation/stack";

import { stylesRegister } from "../auth/LoginScreen";
import { NavigationProp } from "@react-navigation/native";
import { useAppSelector } from "../../store/hooks";

import { Ticket } from "../../services/Interfaces";
import { useGetMyUserQuery } from "../../store/api/authApi";
import { store } from "../../store/root";
import { HomeParamList } from "../../routes/types";
import { palette } from "../../theme/colors";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { HomeBaner } from "../../components/atoms/support/HomeBaner";
import { Skeleton } from "moti/skeleton";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props extends StackScreenProps<HomeParamList, "HomeScreen"> {}

export const HomeScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  // const { data: ticket, isLoading } = useGetAllTicketsQuery();

  //const { data: user, isLoading, status, error } = useGetMyUserQuery();

  {
    /* const renderItem = ({ item }: { item: Ticket }) => {
    return (
      <View
        style={{
           backgroundColor: "#104c7e",
          width: 400,
          height: 400,
        }}
      >
        <Text>Title: {item.title}</Text>
        <Text>name: {item.username}</Text>
        <View style={{ backgroundColor: "#2b2b5e", width: 200, height: 200 }}>
          <Text>Category: {item.category}</Text>
          <Text>description: {item.description}</Text>
          <Text>email: {item.email}</Text>
        </View>
      </View>
    );
  };*/
  }

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={stylesRegister.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <HomeBaner isHome={true} />
        <View
          style={{
            marginTop: heigth * 0.15,
            borderTopRightRadius: 60,
            borderTopLeftRadius: 60,
            backgroundColor: "#fff",
            borderTopWidth: 2,
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 16.0,
            elevation: 24,
            shadowOffset: { width: 12, height: 12 },
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: "Poppins-Medium",
                marginTop: 20,
              }}
            >
              {/* @ts-ignore */}
              Hello {""}
              {"  "}
              <MaterialCommunityIcons
                name="hand-wave"
                color={"#f6cb56"}
                size={20}
              />
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                textAlign: "left",
                marginLeft: 20,
                fontSize: 20,
                marginVertical: 10,
              }}
            >
              Text your doubts
            </Text>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              //    theme={{ colors: { primary: "#fff", secondary: "#fff", } }}
              style={{
                backgroundColor: "#c1c7dd",
                width: width * 0.9,
                alignSelf: "center",
              }}
            />
          </View>
          <Skeleton />
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              margin: 10,
              fontSize: 20,
              marginTop: 30,
            }}
          >
            Popular services
          </Text>
          <View style={styles.container}>
            <View style={{}}>
              <Image
                source={require("../../../assets/images/icons/diseno-grafico.png")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  borderColor: palette.primary,
                  borderWidth: 1.5,
                  marginBottom: 6,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Web
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Desing
              </Text>
            </View>
            <View style={{}}>
              <Image
                source={require("../../../assets/images/icons/megafono.png")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  borderColor: palette.primary,
                  borderWidth: 1.5,
                  marginBottom: 6,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Marketing &
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Publicity
              </Text>
            </View>
            <View>
              <Image
                source={require("../../../assets/images/icons/desarrollo-movil.png")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  borderColor: palette.primary,
                  borderWidth: 1.5,
                  marginBottom: 6,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Sotfware
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Development
              </Text>
            </View>
            <View>
              <Image
                source={require("../../../assets/images/icons/grafico-empresarial.png")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  marginBottom: 6,
                  borderColor: palette.primary,
                  borderWidth: 1.5,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Company
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 12,
                }}
              >
                Creation
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Medium",
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              What do you what to do ?
            </Text>
            <View
              style={{ justifyContent: "space-around", flexDirection: "row" }}
            >
              <View style={styles.card}>
                <AntDesign name="customerservice" size={24} />
                <Text>All Services</Text>
              </View>
              <View style={styles.card}>
                <AntDesign name="profile" size={24} />
                <Text>My Tickets</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    backgroundColor: palette.white,
    borderRadius: 20,
    elevation: 5, // Elevación para Android
    shadowColor: "#1f09ea", // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio
    padding: 10,
  },
  btnNotif: {
    backgroundColor: "#023E88",
    padding: 10,
    borderRadius: 100,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    shadowColor: "#023E88",
    shadowOpacity: 0.25,
    shadowRadius: 16.0,
    elevation: 24,
    shadowOffset: { width: 12, height: 12 },
  },
  btnPerfil: {
    padding: 10,
    borderRadius: 100,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 16.0,
    elevation: 24,
    shadowOffset: { width: 12, height: 12 },
  },
  perfil: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  nombreContaine: {
    flexDirection: "column",
    position: "absolute",
    left: 65,
  },
  bienvenido: {
    color: "#c1cccc",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  misTarjetas: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    top: 30,
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,

    height: 90,
    width: width * 0.3,

    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
