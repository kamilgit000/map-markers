import { css } from "styled-components";

export function forceWidth(width: string) {
  return css`
    width: ${width} !important;
    max-width: ${width} !important;
    min-width: ${width} !important;
  `;
}
