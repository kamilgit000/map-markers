import { useCallback, useState } from "react";
import { List, Typography } from "@mui/material";
import { useDialog } from "Providers/useDialog";
import { Container, ListHeader, ListHeaderItem } from "./styles";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import AppRoutes from "Types/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/Store";
import { removeMarker } from "Store/Slices/MarkerListSlice";
import { MarkerItem } from "Types/MarkerItem";
import { useMapCoordinates } from "Providers/useMapCoordinates";
import { useSmallWindow } from "Hooks/useSmallWindow";

const listLayout = {
  first: "44%",
  second: "28%",
  third: "28%",
};

export default function MarkerList() {
  const smallWindow = useSmallWindow();
  const navigate = useNavigate();
  const dialog = useDialog();
  const { setClickedMarker } = useMapCoordinates();
  const dispatch = useDispatch();
  const markersList = useSelector((state: RootState) =>
    Object.entries(state.markers.markerList)
  );

  const iconButtonWidth = smallWindow ? 40 : 72;

  const [selectedId, setSelectedId] = useState<string>("");

  const onEdit = useCallback(
    (id: string) => navigate(`/${AppRoutes.Form}?edit=${id}`),
    [navigate]
  );

  const showDeleteDialog = useCallback(
    (item: MarkerItem) => {
      setClickedMarker(item);
      dialog.show({
        title: `Do you want to delete ${item.title}?`,
        description: `Coordinates: ${item.latitude}, ${item.longitude}`,
        onPrimary: () => {
          dispatch(removeMarker({ id: item.id }));
          setClickedMarker(undefined);
        },
        primaryText: "Yes",
        secondaryText: "No",
      });
    },
    [dialog, dispatch, setClickedMarker]
  );

  const onItemClick = useCallback(
    (item: MarkerItem) => {
      setSelectedId(item.id);
      setClickedMarker(item);
    },
    [setClickedMarker]
  );

  return (
    <Container>
      {markersList.length ? (
        <List disablePadding>
          <ListHeader iconbuttonwidth={iconButtonWidth}>
            <ListHeaderItem
              width={listLayout.first}
              primary="Title"
              secondary="description"
            />
            <ListHeaderItem width={listLayout.second} primary="Latitude" />
            <ListHeaderItem width={listLayout.third} primary="Longitude" />
          </ListHeader>
          {markersList.map(([key, item]) => (
            <ListItem
              key={key}
              id={key}
              onClick={onItemClick}
              onEdit={onEdit}
              onDelete={showDeleteDialog}
              selected={selectedId === key}
              item={item}
              iconButtonWidth={iconButtonWidth}
              listLayout={listLayout}
            />
          ))}
        </List>
      ) : (
        <Typography color="primary" margin="40px auto" textAlign="center">
          Marker list is empty. Please add markers via form.
        </Typography>
      )}
    </Container>
  );
}
