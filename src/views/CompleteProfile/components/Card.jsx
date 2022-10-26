import styled from "styled-components";
import { colors } from "../../../config/theme";

const Card = styled.div`
  border-radius: 10px;
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;

  height: 4rem;

  align-items: center;

  cursor: pointer;
  padding: 0 1rem;
  transition: background-color 0.2s;

  background-color: ${(props) =>
    props.selected ? colors.disabledBackground : "transparent"};

  border: ${(props) =>
    props.selected ? `1px solid ${colors.secondary}` : "initial"};

  &:hover {
    background-color: ${colors.hover};
  }
`;

export default Card;
