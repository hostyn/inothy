import styled from "styled-components";
import { colors } from "../config/theme";

const Textarea = styled.textarea`
  border: ${(props) => props.border || `2px solid ${colors.primary}`};
  border-radius: ${(props) => props.borderRadius || "10px"};
  font-family: ${(props) => props.fontFamily || "VarelaRound"};
  font-size: ${(props) => props.fontSize || "1rem"};
  padding: ${(props) => props.padding || "10px"};
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.margin || "initial"};
  outline: none;
  resize: none;
`;

export default Textarea;
