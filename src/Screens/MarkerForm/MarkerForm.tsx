import { Button } from "@mui/material";
import { useSmallWindow } from "Hooks/useSmallWindow";
import { useDialog } from "Providers/useDialog";
import { useMapCoordinates } from "Providers/useMapCoordinates";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addMarker,
  editMarker,
  editAndDelete,
} from "Store/Slices/MarkerListSlice";
import { RootState } from "Store/Store";
import AppRoutes from "Types/AppRoutes";
import { MarkerItem } from "Types/MarkerItem";
import { latituteValidation, longituteValidation } from "Utils/constants";
import Input from "./Input";
import { Container, Form } from "./styles";

export default function MarkerForm() {
  const [searchParams] = useSearchParams();
  const smallWindow = useSmallWindow();

  const navigate = useNavigate();
  const { setEditingMarker, setDeleteMarkId, setClickedMarker } =
    useMapCoordinates();
  const dialog = useDialog();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Omit<MarkerItem, "id">>({ mode: "onChange" });
  const dispatch = useDispatch();

  const markersList = useSelector(
    (state: RootState) => state.markers.markerList
  );

  const editItem = useMemo(
    () => markersList[searchParams.get("edit") || ""],
    [searchParams, markersList]
  );

  const resetFormWithAlert = useCallback(
    (text: string, resetItem?: Omit<MarkerItem, "id">) => {
      alert(text);
      reset(resetItem);
      setEditingMarker(undefined);
      setDeleteMarkId("");
    },
    [reset, setEditingMarker, setDeleteMarkId]
  );

  const onSubmit = useCallback(
    (item: Omit<MarkerItem, "id">) => {
      setClickedMarker(undefined);
      const duplicated = Object.values(markersList).find(
        ({ longitude, latitude }) =>
          longitude === item.longitude && latitude === item.latitude
      );
      if (duplicated) {
        dialog.show({
          title: "Marker with those coordinates already exists",
          description: `Would you like to replace it? ${
            editItem ? "(it will delete current one)" : ""
          }`,
          primaryText: "Yes",
          onPrimary: () => {
            dispatch(
              editItem
                ? editAndDelete({
                    deleteId: duplicated.id,
                    editId: editItem.id,
                    updated: item,
                  })
                : editMarker({ editId: duplicated.id, updated: item })
            );
            resetFormWithAlert("Marker replaced!", item);
          },
          secondaryText: "No",
        });
      } else if (editItem) {
        dispatch(editMarker({ editId: editItem.id, updated: item }));
        resetFormWithAlert("Marker edited!", item);
      } else {
        dispatch(addMarker(item));
        resetFormWithAlert("Marker added!");
      }
    },
    [
      editItem,
      dialog,
      markersList,
      dispatch,
      resetFormWithAlert,
      setClickedMarker,
    ]
  );

  useEffect(() => {
    if (editItem) {
      reset(editItem);
      setDeleteMarkId(editItem.id);
      setClickedMarker(editItem);
      setEditingMarker(editItem);
    }
  }, [editItem, reset, setClickedMarker, setEditingMarker, setDeleteMarkId]);

  useEffect(() => {
    if (markersList[searchParams.get("edit") || ""] && !editItem) {
      navigate(AppRoutes.List);
    }
  }, [navigate, searchParams, markersList, editItem]);

  useEffect(() => {
    return () => {
      setDeleteMarkId("");
      setEditingMarker(undefined);
    };
  }, [setDeleteMarkId, setEditingMarker]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} smallWindow={smallWindow}>
        <Input
          name="title"
          label="Name"
          defaultValue=""
          control={control}
          error={!!errors.title}
          errorMessage="Please fill the name"
          required
        />
        <Input
          name="latitude"
          label="Latitude"
          defaultValue=""
          control={control}
          error={!!errors.latitude}
          errorMessage="Please match pattern (from -90 to 90) e.g. -38.123456"
          pattern={latituteValidation}
          required
        />
        <Input
          name="longitude"
          label="Longitude"
          defaultValue=""
          control={control}
          error={!!errors.longitude}
          errorMessage="Please match pattern (from -180 to 180) e.g. 123.123456"
          pattern={longituteValidation}
          required
        />
        <Input
          name="description"
          defaultValue=""
          label="Marker description (optional)"
          control={control}
        />
        <Button type="submit" variant="contained" size="large">
          {editItem ? "Edit marker" : "Add marker"}
        </Button>
      </Form>
    </Container>
  );
}
