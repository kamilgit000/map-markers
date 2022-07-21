import Header from "Components/Header";
import Map from "Components/Map";
import Routing from "Routing";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import { Container, ContenBox, Content } from "./styles";
import Providers from "Providers";
import { Provider } from "react-redux";
import Store from "Store";
import { useSmallWindow } from "Hooks/useSmallWindow";

export default function App() {
  const smallWindow = useSmallWindow();

  return (
    <Provider store={Store}>
      <Container>
        <GlobalStyles />
        <BrowserRouter>
          <Providers>
            <Header />
            <Content flexDirection={smallWindow ? "column" : "row"}>
              <ContenBox
                scroll
                width={smallWindow ? "100%" : "50%"}
                height={smallWindow ? "50%" : "100%"}
              >
                <Routing />
              </ContenBox>
              <ContenBox
                width={smallWindow ? "100%" : "50%"}
                height={smallWindow ? "50%" : "100%"}
              >
                <Map />
              </ContenBox>
            </Content>
          </Providers>
        </BrowserRouter>
      </Container>
    </Provider>
  );
}
