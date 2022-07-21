import { ListItemText, ListSubheader } from "@mui/material";
import styled from "styled-components";
import { forceWidth } from "Utils/styleHelpers";

export const Container = styled.div`
  overflow: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const ListHeader = styled(ListSubheader)<{ iconbuttonwidth: number }>`
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.12);
  padding-right: ${({ iconbuttonwidth }) => 2 * iconbuttonwidth}px !important;
  display: flex;
  align-items: center;
`;
export const ListHeaderItem = styled(ListItemText)<{ width: string }>`
  ${({ width }) => forceWidth(width)}
`;
