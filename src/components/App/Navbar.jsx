import styled from "styled-components";
import { sizes } from "../../config/theme";

const Navbar = styled.nav`
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${sizes.navbar};
  max-height: ${sizes.navbar};
  position: sticky;
  top: 0;
`;

export default function Nav() {
  return <Navbar>Navbar</Navbar>;
}
