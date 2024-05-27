import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ProductsParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import { stylesRegister } from "../auth/LoginScreen";
import { palette } from "../../theme/colors";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { ServiceCard } from "../../components/atoms/support/ServiceCard";
import { HomeBaner } from "../../components/atoms/support/HomeBaner";
import {
  useGetAllProductsQuery,
  useGetAllQuestionsQuery,
} from "../../store/api/productsApi";
import { Button, Searchbar } from "react-native-paper";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Question } from "../../components/atoms/support/Question";
import { FooterQuestion } from "../../components/atoms/support/FooterQuestion";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props extends StackScreenProps<ProductsParamList, "ProducstDetail"> {}
export const ProductsDetail = ({ navigation, route }: Props) => {
  const { category } = route.params;

  const { data: questions, isLoading } = useGetAllQuestionsQuery();

  const [searchQuery, setSearchQuery] = useState("");

  const onCreateTicket = () => {
    navigation.navigate("CreateTickets", {
      titleScreen: "Crear Ticket",
      category: category,
    });
  };

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={palette.primary}
        translucent={false}
      />

      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 24,
          color: palette.primary,
          textAlign: "center",
          margin: 20,
        }}
      >
        Describe la pregunta
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
      <View style={{ marginTop: 20 }}>
        <FlatList
          style={{ marginBottom: heigth * 0.3 }}
          data={questions?.items}
          renderItem={({ item }) => (
            <Question description={item.description} title={item.title} />
          )}
          //@ts-ignore
          keyExtractor={(item) => item._id}
          ListFooterComponent={<FooterQuestion onPress={onCreateTicket} />}
        />
      </View>
    </View>
  );
};
