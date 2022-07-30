import styled from "styled-components";
import Footer from "./Footer";
import Nav from "./Navbar";
import { sizes } from "../../config/theme";

const AppDiv = styled.div`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  background-color: white;
`;

const AppBody = styled.main`
  min-width: 100vw;
  max-width: 100vw;
  min-height: calc(100vh - ${sizes.navbar});
  background-color: red;
`;

export default function App({ children }) {
  return (
    <AppDiv>
      <Nav />
      <AppBody>{children}</AppBody>
      <Footer />
    </AppDiv>
  );
}
