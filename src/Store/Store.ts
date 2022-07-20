import { configureStore } from "@reduxjs/toolkit";
import MarkerListSlice from "Store/Slices/MarkerListSlice";

const store = configureStore({
  reducer: {
    markers: MarkerListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
