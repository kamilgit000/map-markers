import styled from "styled-components";
import { headerHeight } from "Utils/constants";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;
export const Content = styled.div<{ flexDirection: "row" | "column" }>`
  display: flex;
  height: calc(100vh - ${headerHeight}px);
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const ContenBox = styled.div<{
  width: string;
  height: string;
  scroll?: boolean;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ scroll }) =>
    scroll &&
    `
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  `}
`;
