import Header from "Components/Header";
import Map from "Components/Map";
import Routing from "Routing";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import { Container, ContenBox, Content } from "./styles";
import Providers from "Providers";
import { Provider } from "react-redux";
import Store from "Store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "Store/Store";
import { useSmallWindow } from "Hooks/useSmallWindow";

export default function App() {
  const smallWindow = useSmallWindow();

  return (
    <Provider store={Store}>
      <Container>
        <GlobalStyles />
        <BrowserRouter>
          <Providers>
            <PersistGate loading={null} persistor={persistor}>
              <Header />
              <Content flexDirection={smallWindow ? "column" : "row"}>
                <ContenBox
                  scroll
                  width={smallWindow ? "100%" : "40%"}
                  height={smallWindow ? "45%" : "100%"}
                >
                  <Routing />
                </ContenBox>
                <ContenBox
                  width={smallWindow ? "100%" : "60%"}
                  height={smallWindow ? "55%" : "100%"}
                >
                  <Map />
                </ContenBox>
              </Content>
            </PersistGate>
          </Providers>
        </BrowserRouter>
      </Container>
    </Provider>
  );
}
