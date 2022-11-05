import styled, { css, keyframes } from "styled-components";
import { useEffect, useState } from "react";
import Text from "../components/Text";
import Loading from "../components/Loading";

import App from "../components/App";
import LoadingPage from "../components/LoadingPage";

export default function Test() {
  return <App></App>;
  // return <LoadingPage />;
}

// const Click = keyframes`
//   /* 0% {
//     scale: 1;
//   } */

//   20% {
//     scale: 0.9;
//   }

// `;

// const Div = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const Button = styled.button`
//   border-radius: 10px;
//   padding: 0.5rem 1rem;
//   font-size: 2rem;
//   font-family: "VarelaRound";
//   border: none;
//   cursor: pointer;
//   transition: 0.1s;

//   ${(props) =>
//     props.click &&
//     css`
//       animation: ${Click} 0.1s;
//     `};

//   :hover {
//     scale: 1.1;
//     /* box-shadow: 0 0 5px gainsboro; */
//   }
// `;

// const Button2 = styled.button`
//   transition: 1s;
//   width: 15rem;
// `;

// export default function Test(props) {
//   const [click, setClick] = useState(false);
//   const [loading, setLoading] = useState(false);

//   return (
//     <Div>
//       <Button
//         {...props}
//         onClick={async () => {
//           setClick(true);
//           await new Promise((res) => setTimeout(res, 100));
//           setClick(false);
//         }}
//         click={click}
//       >
//         Test
//       </Button>
//       <Button2 onClick={() => setLoading((loading) => !loading)}>
//         {loading ? <Loading /> : <Text fontSize="2rem">Descargar</Text>}
//       </Button2>
//     </Div>
//   );
// }
