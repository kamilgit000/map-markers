import { Button, ListItemButton, ListItemText } from "@mui/material";
import styled from "styled-components";

export const ItemList = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.12);
  height: 72px;
`;
export const ItemText = styled(ListItemText)`
  width: 33.3%;
`;
export const IconButton = styled(Button)<{ iconButtonWidth: number }>`
  width: ${({ iconButtonWidth }) => iconButtonWidth}px;
`;
export const ListItemContent = styled(ListItemButton)`
  padding-right: 0 !important;
`;
