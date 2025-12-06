import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Correct imports — EXACT names
import { userAPI } from "../features/auth/userAPI";
import { loginAPI } from "../features/auth/LoginAPI";
import { designAPI } from "../features/cakes/designsApi";
import { adminUsersAPI } from "../features/cakes/adminUsersAPI";
import userSlice from "../features/auth/userSlice";
import { readyCakesAPI } from "../features/cakes/readycakeApi";
import { orderAPI } from "../features/cakes/ordersAPI";
//import reducer from "../features/auth/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [readyCakesAPI.reducerPath]: readyCakesAPI.reducer,
  [designAPI.reducerPath]: designAPI.reducer,
  [adminUsersAPI.reducerPath]: adminUsersAPI.reducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(userAPI.middleware)
      .concat(loginAPI.middleware)
      .concat(readyCakesAPI.middleware)
      .concat(designAPI.middleware)
      .concat(adminUsersAPI.middleware)
      .concat(orderAPI.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
