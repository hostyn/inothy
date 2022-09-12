import { colors } from "../config/theme";
import styled from "styled-components";

const Text = styled.p`
  font-family: ${(props) => props.fontFamily || "VarelaRound"};
  font-size: ${(props) => props.fontSize || "1rem"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  color: ${(props) => colors[props.color] || colors.primary};
  text-align: ${(props) => props.textAlign || "left"};
  margin: ${(props) => props.margin || "0"};
  user-select: ${(props) => props.userSelect || "initial"};
`;

export default Text;
