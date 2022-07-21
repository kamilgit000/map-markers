import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface MapCoordinatesState {
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setMapCoordinates: (coords: [number?, number?]) => void;
  deleteMarkId?: string;
  setDeleteMarkId: (id: string) => void;
  longitude?: number;
  latitude?: number;
}
const MapCoordinatesContext = createContext<MapCoordinatesState | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export default function MapCoordinatesProvider({ children }: Props) {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [deleteMarkId, setDeleteMarkId] = useState<string | undefined>();

  const setMapCoordinates = useCallback((coords: [number?, number?]) => {
    setLatitude(coords[0]);
    setLongitude(coords[1]);
  }, []);

  const value = useMemo(
    () => ({
      setLatitude,
      setLongitude,
      setMapCoordinates,
      longitude,
      latitude,
      deleteMarkId,
      setDeleteMarkId,
    }),
    [
      setMapCoordinates,
      setLatitude,
      setLongitude,
      longitude,
      latitude,
      deleteMarkId,
      setDeleteMarkId,
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
