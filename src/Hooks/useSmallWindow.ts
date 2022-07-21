import { useMediaQuery } from "@mui/material";
import { appLayoutBreakpoint } from "Utils/constants";

export function useSmallWindow() {
  const smallWindow = useMediaQuery(`(max-width:${appLayoutBreakpoint}px)`);

  return smallWindow;
}
