import { ReactNode } from "react";
import DialogProvider from "./useDialog";
import MapCoordinatesProvider from "./useMapCoordinates";

interface Props {
  children: ReactNode;
}
export default function Providers({ children }: Props) {
  return (
    <MapCoordinatesProvider>
      <DialogProvider>{children}</DialogProvider>
    </MapCoordinatesProvider>
  );
}
