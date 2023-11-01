import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { api_configs } from "../../config/system_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosMediaInstance } from "../../services/APIMediaServer";
import { Image } from "../../services/Interfaces";

type AxiosArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

const axiosMediaQuery: BaseQueryFn<AxiosArgs, unknown, unknown> = async ({
  url,
  method,
  data,
  params,
}) => {
  let baseUrl = api_configs.BASE_URL;
  const server = await AsyncStorage.getItem("BASE_SERVER_URL");

  if (server !== null) {
    baseUrl = server;
  }
  try {
    const result = await axiosMediaInstance({
      url: `${baseUrl}${api_configs.BASE_API_URL}${url}`,
      method: method || "GET",
      data,
      params,
    });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    return {
      error: {
        status: "400",
        data: (err.response?.data as any).message,
      },
    };
  }
};

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: axiosMediaQuery,
  endpoints: (build) => {
    return {
      uploadImage: build.mutation<Array<Image>, FormData>({
        query: (data) => ({
          url: `/files`,
          method: "POST",
          data: data,
        }),
      }),
    };
  },
  keepUnusedDataFor: 0,
});

export const { useUploadImageMutation } = mediaApi;
