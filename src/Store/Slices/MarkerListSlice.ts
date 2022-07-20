import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MarkerItem } from "Types/MarkerItem";
import { getMarkerItemKey } from "Utils/helpers";

export interface MarkerListState {
  markerList: { [key: string]: MarkerItem };
}

const initialState: MarkerListState = {
  markerList: {},
};

export const markerListSlice = createSlice({
  name: "markerList",
  initialState,
  reducers: {
    addMarker: (state: MarkerListState, action: PayloadAction<MarkerItem>) => {
      const key = getMarkerItemKey(action.payload);

      state.markerList[key] = action.payload;
    },
    removeMarker: (state: MarkerListState, action: PayloadAction<MarkerItem>) => {
      const key = getMarkerItemKey(action.payload);

      delete state.markerList[key];
    },
    editMarker: (
      state: MarkerListState,
      action: PayloadAction<{ previous: MarkerItem; updated: MarkerItem }>
    ) => {
      const previousKey = getMarkerItemKey(action.payload.previous);
      const updatedKey = getMarkerItemKey(action.payload.updated);

      delete state.markerList[previousKey];
      state.markerList[updatedKey] = action.payload.updated;
    },
  },
});

export const { addMarker, removeMarker, editMarker } = markerListSlice.actions;

export default markerListSlice.reducer;
