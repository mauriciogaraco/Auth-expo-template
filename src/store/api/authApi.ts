//import crashlytics from "@react-native-firebase/crashlytics";
import { api } from "./api";
import { closeSession, setSessionTokens } from "../slices/systemSlice";
import { Image} from '../../services/Interfaces';
import {
  AuthToken,User,
} from "../../services/Interfaces";
//import crashlytics from "@react-native-firebase/crashlytics";
import {
  LoginArgs,  
} from "../intefaces";

interface LoadInitialData {
  User : User
}


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
              const tokens = authToken.data as AuthToken;
              dispatch(setSessionTokens(tokens));
             
              return { data: true };
              
            }
            return { error: authToken.error };
          } catch (error) {
             console.log(error);
             console.log('error while loggin user')
//crashlytics().log("Something failed while logging in the user");
          //  crashlytics().recordError(error as any);

   return { error: error };
          }
        },
        invalidatesTags: (result) => (result ? ["UNAUTHORIZED"] : []),
      }),

        
      register: build.mutation<boolean, LoginArgs>({
        async queryFn(arg, { dispatch }, extraOptions, baseQuery) {
          try {
            const authToken = await baseQuery({
              url:   "/user/register",
              method: "POST",
              data: arg,
            });
            
            if (authToken.data) {
              
              
              return { data: false };
             
            }
            return { error: authToken.error };
          } catch (error) {
            
          //  crashlytics().log("Something failed while register  the user");
         //   crashlytics().recordError(error as any);


   return { error: error };
          }
        },
        invalidatesTags: (result) => (result ? ["UNAUTHORIZED"] : []),
      }),
      
      logOut: build.mutation<null, void>({
        async queryFn(arg, { dispatch }, extraOptions, baseQuery) {
          try {
            const authToken = await baseQuery({
              url: "/user/logout",
              data: {},
              method: "POST",
            });
            dispatch(closeSession());
            return { error: authToken.error };
          } catch (error) {
            dispatch(closeSession());
          //  crashlytics().log("Something failed while logout  the user");
          //  crashlytics().recordError(error as any);
            
            return { error: error };
          }
        },
        invalidatesTags: (result) => (result ? ["UNAUTHORIZED"] : []),
      }),
     logout: build.mutation<null, void>({
        query: () => ({
          url: "/user/logout",
          data: {},
          method: "POST",
        }),
        invalidatesTags: ["Session"],
      }),
      changeBusiness: build.mutation<null, void>({
        queryFn: () => ({ data: null })
       
      }) ,
   
      getMyUser: build.query<User,void>({
        query: () => ({
          url: `/user/myuser`,
          method: "GET",
        }),
        providesTags: ["User"],
      }),
 
      refreshToken: build.mutation({
        query: (token) => ({
          url: `/user/refreshToken`,
          data: { refresh_token: token },
          method: "POST",
        
        }),
        
        invalidatesTags: ["Session"],
        
      }),
      loadInitialData: build.query<LoadInitialData, void>({
        //@ts-ignore
        async queryFn(arg, api, extraOptions, baseQuery) {
          return await Promise.all([
            baseQuery({
              url: `/user/myuser`,
              method: "GET",
            }),
          ])
            .then((res) => {
              return {
                data: {
                  user: res[0]?.data as User,
                },
              };
            })
            .catch((err) => ({ error: err }));
          
        },
        providesTags: ["Session"],
      }),
     
    /*   uploadImage: build.mutation<Array<Image>, any>({
        query: (data) => ({
          url: `/file/user`,
          data: data,
          method: "POST",
        }),
        invalidatesTags: ["User"],
      }),*/
    
    };
  },
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useGetMyUserQuery,
  useLogoutMutation,
  useLogOutMutation,
  useRefreshTokenMutation,
 
 useLazyLoadInitialDataQuery,
  useRegisterMutation,

 // useUploadImageMutation
} = authApi;
