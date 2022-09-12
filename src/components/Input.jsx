import styled from "styled-components";
import { colors } from "../config/theme";

const Input = styled.input`
  border: ${(props) => props.border || `1px solid ${colors.primary}`};
  border-radius: ${(props) => props.borderRadius || "99999px"};
  font-family: ${(props) => props.fontFamily || "VarelaRound"};
  font-size: ${(props) => props.fontSize || "1rem"};
  padding: ${(props) => props.padding || "5px 1rem"};
  width: ${(props) => props.width || "100%"};
  outline: none;

  &:disabled {
    opacity: 1;
    color: ${colors.disabledColor};
    background-color: ${colors.disabledBackground};
  }
`;

export default Input;
