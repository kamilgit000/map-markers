import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { MarkerItem } from "Types/MarkerItem";

interface MapCoordinatesState {
  clickedMarker?: MarkerItem;
  setClickedMarker: (item?: MarkerItem) => void;
  editingMarker?: Partial<MarkerItem>;
  setEditingMarker: Dispatch<SetStateAction<Partial<MarkerItem> | undefined>>;
  deleteMarkId?: string;
  setDeleteMarkId: (id: string) => void;
}
const MapCoordinatesContext = createContext<MapCoordinatesState | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export default function MapCoordinatesProvider({ children }: Props) {
  const [clickedMarker, setClickedMarker] = useState<MarkerItem | undefined>();
  const [editingMarker, setEditingMarker] = useState<
    Partial<MarkerItem> | undefined
  >();
  const [deleteMarkId, setDeleteMarkId] = useState<string | undefined>();

  const value = useMemo(
    () => ({
      clickedMarker,
      setClickedMarker,
      editingMarker,
      setEditingMarker,
      deleteMarkId,
      setDeleteMarkId,
    }),
    [
      clickedMarker,
      setClickedMarker,
      deleteMarkId,
      setDeleteMarkId,
      editingMarker,
      setEditingMarker,
    ]
  );

  return (
    <MapCoordinatesContext.Provider value={value}>
      {children}
    </MapCoordinatesContext.Provider>
  );
}

export function useMapCoordinates() {
  const mapCoordinatesContext = useContext(MapCoordinatesContext);
  if (!mapCoordinatesContext) {
    throw new Error(
      "Map coordinates context can be used only inside MapCoordinatesContext.Provider"
    );
  }

  return mapCoordinatesContext;
}
