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
} from "react-native";
import FocusAwareStatusBar from "../components/atoms/FocusAwareStatusBar";
import { StackScreenProps } from "@react-navigation/stack";
import { MyCard, stylesCard } from "../components/utils/MyCard";
import { stylesRegister } from "./LoginScreen";
import { NavigationProp } from "@react-navigation/native";
import { useAppSelector } from "../store/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../store/slices/systemSlice";
import { useGetAllTicketsQuery } from "../store/api/authApi";
import { Ticket } from "../services/Interfaces";

type ProtectedScreenProps = {
  navigation: NavigationProp<any>;
};

export const ProtectedScreen = ({ navigation }: ProtectedScreenProps) => {
  const { data: ticket, isLoading } = useGetAllTicketsQuery();

  console.log(ticket);

  const handleProfilePress = () => {
    navigation.navigate("PerfilScreen");
  };
  const handleNotifPress = () => {
    navigation.navigate("NotificationScreen");
  };
  const handleDetallesfPress = () => {
    navigation.navigate("DetallesCardScreen");
  };
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  const onPress = () => {
    console.log(`este es el token ${token}`);
    console.log(`este es el user ${user}`);
  };

  const renderItem = ({ item }: { item: Ticket }) => {
    return (
      <View
        style={{
          /* backgroundColor: "#6e3b6e"*/ backgroundColor: "#104c7e",
          width: 400,
          height: 400,
        }}
      >
        <Text>Title: {item.title}</Text>
        <Text>name: {item.username}</Text>
        <View style={{ backgroundColor: "#2b2b5e", width: 200, height: 200 }}>
          <Text>Category: {item.category}</Text>
          <Text>description: {item.description}</Text>
        </View>
      </View>
    );
  };
  if (isLoading) {
    return <Text>isloading</Text>;
  }
  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor="#ffffff"
        translucent={false}
      />
      <ScrollView
        style={stylesRegister.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Pressable style={styles.btnPerfil} onPress={handleProfilePress}>
            <Image
              source={require("../assets/Screenshot_2023-07-15-10-32-16-115_com.facebook.lite.jpg")}
              style={styles.perfil}
            />
          </Pressable>
          <View style={styles.nombreContaine}>
            <Text style={styles.bienvenido}>¡Bienvenido!!!</Text>
            <Text style={styles.userName}>Nombre: {user?.email}</Text>
          </View>
          <View>
            <Pressable onPress={onPress} style={styles.btnNotif}>
              <Image
                source={require("../assets/icons8-bell-100.png")}
                style={{ width: 20, height: 20 }}
              />
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={styles.misTarjetas}>Mis tarjetas</Text>
        </View>
        <FlatList
          data={ticket?.items}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          // extraData={selectedId}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
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
});
