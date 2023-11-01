import { createAction, createSlice } from "@reduxjs/toolkit";
import { AuthToken } from "../../services/Interfaces";
import { authApi } from "../api/authApi";

interface InitialState {
  sessionTokens: AuthToken | null;
}

const initialState: InitialState = {
  sessionTokens: null,
};

export const closeSession = createAction("closeSession");
export const refreshSession = createAction<AuthToken>("refreshSession");

const slice = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    setSessionTokens: (state, { payload }) => {
      state.sessionTokens = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(closeSession, () => initialState)
      .addCase(refreshSession, (state, { payload }) => {
        state.sessionTokens = payload;
      })
    .addMatcher(
     authApi.endpoints.login.matchFulfilled,
       (state: { sessionTokens: any; }, { payload }: any) => {
        state.sessionTokens = payload;
      }
    );
  },
});

export const { setSessionTokens } = slice.actions;

export default slice.reducer;
