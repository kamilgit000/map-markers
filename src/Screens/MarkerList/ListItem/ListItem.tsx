import { memo, useCallback } from "react";
import { MarkerItem } from "Types/MarkerItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  ItemList,
  ItemTextContainer,
  ItemTextPrimary,
  ItemTextSecondary,
  ListItemContent,
} from "./styles";

interface Props {
  onClick: (item: MarkerItem) => void;
  onEdit: (id: string) => void;
  onDelete: (item: MarkerItem) => void;
  selected: boolean;
  id: string;
  item: MarkerItem;
  iconButtonWidth: number;
  listLayout: { first: string; second: string; third: string };
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
  listLayout,
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
        <ItemTextContainer width={listLayout.first}>
          <ItemTextPrimary>{title}</ItemTextPrimary>
          {!!description && (
            <ItemTextSecondary>{description}</ItemTextSecondary>
          )}
        </ItemTextContainer>
        <ItemTextContainer width={listLayout.second}>
          <ItemTextPrimary>{latitude}</ItemTextPrimary>
        </ItemTextContainer>
        <ItemTextContainer width={listLayout.third}>
          <ItemTextPrimary>{longitude}</ItemTextPrimary>
        </ItemTextContainer>
      </ListItemContent>
      <IconButton width={`${iconButtonWidth}px`} onClick={onEditClick}>
        <EditIcon color="primary" />
      </IconButton>
      <IconButton width={`${iconButtonWidth}px`} onClick={onDeleteClick}>
        <DeleteIcon color="error" />
      </IconButton>
    </ItemList>
  );
}

export default memo(ListItem);
