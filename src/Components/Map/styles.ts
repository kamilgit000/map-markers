import { Card } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;
export const CardContainer = styled(Card)`
  max-width: 150px;
  overflow: hidden;
  &:hover {
    max-width: 100%;
  }
`;
