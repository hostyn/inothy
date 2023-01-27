import { colors } from "../config/theme";
import styled from "styled-components";

const Text = styled.p`
  display: ${(props) => props.display || "initial"};
  align-items: ${(props) => props.alignItems || "inital"};
  font-family: ${(props) => props.fontFamily || "VarelaRound"};
  font-size: ${(props) => props.fontSize || "1rem"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  color: ${(props) => colors[props.color] || colors.primary};
  text-align: ${(props) => props.textAlign || "left"};
  margin: ${(props) => props.margin || "0"};
  user-select: ${(props) => props.userSelect || "initial"};
  width: ${(props) => props.width || "initial"};
  min-width: ${(props) => props.minWidth || "initial"};
  line-height: ${(props) => props.lineHeight || "initial"};
  max-width: ${(props) => props.maxWidth || "initial"};
  cursor: ${(props) => props.cursor || "inherit"};
  line-break: ${(props) => props.lineBreak || "auto"};
`;

export default Text;
