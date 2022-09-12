import styled from "styled-components";
import { colors, sizes } from "../config/theme";

const Button = styled.button`
  font-family: ${(props) => props.fontFamily || "VarelaRound"};
  font-size: ${(props) => props.fontSize || sizes.buttonText};
  background: ${(props) => colors[props.background] || colors.primary};
  color: ${(props) => props.color || "white"};
  border-radius: ${(props) => props.borderRadius || "999999px"};
  border: ${(props) => props.border || "none"};
  height: ${(props) => props.height || "100%"};
  margin: ${(props) => props.margin || "0 1em"};
  padding: ${(props) => props.padding || "0"};
  cursor: pointer;
`;

export default Button;
