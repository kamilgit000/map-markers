import { Container } from "./styles";
import { Map as PigeonMap, Marker } from "pigeon-maps";
import { useMemo } from "react";
import { useMapCoordinates } from "Providers/useMapCoordinates";
import { useSelector } from "react-redux";
import { RootState } from "Store/Store";

export default function Map() {
  const { latitude, longitude, deleteMarkId } = useMapCoordinates();

  const markersList = useSelector((state: RootState) =>
    Object.values(state.markers.markerList)
  );

  const center: [number, number] = useMemo(() => {
    if (latitude !== undefined && longitude !== undefined) {
      return [latitude, longitude];
    }
    const markerExists = markersList[markersList.length - 1];
    if (markerExists) {
      return [Number(markerExists.latitude), Number(markerExists.longitude)];
    }
    return [52, 21]; // around warsaw
  }, [latitude, longitude, markersList]);

  return (
    <Container>
      <PigeonMap
        zoom={5}
        center={center}
        defaultCenter={center}
        defaultZoom={5}
      >
        {markersList.map(({ latitude, longitude, id }: any) => (
          <Marker
            key={id}
            width={50}
            anchor={[Number(latitude), Number(longitude)]}
            color={deleteMarkId === id ? "yellow" : "blue"}
          />
        ))}
        {longitude !== undefined && latitude !== undefined && (
          <Marker width={50} anchor={[latitude, longitude]} color="red" />
        )}
      </PigeonMap>
    </Container>
  );
}
