import styled from "styled-components";
import Text from "../../../components/Text";
import { colors } from "../../../config/theme";

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 100%;
  min-width: 100%;
  overflow-y: auto;
  margin: 1rem 0;
  padding: 0 5px 0 0;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.hover};
    border-radius: 10px;
  }
`;

export default Cards;
