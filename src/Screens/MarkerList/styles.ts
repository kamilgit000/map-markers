import { ListItemText, ListSubheader } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  overflow: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const ListHeader = styled(ListSubheader)<{ iconButtonWidth: number }>`
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.12);
  padding-right: ${({ iconButtonWidth }) => 2 * iconButtonWidth}px !important;
  display: flex;
  align-items: center;
`;
export const ListHeaderItem = styled(ListItemText)`
  width: 33.3%;
`;
