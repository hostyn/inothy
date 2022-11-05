import styled from "styled-components";
import { colors, sizes } from "../config/theme";

const A = styled.a`
  font-weight: ${(props) => props.fontWeight || "bold"};
  font-family: ${(props) => props.fontFamily || "VarelaRound"};
  font-size: ${(props) => props.fontSize || sizes.buttonText};
  text-align: ${(props) => props.textAlign || "initial"};
  color: ${(props) => colors[props.color] || colors.secondary};
  margin: ${(props) => props.margin || "initial"};
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export default A;
