import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "Types/AppRoutes";

export default function usePathname() {
  const { pathname } = useLocation();

  const path = useMemo(() => pathname.substring(1), [pathname]);

  return path as AppRoutes;
}
