import Header from "Components/Header";
import Map from "Components/Map";
import Routing from "Routing";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import { Container, RoutesContainer, Content, MapContainer } from "./styles";
import Providers from "Providers";
import { Provider } from "react-redux";
import Store from "Store";

export default function App() {
  return (
    <Provider store={Store}>
      <Container>
        <GlobalStyles />
        <BrowserRouter>
          <Providers>
            <Header />
            <Content>
              <RoutesContainer>
                <Routing />
              </RoutesContainer>
              <MapContainer>
                <Map />
              </MapContainer>
            </Content>
          </Providers>
        </BrowserRouter>
      </Container>
    </Provider>
  );
}
