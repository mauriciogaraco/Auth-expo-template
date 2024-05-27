import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from "react-native";
import { useCallback, useRef, useMemo } from "react";
import { palette } from "../../theme/colors";
import Layout from "../../utils/Layout";

import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  ImagePickerResponse,
  launchImageLibrary,
  launchCamera,
} from "react-native-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActivityIndicator, IconButton } from "react-native-paper";
import AvatarComponent from "../atoms/AvatarComponent";
import { useFormContext } from "react-hook-form";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import PhotoBottomSheet from "../atoms/PhotoBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useUploadImageMutation } from "../../store/api/mediaApi";


const width = Layout.window.width;

export default function UpdateAvatarComponent() {
  const { setValue, watch } = useFormContext();
  const avatar = watch("avatar");
  const [uploadImg, { isLoading }] = useUploadImageMutation();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.present();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const getImage = useCallback(async ({ assets }: ImagePickerResponse) => {
    if (assets) {
      const file = assets[0];
      if (file) {
        const acceptedType = ["png", "jpg", "jpeg"].includes(
          file.type?.split("/")[1] || ""
        );
        const onSize = (file.fileSize || 0) <= 200000;
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
              setValue(
                "avatar",
                {
                  id: res[0].id,
                  thumbnail: res[0].thumbnail,
                },
                { shouldDirty: true }
              );
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

  return (
    <>
      <TouchableHighlight
        style={stylesUpateAvatar.button}
        underlayColor={"#EFEFEF"}
        onPress={() => handleSnapPress(0)}
        disabled={isLoading}
      >
        <>
        <Text
              style={{
                fontSize: 70,
                color: "#fff",
                textAlign: "center",
                justifyContent: "center",
                fontFamily: "Poppins-Medium",
              }}
            >
              {"Enameil".charAt(0).toUpperCase()}
            </Text> 
          {isLoading ? (
            <View style={stylesUpateAvatar.loading}>
              <ActivityIndicator color={palette.icons} />
            </View>
          ) : null}
          <IconButton
            icon="camera"
            iconColor={palette.white}
            size={20}
            containerColor={palette.primary}
            onPress={() => handleSnapPress(0)}
            disabled={isLoading}
            style={{
              position: "absolute",
              left: 60,
              right: 0,
              top: 65,
              bottom: 0,
            }}
          />
        </>
      </TouchableHighlight>
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

export const stylesUpateAvatar = StyleSheet.create({
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
    borderRadius: 100,
    justifyContent: "center",
    backgroundColor: "#FFFFFF99",
  },
  button: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 0.2,
    borderColor: palette.icons,
    // elevation: 2,
    backgroundColor: "transparent",
    // margin: 6.5,
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
