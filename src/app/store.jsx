import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import storage from "redux-persist/lib/storage/sessionActions
Settings";
//! default degeri local.session olarak degistirebiliriz
//* setItem getItem ile ugrasmadan otomatik olarak storagelara atiyor redux.(hangi storage i seçtiysen)

//? serialize hatasini gidermek için middle ware ve ilgili importlari ekledik
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
