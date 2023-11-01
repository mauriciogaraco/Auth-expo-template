import { createSlice } from "@reduxjs/toolkit";

interface INotificationsState {
  productLimit: number;
  ventas: boolean;
  dispatches: any;
  operations: any;
}

const initialState: INotificationsState = {
  productLimit: 30,
  dispatches: true,
  operations: true,
  ventas: true,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
});

export const {} = notificationsSlice.actions;

export default notificationsSlice.reducer;
