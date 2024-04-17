import axios, { AxiosResponse } from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";

import { AuthToken } from "./Interfaces";
import { api_configs } from "../config/system_config";
import { closeSession, setSessionTokens } from "../store/slices/systemSlice";

const no_authentication = ["/user/login"];

//const no_include_business = ["/administration/my-branches"];

const axiosApiInstance = axios.create();

let store: any;
export const injectStore = (_store: any) => {
  store = _store;
};

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  
  async (config: any) => {
    const session = store.getState().system.token;
    config.headers = {
      "x-token": `${session}`,
      'Content-Type': 'application/json',
    };

  //  const session = store.getState().system.sessionTokens;
    let base_url = api_configs.BASE_URL;

    const rute =
      config.url?.split(`${base_url}`)[1] ?? "";



 /*   if (session !== null && !no_authentication.includes(rute)) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${session?.token}`,
      };
    }*/

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const server = await AsyncStorage.getItem("BASE_SERVER_URL");
    let base_url = api_configs.BASE_URL;

    if (server !== null) {
      base_url = server;
    }
    const originalRequest = error.config;
    // console.log("error", JSON.stringify(error));

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const session = store.getState().system.sessionTokens;

    
    }
    return Promise.reject(error);
  }
);

const get = async (path: string): Promise<AxiosResponse<object>> => {
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");
  let base_url = api_configs.BASE_URL;

  if (server !== null) {
    base_url = server;
  }

  const request = {
    url: `${base_url}${path}`,
    method: "GET",
  };

  return axiosApiInstance.get(request.url);
};

const post = async (
  path: string,
  body: object
): Promise<AxiosResponse<object>> => {
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");
  let base_url = api_configs.BASE_URL;

  if (server !== null) {
    base_url = server;
  }

  const request = {
    url: `${base_url}${path}`,
    method: "POST",
  };

  return axiosApiInstance.post(request.url, body);
};

const put = async (
  path: string,
  body: object
): Promise<AxiosResponse<object>> => {
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");
  let base_url = api_configs.BASE_URL;

  if (server !== null) {
    base_url = server;
  }

  const request = {
    url: `${base_url}${path}`,
    method: "PUT",
  };

  return axiosApiInstance.put(request.url, body);
};

const patch = async (
  path: string,
  body: object
): Promise<AxiosResponse<object>> => {
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");
  let base_url = api_configs.BASE_URL;

  if (server !== null) {
    base_url = server;
  }

  const request = {
    url: `${base_url}${path}`,
    method: "PATCH",
  };

  return axiosApiInstance.patch(request.url, body);
};

const deleteAPI = async (
  path: string,
  body?: object
): Promise<AxiosResponse<object>> => {
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");
  let base_url = api_configs.BASE_URL;

  if (server !== null) {
    base_url = server;
  }

  const request = {
    url: `${base_url}${path}`,
    method: "DELETE",
  };

  return axiosApiInstance.delete(request.url, { data: body });
};

export default {
  get,
  post,
  put,
  patch,
  deleteAPI,
  axiosApiInstance,
};
