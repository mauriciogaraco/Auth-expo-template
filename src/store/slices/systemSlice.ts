import { createAction, createSlice } from "@reduxjs/toolkit";
import { AuthToken } from "../../services/Interfaces";
import { authApi } from "../api/authApi";
import { RootState } from "../root";

export interface User {
  name: string,
        email: string
        role: "ADMIN_ROLE" | "USER_ROLE",
        state: boolean,
        google: boolean,
        uid: string
}

interface InitialState {
sessiontoken:any,
currentUser: User | null, 
  token: string | null
}

const initialState: InitialState = {
 
  sessiontoken: null,
currentUser: null,
  token: null,
};

export const closeSession = createAction("closeSession");


const slice = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    setSessionTokens: (state, action) => {
     
      state.sessiontoken = action.payload.sessiontoken;
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(closeSession, () => initialState)
     
    .addMatcher(
     authApi.endpoints.login.matchFulfilled,
       (state, { payload }: any) => {
        state.sessiontoken = payload;
       
      }
    );
  },
});

export const selectCurrentUser = (state: RootState) => state.system.currentUser;

export const selectCurrentToken = (state:RootState) => state.system.token
export const { setSessionTokens } = slice.actions;

export default slice.reducer;
/*import { createAction, createSlice } from "@reduxjs/toolkit";
import { AuthToken, User } from "../../services/Interfaces";
import { authApi } from "../api/authApi";
import { RootState } from "../root";

interface InitialState {
  token: string | null;
  currentUser: User | null
}

const initialState: InitialState = {
  token: null,
  currentUser :null
};

export const closeSession = createAction("closeSession");


const slice = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    setSessionTokens: (state, { payload }) => {
      state.token = payload;
      state.currentUser= payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(closeSession, () => initialState)
      
    .addMatcher(
     authApi.endpoints.login.matchFulfilled,
       (state: { token: any, currentUser:any}, { payload }: any) => {
        state.token = payload;
        state.currentUser = payload;
        console.log(`this is the user ${state.currentUser}, this is the token${state.currentUser}`)
      }
    );
  },
});

export const { setSessionTokens } = slice.actions;
export const selectCurrentUser = (state: RootState) => state.system.currentUser;

export const selectCurrentToken = (state:RootState) => state.system.token;



export default slice.reducer;
*/