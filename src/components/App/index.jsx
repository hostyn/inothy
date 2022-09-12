import styled from "styled-components";
import Footer from "./Footer";
import Nav from "./Navbar";
import { sizes } from "../../config/theme";
import { useAuth } from "../../context/authContext";

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
  ${(props) =>
    props.transparent
      ? "padding: 0"
      : props.notVerified
      ? `padding: calc(${sizes.navbar} + ${sizes.banner}) 0 0 0`
      : `padding: ${sizes.navbar} 0 0 0`};
`;

export default function App({ children, transparent = false }) {
  const { user } = useAuth();
  return (
    <AppDiv>
      <Nav transparent={transparent} />
      <AppBody
        transparent={transparent}
        notVerified={user && !user.emailVerified}
      >
        {children}
      </AppBody>
      <Footer />
    </AppDiv>
  );
}
