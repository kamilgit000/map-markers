import { Map as PigeonMap, Marker, Overlay } from "pigeon-maps";
import { useMemo } from "react";
import { useMapCoordinates } from "Providers/useMapCoordinates";
import { useSelector } from "react-redux";
import { RootState } from "Store/Store";
import { MarkerItem } from "Types/MarkerItem";
import { CardContent, Typography } from "@mui/material";
import { Container, CardContainer } from "./styles";

export default function Map() {
  const { editingMarker, deleteMarkId, clickedMarker, setClickedMarker } =
    useMapCoordinates();
  const markersList = useSelector((state: RootState) =>
    Object.values(state.markers.markerList)
  );

  const center: [number, number] | undefined = useMemo(() => {
    if (
      editingMarker?.latitude !== undefined &&
      editingMarker?.longitude !== undefined
    ) {
      return [Number(editingMarker.latitude), Number(editingMarker.longitude)];
    }
    if (
      clickedMarker?.latitude !== undefined &&
      clickedMarker?.longitude !== undefined
    ) {
      return [Number(clickedMarker.latitude), Number(clickedMarker.longitude)];
    }
  }, [editingMarker, clickedMarker]);

  return (
    <Container>
      <PigeonMap
        zoom={5}
        center={center}
        defaultCenter={center}
        defaultZoom={5}
        onClick={() => setClickedMarker(undefined)}
      >
        {markersList.map((item: MarkerItem) => (
          <Marker
            onClick={() => setClickedMarker(item)}
            key={item.id}
            width={50}
            anchor={[Number(item.latitude), Number(item.longitude)]}
            color={deleteMarkId === item.id ? "red" : "green"}
          />
        ))}
        {clickedMarker && (
          <Overlay
            anchor={[
              Number(clickedMarker.latitude),
              Number(clickedMarker.longitude),
            ]}
          >
            <CardContainer>
              <CardContent>
                <Typography variant="h5" component="div" noWrap>
                  {clickedMarker.title}
                </Typography>
                {!!clickedMarker.description && (
                  <Typography color="text.secondary" noWrap>
                    {clickedMarker.description}
                  </Typography>
                )}
              </CardContent>
            </CardContainer>
          </Overlay>
        )}

        {editingMarker?.longitude !== undefined &&
          editingMarker?.latitude !== undefined && (
            <Marker
              width={50}
              anchor={[
                Number(editingMarker?.latitude),
                Number(editingMarker?.longitude),
              ]}
              color="blue"
            />
          )}
      </PigeonMap>
    </Container>
  );
}
