import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function usePathname() {
  const { pathname } = useLocation();

  const path = useMemo(() => pathname.substring(1), [pathname]);

  return path;
}
