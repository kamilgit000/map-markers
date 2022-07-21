import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import debounce from "lodash.debounce";
import { MarkerItem } from "Types/MarkerItem";

interface MapCoordinatesState {
  setClickedMarker: (item?: MarkerItem) => void;
  setEditingMarker: Dispatch<SetStateAction<Partial<MarkerItem> | undefined>>;
  setDeleteMarkId: (id: string) => void;
  debounceSetEditingMarker: Dispatch<
    SetStateAction<Partial<MarkerItem> | undefined>
  >;
  deleteMarkId?: string;
  editingMarker?: Partial<MarkerItem>;
  clickedMarker?: MarkerItem;
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

  const debounceSetEditingMarker = useCallback(
    debounce(setEditingMarker, 500),
    []
  );

  const value = useMemo(
    () => ({
      clickedMarker,
      setClickedMarker,
      editingMarker,
      setEditingMarker,
      deleteMarkId,
      setDeleteMarkId,
      debounceSetEditingMarker,
    }),
    [
      clickedMarker,
      setClickedMarker,
      deleteMarkId,
      setDeleteMarkId,
      editingMarker,
      setEditingMarker,
      debounceSetEditingMarker,
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
