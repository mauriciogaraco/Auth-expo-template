import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import systemSlice from "./slices/systemSlice";
//import economicCyclesSlice from "./slices/economicCyclesSlice";
//import areaSlice from "./slices/areaSlice";
import sessionSlice from "./slices/sessionSlice";
//import operationFormSlice from "./slices/operationFormSlice";
import { authApi } from "./api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
// import { areasApi } from "./api/areasApi";
//import businessSlice from "./slices/businessSlice";

// import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { api } from "./api/api";
//import orderFilterSlice from "./slices/orderFilterSlice";
//import productFormSlice from "./slices/productFormSlice";
//import productsSlice from "./slices/productsSlice";
import { mediaApi } from "./api/mediaApi";
import { configReducer } from "./slices/configSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // stateReconciler: autoMergeLevel1,
  whitelist: ["system", "session", "config"],
};

const rootReducer = combineReducers({
  system: systemSlice,
 // economicCycles: economicCyclesSlice,
 // products: productsSlice,
  //area: areaSlice,
  session: sessionSlice,
  //business: businessSlice,
 // opForm: operationFormSlice,
  //orderFilter: orderFilterSlice,
  //productForm: productFormSlice,
  config: configReducer,
  
  [api.reducerPath]: api.reducer,
  [mediaApi.reducerPath]: mediaApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([api.middleware, mediaApi.middleware]),
});


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
