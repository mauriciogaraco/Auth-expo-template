import axios, { AxiosResponse } from "axios";
import { Platform } from "react-native";
import * as Application from "expo-application";

import { api_configs } from "../config/system_config";

const no_authentication = ["/files/"];

const axiosApiInstance = axios.create();

let store: any;
export const injectMediaStore = (_store: any) => {
  store = _store;
};

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      ...config.headers,
      Accept: "*/*",
      //"Content-Type": "multipart/form-data",
     // "X-App-Platform": [Platform.OS, Platform.Version].join(","),
    //  "X-App-Version": Application.nativeApplicationVersion ?? "",
      "X-App-Origin": "Tecopos-Tecopay",
    };

    //const activeBranchId: number = store.getState().business.currentBranch;
    const session = store.getState().system.sessionTokens;
    let base_url = api_configs.BASE_URL;

    const rute =
      config.url?.split(`${base_url}${api_configs.BASE_API_URL}`)[1] ?? "";

 /*   if (activeBranchId !== null) {
      config.headers = {
        ...config.headers,
        "X-App-BusinessId": activeBranchId,
      };
    }*/

    if (session !== null && !no_authentication.includes(rute)) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${session?.token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const post = async (
  path: string,
  body: object
): Promise<AxiosResponse<object>> => {
  const request = {
    url: `${api_configs.BASE_URL}${api_configs.BASE_API_URL}${path}`,
    method: "POST",
  };

  return axiosApiInstance.post(request.url, body);
};

export default {
  post,
};

export const axiosMediaInstance = axiosApiInstance;
