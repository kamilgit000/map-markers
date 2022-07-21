import { Button, ListItemButton } from "@mui/material";
import styled from "styled-components";
import { forceWidth } from "Utils/styleHelpers";

export const ItemList = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.12);
  height: 72px;
`;
export const ItemTextContainer = styled.div<{ width: string }>`
  ${({ width }) => forceWidth(width)};
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-right: 10px;
`;
export const ItemTextPrimary = styled.p`
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const ItemTextSecondary = styled.p`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const IconButton = styled(Button)<{ width: string }>`
  ${({ width }) => forceWidth(width)};
`;
export const ListItemContent = styled(ListItemButton)`
  padding-right: 0 !important;
`;
