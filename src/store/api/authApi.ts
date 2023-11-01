//import crashlytics from "@react-native-firebase/crashlytics";
import { api } from "./api";
import { closeSession, setSessionTokens } from "../slices/systemSlice";
import {
  Area,
  AuthToken,
  User,


} from "../../services/Interfaces";
import { RootState } from "../root";
import {
  EditUserDataInterface,
  GlobalDataInterface,
  LoginArgs,
  MeasureInterface,
} from "../intefaces";

export const authApi = api.injectEndpoints({
  endpoints(build) {
    return {
      login: build.mutation<boolean, LoginArgs>({
        async queryFn(arg, { dispatch }, extraOptions, baseQuery) {
          try {
            const authToken = await baseQuery({
              url:   "/identity/login",
              method: "POST",
              data: arg,
            });
            if (authToken.data) {
              const tokens = authToken.data as AuthToken;
              dispatch(setSessionTokens(tokens));
              return { data: true };
            }
            return { error: authToken.error };
          } catch (error) {
          //  crashlytics().log("Something failed while logging in the user");
           // crashlytics().recordError(error as any);
           console.log(error);
            return { error: error };
          }
        },
        invalidatesTags: (result) => (result ? ["UNAUTHORIZED"] : []),
      }),
      logOut: build.mutation<null, void>({
        async queryFn(arg, { dispatch }, extraOptions, baseQuery) {
          try {
            const authToken = await baseQuery({
              url: "/identity/logout",
              data: {},
              method: "POST",
            });
            dispatch(closeSession());
            return { error: authToken.error };
          } catch (error) {
            dispatch(closeSession());
          //  crashlytics().log("Something failed while logging in the user");
            //crashlytics().recordError(error as any);
            console.log(error);
            return { error: error };
          }
        },
        invalidatesTags: (result) => (result ? ["UNAUTHORIZED"] : []),
      }),
     logout: build.mutation<null, void>({
        query: () => ({
          url: "/identity/logout",
          data: {},
          method: "POST",
        }),
        invalidatesTags: ["Session"],
      }),
      changeBusiness: build.mutation<null, void>({
        queryFn: () => ({ data: null })
       
      }) ,
      /* 
      loadBusinessData: build.query<Partial<GlobalDataInterface>, void>({
        async queryFn(arg, { getState }, extraOptions, baseQuery) {
          const state = getState() as RootState;
          const branch = state.business.currentBranch;
          return await Promise.all([
            baseQuery({
              url: `/security/user`,
              method: "GET",
            }),
            baseQuery({
              url: `/administration/my-business`,
              method: "GET",
            }),
            baseQuery({
              url: `/administration/my-branches`,
              method: "GET",
            }),
            baseQuery({
              url: `/administration/area?isActive=true&all_data=true`,
              method: "GET",
            }),
            baseQuery({
              url: `/administration/productcategory`,
              method: "GET",
            }),
            baseQuery({
              url: `/administration/salescategory`,
              method: "GET",
            }),
            baseQuery({
              url: `/administration/measures`,
              method: "GET",
            }),
            baseQuery({
              url: `/sales/statusorder`,
              method: "GET",
            }),
          ])
            .then((res) => {
              if (branch) {
                return {
                  data: {
                    // user: res[0]?.data as User,
                    business: res[1]?.data as Business,
                    // branches: res[2]?.data as Branch[],
                    areas: res[3]?.data as PaginatedResponse<Area>,
                    productCategory: res[4]
                      ?.data as PaginatedResponse<ProductCategory>,
                    salesCategory: res[5]
                      ?.data as PaginatedResponse<SalesCategory>,
                    measures: res[6]?.data as Array<MeasureInterface>,
                    orderStatus: res[7]?.data as Array<any>,
                  },
                };
              } else {
                return {
                  data: {
                    user: res[0]?.data as User,
                    business: res[1]?.data as Business,
                    branches: res[2]?.data as Branch[],
                    areas: res[3]?.data as PaginatedResponse<Area>,
                    productCategory: res[4]
                      ?.data as PaginatedResponse<ProductCategory>,
                    salesCategory: res[5]
                      ?.data as PaginatedResponse<SalesCategory>,
                    measures: res[6]?.data as Array<MeasureInterface>,
                    orderStatus: res[7]?.data as Array<any>,
                  },
                };
              }
            })
            .catch((err) => ({ error: err }));
        },
        providesTags: ["Session"],
      }), */
      getUser: build.query({
        query: () => ({
          url: `/identity/security/user`,
          method: "GET",
        }),
        providesTags: ["User"],
      }),
    /*  getBusiness: build.query<Business, void>({
        query: () => ({
          url: `/administration/my-business`,
          method: "GET",
        }),
        providesTags: ["Business"],
      }),*/
     /* getBranches: build.query({
        query: () => ({
          url: `/administration/my-branches`,
          method: "GET",
        }),
        providesTags: ["Branch"],
      }),    */
      refreshToken: build.mutation({
        query: (token) => ({
          url: `/identity/refresh-token`,
          data: { refresh_token: token },
          method: "POST",
        }),
        invalidatesTags: ["Session"],
      }),
      editUser: build.mutation<User, EditUserDataInterface>({
        query: (data) => ({
          url: `/identity/security/user`,
          data: data,
          method: "PATCH",
        }),
        invalidatesTags: ["User"],
      }),
      refetchErroredQueries: build.mutation<null, void>({
        queryFn: () => ({ data: null }),
        invalidatesTags: ["UNKNOWN_ERROR"],
      }),
    };
  },
  overrideExisting: true,
});

export const {
  useLoginMutation,
  
  useLogoutMutation,
  useRefreshTokenMutation,
  useEditUserMutation,
} = authApi;
