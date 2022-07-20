import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MarkerItem } from "Types/MarkerItem";
import { v4 as uuidv4 } from "uuid";

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
    addMarker: (
      state: MarkerListState,
      action: PayloadAction<Omit<MarkerItem, "id">>
    ) => {
      const id = uuidv4();

      state.markerList[id] = {
        ...action.payload,
        id,
      };
    },
    removeMarker: (
      state: MarkerListState,
      action: PayloadAction<{ id: string }>
    ) => {
      delete state.markerList[action.payload.id];
    },
    editMarker: (
      state: MarkerListState,
      {
        payload: { editId, updated },
      }: PayloadAction<{ editId: string; updated: Omit<MarkerItem, "id"> }>
    ) => {
      state.markerList[editId] = { ...updated, id: editId };
    },
    editAndDelete: (
      state: MarkerListState,
      {
        payload: { deleteId, editId, updated },
      }: PayloadAction<{
        deleteId: string;
        editId: string;
        updated: Omit<MarkerItem, "id">;
      }>
    ) => {
      delete state.markerList[deleteId];
      state.markerList[editId] = { ...updated, id: editId };
    },
  },
});

export const { addMarker, removeMarker, editMarker, editAndDelete } =
  markerListSlice.actions;

export default markerListSlice.reducer;
