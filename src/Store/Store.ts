import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { persistStore } from 'redux-persist'
import MarkerListSlice from "Store/Slices/MarkerListSlice";

const persistConfig = {
  key: "markers",
  storage,
};

const reducers = combineReducers({
  markers: MarkerListSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store)

export default store;
