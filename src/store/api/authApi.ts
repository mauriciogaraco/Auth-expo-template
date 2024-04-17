//import crashlytics from "@react-native-firebase/crashlytics";
import { api } from "./api";
import { closeSession, setSessionTokens } from "../slices/systemSlice";
import {
 
  TicketResponse,
  User,


} from "../../services/Interfaces";
import { RootState } from "../root";
import { AuthToken } from '../../services/Interfaces';
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
              url:   "/user/login",
              method: "POST",
              data: arg,
            });
            if (authToken.data) {
             // const tokens = authToken.data as AuthToken;
             const sessiontoken = authToken.data 
              dispatch(setSessionTokens(authToken.data));
            
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
    
      getUser: build.query({
        query: () => ({
          url: `/identity/security/user`,
          method: "GET",
        }),
        providesTags: ["User"],
      }),

      getAllTickets: build.query<TicketResponse, void>({
        query: () => ({
          url: `/ticket/all`,
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
  useGetAllTicketsQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
  useEditUserMutation,
} = authApi;
