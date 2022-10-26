import styled from "styled-components";
import { colors } from "../config/theme";
import { v4 } from "uuid";

const Label = styled.label`
  color: ${colors.primary};
  font-family: VarelaRound;
  font-size: ${(props) => props.fontSize || "1.5rem"};
  border-radius: 999999px;
  border: ${(props) => props.border || `2px solid ${colors.primary}`};
  padding: 5px 1rem;
  margin: ${(props) => props.margin || "0"};
  width: fit-content;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

export default function Fileinput({
  margin,
  children,
  multiple,
  onChange,
  key,
  accept,
  name,
  border,
}) {
  const id = v4();
  return (
    <>
      <Label htmlFor={id} margin={margin} border={border}>
        {children || "Adjuntar archivos"}
      </Label>
      <Input
        id={id}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        key={key}
      />
    </>
  );
}
