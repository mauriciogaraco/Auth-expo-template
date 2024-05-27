import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import React from "react";
import { View, Text, Dimensions, Pressable } from "react-native";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props {
  color: string;
  title: string;
  description: string;
  icon: string;
  librery: string;
  onPress: any;
}

export const ServiceCard = ({
  color,
  title,
  description,
  icon,
  librery,
  onPress,
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: color,
          width: width * 0.44,
          height: heigth * 0.38,
          marginHorizontal: 10,
          alignItems: "center",
          marginTop: 20,
          padding: 10,

          //backgroundColor: "#fff",
          borderRadius: 10,

          shadowColor: "#000",

          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginBottom: 10,
        }}
      >
        {librery === "MConmunity" ? (
          <MaterialCommunityIcons
            //@ts-ignore
            name={`${icon}`}
            size={48}
            color={"#fff"}
          />
        ) : librery === "Octicons" ? (
          //@ts-ignore
          <Octicons name={`${icon}`} size={48} color={"#fff"} />
        ) : librery === "Entypo" ? (
          //@ts-ignore
          <Entypo name={`${icon}`} size={48} color={"#fff"} />
        ) : (
          //@ts-ignore
          <MaterialIcons name={`${icon}`} size={48} color={"#fff"} />
        )}

        <Text
          style={{
            color: "#fff",
            fontFamily: "Poppins-Medium",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: "#fff",
            fontFamily: "Poppins-Medium",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
};
