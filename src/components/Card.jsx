import styled from "styled-components";
import { colors } from "../config/theme";

const Card = styled.div`
  display: grid;
  grid-template-columns: 5rem auto;
  gap: 2rem;

  align-items: center;

  padding: 15px 2rem;
  border-radius: 20px;

  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: ${colors.hover};
  }
`;

export default Card;
