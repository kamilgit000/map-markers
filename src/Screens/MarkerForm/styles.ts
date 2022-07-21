import styled from "styled-components";

export const Container = styled.div``;
export const Form = styled.form<{ smallWindow: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ smallWindow }) => (smallWindow ? 10 : 40)}px;
  padding: ${({ smallWindow }) => (smallWindow ? 10 : 40)}px;
`;
