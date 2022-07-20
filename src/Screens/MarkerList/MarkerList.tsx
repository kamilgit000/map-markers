import { useCallback, useState } from "react";
import { List } from "@mui/material";
import { useDialog } from "Providers/useDialog";
import { Container } from "./styles";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import AppRoutes from "Types/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/Store";
import { removeMarker } from "Store/Slices/MarkerListSlice";
import { MarkerItem } from "Types/MarkerItem";

export default function MarkerList() {
  const dialog = useDialog();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const markersList = useSelector((state: RootState) =>
    Object.entries(state.markers.markerList)
  );

  const [selectedId, setSelectedId] = useState<string>("");

  const onEdit = useCallback(
    (id: string) => navigate(`/${AppRoutes.Form}?edit=${id}`),
    [navigate]
  );

  const showDeleteDialog = useCallback(
    (item: MarkerItem) => {
      dialog.show({
        title: `Do you want to delete ${item.title}?`,
        description: `Coordinates: ${item.longitude}, ${item.latitude}`,
        onPrimary: () => dispatch(removeMarker(item)),
        primaryText: "Yes",
        secondaryText: "No",
      });
    },
    [dialog, dispatch]
  );

  const onItemClick = useCallback((id: string) => setSelectedId(id), []);

  return (
    <Container>
      <List>
        {markersList.map(([key, item]) => (
          <ListItem
            key={key}
            id={key}
            onClick={onItemClick}
            onEdit={onEdit}
            onDelete={showDeleteDialog}
            selected={selectedId === key}
            item={item}
          />
        ))}
      </List>
    </Container>
  );
}
