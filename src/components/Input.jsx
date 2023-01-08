import styled from "styled-components";
import { colors } from "../config/theme";

const Input = styled.input`
  border: ${(props) => props.border || `2px solid ${colors.primary}`};
  border-radius: ${(props) => props.borderRadius || "10px"};
  font-family: ${(props) => props.fontFamily || "VarelaRound"};
  font-size: ${(props) => props.fontSize || "1rem"};
  padding: ${(props) => props.padding || "10px"};
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.margin || "0"};
  text-align: ${(props) => props.textAlign || "left"};
  color: ${(props) => props.color || "initial"};
  max-width: 100%;
  outline: none;

  &:disabled {
    opacity: 1;
    color: ${colors.disabledColor};
    background-color: ${colors.disabledBackground};
  }
`;

export default Input;
