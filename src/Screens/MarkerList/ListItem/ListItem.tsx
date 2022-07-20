import { MarkerItem } from "Types/MarkerItem";
import { Button, ListItemButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ItemList } from "./styles";
import { memo, useCallback } from "react";

interface Props {
  onClick: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (item: MarkerItem) => void;
  selected: boolean;
  id: string;
  item: MarkerItem;
}

function ListItem({
  item,
  item: { title, description, longitude, latitude },
  selected,
  onClick,
  onEdit,
  onDelete,
  id,
}: Props) {
  const onItemClick = useCallback(() => onClick(id), [id, onClick]);
  const onDeleteClick = useCallback(() => onDelete(item), [item, onDelete]);
  const onEditClick = useCallback(() => onEdit(id), [id, onEdit]);

  return (
    <ItemList>
      <ListItemButton selected={selected} onClick={onItemClick}>
        <ListItemText primary={title} secondary={description} />
        <ListItemText primary={`${longitude}, ${latitude}`} />
      </ListItemButton>
      <Button onClick={onEditClick}>
        <EditIcon color="primary" />
      </Button>
      <Button onClick={onDeleteClick}>
        <DeleteIcon color="error" />
      </Button>
    </ItemList>
  );
}

export default memo(ListItem);
