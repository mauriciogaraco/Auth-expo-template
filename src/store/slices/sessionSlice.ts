import { createSlice } from "@reduxjs/toolkit";

import {  User } from "../../services/Interfaces";
import { authApi } from "../api/authApi";
import { RootState } from "../root";
import { closeSession, refreshSession } from "./systemSlice";




interface InitialState {
  user: User | undefined;
  // business: Business | undefined | null;
  isAuth: boolean;
  // plan?: string;
  // branches?: Branch[] | null;
  // currentBranch: number | null;
}



const initialState: InitialState = {
  user: undefined,
  isAuth: false,
  // plan: "",
};

const slice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(closeSession, () => initialState)
      .addCase(refreshSession, (state) => {
        state.isAuth = true;
      })
      .addMatcher(
        authApi.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
        }
      )
      .addMatcher(
        authApi.endpoints.editUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
        }
      )
     /* .addMatcher(
        authApi.endpoints.loadBusinessData.matchFulfilled,
        (state, { payload }) => {
          if (payload.user) {
            state.user = payload.user;
          }
        }
      )*/
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, {payload}) => {
          state.isAuth = payload;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, () => initialState)
      .addMatcher(authApi.endpoints.logout.matchRejected, () => initialState);
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.session.user;

export const selectCurrentAuth = (state:RootState) => state.session.isAuth;

