import {
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useCallback, useRef } from "react";
import Toast from "react-native-toast-message";

import { palette } from "../../../theme/colors";
import Layout from "../../../utils/Layout";
import { useUploadImageMutation } from "../../../store/api/mediaApi";
import {
  ImagePickerResponse,
  launchImageLibrary,
  launchCamera,
} from "react-native-image-picker";
import { AddImage } from "../../../theme/icons";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addImage,
  removeImage,
  selectProductImages,
} from "../../../store/slices/productFormSlice";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import PhotoBottomSheet from "../../atoms/PhotoBottomSheet";
import * as ImageManipulator from "expo-image-manipulator";

const width = Layout.window.width;

interface Props {}

//TODO: ADD BOTTOM SHEET FOR SELECTING CAMERA OR GALLERY PHOTOS
export default function UploadImageComponent({}: Props) {
  const [uploadImg, { isLoading }] = useUploadImageMutation();
  const images = useAppSelector(selectProductImages);
  const dispatch = useAppDispatch();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

  const handleSnapPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const getImage = useCallback(async ({ assets }: ImagePickerResponse) => {
    if (assets) {
      const file = assets[0];
      if (file) {
        const acceptedType = ["png", "jpg", "jpeg", "gif"].includes(
          file.type?.split("/")[1] || ""
        );
        const onSize = (file.fileSize || 0) <= 200000;
        // console.log("file", file);

        if (!acceptedType) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "La extensión del archivo no está permitida",
            position: "top",
            topOffset: 9,
          });
        } else if (!onSize) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "El tamaño máximo permitido es 200Kb",
            position: "top",
            topOffset: 9,
          });
        } else {
          // const manipResult = await ImageManipulator.manipulateAsync(
          //   file.uri!,
          //   [],
          //   { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
          // );
          // console.log("manipResult", manipResult);
          const fileData = {
            name: file?.fileName || "",
            type: file?.type || "",
            uri:
              Platform.OS === "ios" && file.uri
                ? file.uri?.replace("file://", "")
                : file.uri,
          };
          const data = new FormData();
          data.append("file", fileData as any);

          await uploadImg(data)
            .unwrap()
            .then((res) => {
              dispatch(
                addImage({ id: res[0].id, thumbnail: res[0].thumbnail })
              );
            })
            .catch((err) => {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: err?.data,
                position: "top",
                topOffset: 9,
              });
            });
        }
      }
    }
  }, []);

  const handleChoosePhoto = () => {
    handleClosePress();
    launchImageLibrary({ mediaType: "photo" }, getImage);
  };

  const handleTakePhoto = () => {
    handleClosePress();
    launchCamera(
      { mediaType: "photo", maxWidth: 1000, maxHeight: 1000, quality: 0.7 },
      getImage
    );
  };

  const handleRemoveImage = (id: number) => {
    Alert.alert("Borrar imagen", "¿Está a punto de descartar esta imagen?", [
      { text: "Cancelar", style: "cancel", onPress: () => {} },
      {
        text: "Continuar",
        style: "destructive",
        onPress: () => dispatch(removeImage(id)),
      },
    ]);
  };

  const renderItem = (item: any, index: number) => {
    return (
      <TouchableHighlight
        key={index}
        style={styles.button}
        underlayColor={"#EFEFEF"}
        onPress={() => handleRemoveImage(item.id)}
      >
        <FastImage
          style={{
            height: "100%",
            backgroundColor: palette.datesFilter,
            borderRadius: 15,
            width: "100%",
            alignSelf: "center",
          }}
          source={{
            uri: item.thumbnail,
            priority: FastImage.priority.normal,
          }}
          defaultSource={require("../../../../assets/images/default.jpeg")}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableHighlight>
    );
  };

  return (
    <>
      {/* button for images list */}
      {images.length > 0 && (
        <ScrollView>
          <View style={styles.content}>
            <TouchableHighlight
              style={styles.button}
              underlayColor={"#EFEFEF"}
              onPress={handleSnapPress}
              disabled={isLoading}
            >
              <>
                <View style={styles.buttonContainer}>
                  <AddImage height={"45%"} width={"45%"} />
                  <Text style={styles.buttonText}>PNG, JPG, GIF</Text>
                  <Text style={styles.buttonText}>m&aacute;ximo 200k</Text>
                </View>
                {isLoading && (
                  <View style={styles.loading}>
                    <ActivityIndicator color={palette.icons} />
                  </View>
                )}
              </>
            </TouchableHighlight>
            {images.map(renderItem)}
          </View>
        </ScrollView>
      )}

      {/* button for no images status */}
      {images.length === 0 && (
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "pink",
          }}
          onPress={handleSnapPress}
          disabled={isLoading}
        >
          <>
            <View style={styles.bigButtonContainer}>
              <AddImage height={100} width={100} />
              <Text style={styles.buttonText}>PNG, JPG, GIF</Text>
              <Text style={styles.buttonText}>m&aacute;ximo 200k</Text>
            </View>
            {isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator color={palette.icons} />
              </View>
            )}
          </>
        </Pressable>
      )}
      <PhotoBottomSheet
        ref={bottomSheetRef}
        // onChange={handleSheetChanges}
        onPressCamera={handleTakePhoto}
        onPressGallery={handleChoosePhoto}
        onDismiss={handleClosePress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 5,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "#FFFFFF99",
  },
  bigButtonContainer: {
    height: 150,
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: width / 2.6,
    height: width / 2.6,
    borderRadius: 15,
    elevation: 2,
    backgroundColor: "#FFF",
    margin: 6.5,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // borderWidth: 1,
    alignContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: palette.icons,
  },
  actions: {
    // width: "100%",
    flex: 1,
    flexShrink: 1,
    // backgroundColor: "lightblue",
    marginTop: 10,
    marginBottom: 5,
    // paddingHorizontal: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
