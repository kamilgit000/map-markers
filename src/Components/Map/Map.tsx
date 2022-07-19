import { Container } from "./styles";
import { Map as PigeonMap, Marker } from "pigeon-maps";

export default function Map() {
  return (
    <Container>
      <PigeonMap defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
        <Marker width={50} anchor={[50.879, 4.6997]} />
        <Marker width={50} anchor={[51.879, 4.6997]} />
      </PigeonMap>
    </Container>
  );
}
