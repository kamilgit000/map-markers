import { Button } from "@mui/material";
import { useDialog } from "Providers/useDialog";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addMarker, editMarker } from "Store/Slices/MarkerListSlice";
import { RootState } from "Store/Store";
import { MarkerItem } from "Types/MarkerItem";
import { latituteValidation, longituteValidation } from "Utils/constants";
import { getMarkerItemKey } from "Utils/helpers";
import Input from "./Input";
import { Container, Form } from "./styles";

export default function MarkerForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dialog = useDialog();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<MarkerItem>({ mode: "onChange" });
  const dispatch = useDispatch();

  const markersList = useSelector(
    (state: RootState) => state.markers.markerList
  );

  const editItem = useMemo(
    () => markersList[searchParams.get("edit") || ""],
    [searchParams, markersList]
  );

  const onSubmit = useCallback(
    (item: MarkerItem) => {
      if (editItem) {
        dispatch(editMarker({ previous: editItem, updated: item }));
        alert("Marker edited!");
        setSearchParams({ edit: getMarkerItemKey(item) }, { replace: true });
        reset(item);
      } else {
        if (markersList[getMarkerItemKey(item)]) {
          dialog.show({
            title: "Marker with those coordinates already exists",
            description: "Would you like to replace it?",
            primaryText: "Yes",
            onPrimary: () => {
              dispatch(addMarker(item));
              alert("Marker replaced!");
              reset();
            },
            secondaryText: "No",
          });
        } else {
          dispatch(addMarker(item));
          alert("Marker added!");
          reset();
        }
      }
    },
    [editItem, dialog, markersList, dispatch, reset, setSearchParams]
  );

  useEffect(() => {
    if (editItem) {
      reset(editItem);
    }
  }, [editItem, reset]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
