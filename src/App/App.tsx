import Header from "Components/Header";
import Map from "Components/Map";
import Routing from "Routing";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import { Container, RoutesContainer, Content, MapContainer } from "./styles";

export default function App() {
  return (
    <Container>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Content>
          <RoutesContainer>
            <Routing />
          </RoutesContainer>
          <MapContainer>
            <Map />
          </MapContainer>
        </Content>
      </BrowserRouter>
    </Container>
  );
}
