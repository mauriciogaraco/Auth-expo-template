import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AxiosError, AxiosResponse } from "axios";
import * as Application from "expo-application";
import { Platform } from "react-native";
import semver from "semver";

//Firebase

import APIServer from "../services/APIServer";
import { PublicConfigs, AuthToken } from "../services/Interfaces";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeSession } from "../store/slices/systemSlice";

export const useInitialLoad = () => {
  const [error, setError] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const state = useAppSelector((state) => state.system.sessiontoken?.token);
  const dispatch = useAppDispatch();
  const [needUpdate, setNeedUpdate] = useState(false);
  const [storeUrl, setStoreUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("Iniciando aplicación...");
  const [isInMaintenance, setIsInMaintenance] = useState<boolean>(false);
  const [isInAppUpdate, setIsInAppUpdate] = useState(false);

  const loadHandler = async () => {
    setIsLoading(true);
    setError(false);
    try {
      //Load internationalization
      // i18n.translations = {
      //     en: englishLanguage,
      //     es: spanishLanguage,
      // };
      // i18n.locale = Localization.locale;
      // i18n.fallbacks = true;

      // Load fonts
      await Font.loadAsync({
        ...Ionicons.font,
        "poppins-300": require("../../assets/fonts/Poppins-Light.ttf"),
        "poppins-medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "poppins-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
        "sf-300": require("../../assets/fonts/SFProDisplay-Light-1.ttf"),
        "sf-medium": require("../../assets/fonts/SFProDisplay-Medium-1.ttf"),
        "sf-bold": require("../../assets/fonts/SFProDisplay-Heavy-1.ttf"),
      });

      //System Configurations
      let notContinue = false;

      setMessage("Cargando configuraciones...");
      let localConfigs: Array<PublicConfigs>;
      await APIServer.get(`/public/configs`)
        .then((resp: AxiosResponse) => {
          localConfigs = resp.data;
        })
        .catch((error) => {
          setError(
            `Opps... ha ocurrido un error. Por favor, vuelva a intentarlo y si el problema persiste contáctenos.`
          );
         // crashlytics().log("Loading app configurations");
        //  crashlytics().recordError(error);
          setIsLoading(false);
          notContinue = true;
        });

      if (notContinue) return;

      //Checking Maintenance
      const is_in_maitenance =
        localConfigs!.find((item) => item.key === "is_maintenance_management")
          ?.value === "true";

      if (is_in_maitenance) {
        setIsInMaintenance(true);
        setIsLoading(false);
        notContinue = true;
      }

      if (notContinue) return;

      //Checking latest version
      const nativeVersion = Application.nativeApplicationVersion;

      if (Platform.OS === "android" && Platform.Version >= 21) {
        setIsInAppUpdate(true);
      }

      let min_version;
      let store;
      if (Platform.OS === "android") {
        min_version = localConfigs!.find(
          (item) => item.key === "management_min_version_android"
        )?.value;
        store = localConfigs!.find(
          (item) => item.key === "management_url_google_play"
        )?.value;
      } else {
        min_version = localConfigs!.find(
          (item) => item.key === "management_min_version_ios"
        )?.value;
        store = localConfigs!.find(
          (item) => item.key === "management_url_app_store"
        )?.value;
      }

      if (min_version && nativeVersion) {
        if (semver.gt(min_version, nativeVersion)) {
          setNeedUpdate(true);
          setStoreUrl(store ?? "");
          setIsLoading(false);
          return;
        }
      }

     

      //Checking user credentials
      setMessage("Comprobando credenciales de acceso...");
      //FIXME: Reset all store data when token refresh fails
      try {
        const session = state;
        // console.log("session", session);
        if (session !== null) {
         
                // console.log("error", JSON.stringify(error));
                // console.log("error", error.cause);
                setError(
                  "Upps.. No hemos podido verificar sus credenciales de acceso."
                );
              }
          
        
      } catch (error: any) {
        dispatch(closeSession());
      //  crashlytics().log("While checking access credentials");
     //   crashlytics().recordError(error);
      }
    } catch (error: any) {
   //   crashlytics().log("While loading app configurations");
   //   crashlytics().recordError(error);
      setError("Opps.. Sorry, something has broken. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHandler();
  }, []);

  return {
    isLoading,
    error,

    needUpdate,
    storeUrl,
    loadHandler,
    isInMaintenance,
    isInAppUpdate,
  };
};
