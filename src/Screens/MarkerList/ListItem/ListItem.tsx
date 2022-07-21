import { MarkerItem } from "Types/MarkerItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, ItemList, ItemText, ListItemContent } from "./styles";
import { memo, useCallback } from "react";

interface Props {
  onClick: (item: MarkerItem) => void;
  onEdit: (id: string) => void;
  onDelete: (item: MarkerItem) => void;
  selected: boolean;
  id: string;
  item: MarkerItem;
  iconButtonWidth: number;
}

function ListItem({
  item,
  item: { title, description, longitude, latitude },
  selected,
  onClick,
  onEdit,
  onDelete,
  id,
  iconButtonWidth,
}: Props) {
  const onItemClick = useCallback(() => onClick(item), [item, onClick]);
  const onDeleteClick = useCallback(() => onDelete(item), [item, onDelete]);
  const onEditClick = useCallback(() => onEdit(id), [id, onEdit]);

  return (
    <ItemList>
      <ListItemContent
        selected={selected}
        onClick={onItemClick}
        alignItems="center"
      >
        <ItemText primary={title} secondary={description} />
        <ItemText primary={latitude} />
        <ItemText primary={longitude} />
      </ListItemContent>
      <IconButton iconButtonWidth={iconButtonWidth} onClick={onEditClick}>
        <EditIcon color="primary" />
      </IconButton>
      <IconButton iconButtonWidth={iconButtonWidth} onClick={onDeleteClick}>
        <DeleteIcon color="error" />
      </IconButton>
    </ItemList>
  );
}

export default memo(ListItem);
