import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => props.background || "red"};
`;

export default Button;
