import { Container } from "./styles";
import { Map as PigeonMap, Marker } from "pigeon-maps";
import { useEffect, useState } from "react";

export default function Map() {
  const [center, setCenter] = useState<[number, number]>([50.879, 4.6997]);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    setTimeout(() => {
      setCenter([51.879, 45.6997]);
    }, 2000);
  }, []);
  return (
    <Container>
      <PigeonMap
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
        zoom={zoom}
        center={center}
        defaultCenter={center}
        defaultZoom={11}
      >
        <Marker width={50} anchor={center} />
      </PigeonMap>
    </Container>
  );
}
