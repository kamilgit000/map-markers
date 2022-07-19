import styled from "styled-components";
import { headerHeight } from "Utils/constants";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;
export const Content = styled.div`
  display: flex;
  height: calc(100vh - ${headerHeight}px);
`;

export const RoutesContainer = styled.div`
  flex: 0.5;
`;
export const MapContainer = styled.div`
  flex: 0.5;
  height: 100%;
`;
