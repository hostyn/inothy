import { useAuth } from "../context/authContext";
import registerCard from "../util/cardregistration";

import styled, { css, keyframes } from "styled-components";
import { useState } from "react";

const Click = keyframes`
  /* 0% {
    scale: 1;
  } */

  20% {
    scale: 0.9;
  }

`;

const Div = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  font-family: "VarelaRound";
  border: none;
  cursor: pointer;
  transition: 0.1s;

  ${(props) =>
    props.click &&
    css`
      animation: ${Click} 0.1s;
    `};

  :hover {
    scale: 1.1;
    /* box-shadow: 0 0 5px gainsboro; */
  }
`;

export default function Test(props) {
  const [click, setClick] = useState(false);
  return (
    <Div>
      <Button
        {...props}
        onClick={async () => {
          setClick(true);
          await new Promise((res) => setTimeout(res, 100));
          setClick(false);
        }}
        click={click}
      >
        Test
      </Button>
    </Div>
  );
}
