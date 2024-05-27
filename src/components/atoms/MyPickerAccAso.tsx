import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  //   TextInput,
  ViewStyle,
  StyleProp,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";

import {
  ActivityIndicator,
  Button,
  RadioButton,
  Searchbar,
  TextInput,
} from "react-native-paper";

import { globals } from "../../theme/styles/global";
import Layout from "../../utils/Layout";
import {  palette } from "../../theme/colors";
import { ThemeContext } from "../../Context/theme/ThemeContext";
import { MyCard } from "./MyCard";
import { MyAccountRequest } from "./MyAccountRequest";
import { useGetAccountQuery } from "../../store/api/cardApi";
import { mask } from "react-native-mask-text";
import { FlatListAccount } from "./home/FlatListAccount";
import { PlaceHolderCard } from "./PlaceHolderCard";

const width = Layout.window.width
export interface PickerItem {
  label: string;
  value: string;
  amount: number | string;
  address: string
  issueEntity:{id:string | number,name: string , 
    profileImage: {
   id: number,
   url: string,
   hash: string
}} 
}

export interface MyPickerProps {
  label: string;
  data: any;
  value: any;
  onChangeValue: Function;
 
  icon?: any;
  isLoading?: boolean;
  isSearchable?: boolean;
  size?: "large" | "small";
  error?: any;
  refChild?: any;
  titleInModal?: string;
  notFoundText?: string

  actionAtSelected?: Function;
  disabled?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
}

export const MyPickerAccAso = ({
  icon,
  label,
  data,
  value,
  onChangeValue,
  isLoading,
  isSearchable = true,
  error,
  refChild,
  actionAtSelected,
  disabled,
  titleInModal,
  inputStyle,
  notFoundText
}: MyPickerProps) => {
  const { data: account} = useGetAccountQuery();
  const { theme } = useContext(ThemeContext);

  //Modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //Search bar




  //Content
  const [dataStore, setDataStore] = useState([]);
  useEffect(() => {
    setDataStore(data);
  }, [data]);

  const { data: acountData,refetch,isFetching,isError} = useGetAccountQuery();
  const [load, setload] = useState<boolean>(false)
  const onRefresh = useCallback(() => {
      refetch();
    }, [refetch]);

  const onCheckedValue = (itemValue: string) => {
    onChangeValue(itemValue);
    hideModal();
  };

  const renderItem = ({ item }: { item: PickerItem }) => (


     <Pressable  onPress={() => {
      onCheckedValue(item.value);
      actionAtSelected && actionAtSelected();
    }}> 
    <View
      style={{
        flexDirection: "row",
        marginHorizontal:-10
      }}
    >
    
            <MyCard 
            address={mask(item.address,"9999 9999 ****")}
          logo={item.issueEntity.profileImage ? item.issueEntity.profileImage.url : '../../../assets/images/genericImage.jpg'}
         // logo={ item.issueEntity.profileImage === null  ? '../../../assets/images/genericImage.jpg': item.issueEntity.profileImage.url}
          // logo={`https://apidevpay.tecopos.com${item.issueEntity.profileImage.url}`}
           //  hash={item.issueEntity.profileImage.hash}
            
             amount={item.amount}
            
           
             onPress={() => {
              
              onCheckedValue(item.value);
              actionAtSelected && actionAtSelected();
            }}
            />
          
        
        
    </View>
   </Pressable> 
  );

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        {/* Visual component */}
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.6}
          onPress={disabled ? () => {} : showModal}
          style={{ width: "100%", alignItems: "center" }}
        >
          {/* <View
            style={[
              visible
                ? { borderColor: theme.colors.primary }
                : { borderColor: colors.grey },
              styles.input,
              inputStyle,
            ]}
          > */}
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 16,
              marginVertical: 6.9,
            }}
          >
            {icon && (
              <Ionicons
                name={icon}
                size={23}
                style={[
                  {
                    marginEnd: 5,
                  },
                  disabled && { opacity: 0.4 },
                ]}
              />
            )} */}
          <TextInput
            placeholder={label}
            outlineStyle={{
              borderRadius: 10,
              backgroundColor: palette.white,
              height:50,
            }}
            placeholderTextColor={palette.icons}
            mode="outlined"
            outlineColor={palette.icons}
            activeOutlineColor={palette.primary}
            contentStyle={{ fontWeight: "600", fontSize: 15 }}
            autoCapitalize="none"
            style={{
              
                width: 280,
                height: 50,
                backgroundColor: palette.white,
                borderColor: palette.icons,
                // borderRadius: 100,
                // paddingLeft: 20,
               marginBottom:10,
                marginVertical: 5,
           
            }}
            value={
              (value &&
                data?.find((item: any) => item.value === value)?.label) ?? {
                label,
              }
            }
            onFocus={showModal}
            onBlur={hideModal}
            editable={false}
            ref={refChild}
            
            right={
              <TextInput.Icon
                onPress={disabled ? () => {} : showModal}
                color={palette.primary}
                rippleColor={palette.white}
                icon={() =>
                  isLoading ? (
                    <ActivityIndicator color={palette.icons} />
                  ) : (
                    <Ionicons
                      name="chevron-down-outline"
                      size={23}
                      style={[disabled && { opacity: 0.4 }]}
                      color={'#c1c1c1'}
                    />
                  )
                }
              />
            }
            left={
              <TextInput.Icon
                onPress={disabled ? () => {} : showModal}
                color={palette.primary}
                rippleColor={palette.white}
                icon={() =>
                  isLoading ? (
                    <ActivityIndicator color={palette.icons} />
                  ) : (
                    <Ionicons
                      name={label==='Selecciona negocio'?   "location-sharp":"card-outline"}
                      size={23}
                      style={[disabled && { opacity: 0.4 }]}
                      color={'#c1c1c1'}
                    />
                  )
                }
              />
            }
          />
          {/* {error && (
              <Ionicons
                name="alert-circle-outline"
                size={23}
                // color={theme.error}
              />
            )}
            <Ionicons
              name="chevron-down-outline"
              size={23}
              style={[disabled && { opacity: 0.4 }]}
              color={palette.circularProgressBar}
            />
          </View> */}
          {/* </View> */}
        </TouchableOpacity>
        {!!error && (
          <Text
            style={[
              {
                // color: theme.error,
                marginStart: 5,
                alignSelf: "flex-start",
              },
            ]}
          >
            {error}
          </Text>
        )}

        {/* TODO: Pending to do */}
        {/* {isLoading && <ActivityIndicator />} */}

        {/* Modal component */}
        <Modal
          visible={visible}
          onDismiss={hideModal}
          onRequestClose={hideModal}
          transparent={true}
        >
       {/*   <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
            }}
          >
            <View
              style={{
               
                // paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: "white",
                height: Layout.window.height * 0.75,
                width: Layout.window.width * 0.9,
                
              }}
            >
            <View style={{
                width: Layout.window.width * 0.9,
                height:50,
                backgroundColor: palette.primary,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }
          }>
            <View style={{justifyContent:'space-between',flexDirection:'row',  marginTop:6}}>
              <Text style={{color:'white',
              justifyContent:'center',
              textAlign:'center',
               margin:6,
               marginLeft:14,
               fontSize:20,
                fontFamily:'Poppins-Medium'}}>Cuentas</Text>
               <Button
               rippleColor={palette.primary}
               onPress={hideModal}>
                <Text><Fontisto name="close" size={20} color={'#fff'}/></Text>
                </Button> 
            </View>

            </View>  
              <View style={{padding:10}}>
           
              <Text style={{fontFamily:'Poppins-Medium',
               fontSize:14}}>Seleccione la cuenta que desea asociar al la solicitud de la tarjeta :</Text>

              

         
              {!data ? (
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10
                    }}
                  >
                    <Text style={styles.title}>
                      {notFoundText || ''}
                    </Text>
                  </View>
                </View>
              ) 
              : (
                <View style={{ }}>
                 
                  <FlatList
                    data={dataStore}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.value}
                  />
                 
                 
                </View>
              )}
            </View>
            </View> 
          </View>*/}
           <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.title}> Cuentas</Text>
              <Button
               rippleColor={palette.primary}
               onPress={hideModal}>
                <Text><Fontisto name="close" size={20} color={'#fff'}/></Text>
                </Button>
            </View>
           {/* <Text style={styles.selectAccountText}></Text>*/}
           <Text style={{fontFamily:'Poppins-Medium',
               fontSize:14}}>Seleccione la cuenta que desea asociar a la solicitud de la tarjeta :</Text>
            <FlatList
              data={data}
              renderItem={renderItem}
             // keyExtractor={item => item.id}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.1)",
    marginStart: 45,
    marginVertical: Platform.OS === "ios" ? 15 : 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    marginTop: 1,
  },
 /* header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },*/
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 16,
    height: Layout.window.height * 0.72,
    width: Layout.window.width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    
    alignItems: 'center',
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: palette.primary,
    height:50,
    width: Layout.window.width * 0.9,
    borderTopLeftRadius:16 ,
    borderTopRightRadius:16 
  },
  title: {
    justifyContent:'center',
              textAlign:'center',
               margin:6,
               marginLeft:14,
               fontSize:20,
    fontFamily:'Poppins-Medium',
    color:'white'
  },
  selectAccountText: {
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  address: {
    fontSize: 18,
    width: "100%",
    paddingEnd: 10,
  },
  textBackground: {
    backgroundColor: "#F3F1F3",
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
 /* title: {
    marginVertical: 16,
    fontSize: 16,
    opacity: 0.9,
    fontWeight: "bold",
    textAlign: "center",
  },*/
  input: {
    width: "100%",
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
});
