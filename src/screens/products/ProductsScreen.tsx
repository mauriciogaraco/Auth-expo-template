import React from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import { ProductsParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import { stylesRegister } from "../auth/LoginScreen";
import { palette, skeletonsColors } from "../../theme/colors";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { ServiceCard } from "../../components/atoms/support/ServiceCard";
import { HomeBaner } from "../../components/atoms/support/HomeBaner";
import { useGetAllProductsQuery } from "../../store/api/productsApi";
import ProductsSkeleton from "../../components/atoms/skeletons/ProductsSkeleton";
import { Skeleton } from "moti/skeleton";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props extends StackScreenProps<ProductsParamList, "ProductsScreen"> {}
export const ProductsScreen = ({ navigation }: Props) => {
  const { data, isLoading } = useGetAllProductsQuery();

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={palette.primary}
        translucent={false}
      />

      <HomeBaner isHome={false} />

      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 16,
          marginHorizontal: 10,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Your Job Is To Dream, Ours Is To Make Your Dream Come True
      </Text>
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 24,
          color: palette.primary,
          //  color: palette.primary,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Ours Services
      </Text>
      <FlatList
        style={{ marginBottom: heigth * 0.3 }}
        data={data?.items}
        renderItem={({ item }) => (
          <ServiceCard
            onPress={() =>
              navigation.navigate("ProducstDetail", {
                titleScreen: item.title,
                category: item.title,
              })
            }
            description={item.description}
            icon={item.icon}
            librery={item.librery}
            color={item.color}
            title={item.title}
          />
        )}
        //@ts-ignore
        keyExtractor={(item) => item._id}
        // horizontal={true}
        numColumns={2}
      />
      {/* <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
        
          <ServiceCard
            color="#1167c6"
            title="Creación de App"
            description="Transformamos tus ideas en aplicaciones móviles que potencien tus ideas"
            icon="code"
            librery="Octicons"
          />
        
        </View> */}
    </View>
  );
};
