import App from "../../components/App";
import styled from "styled-components";
import { colors, sizes } from "../../config/theme";
import { useState } from "react";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";
import Upload from "./Upload";
import Success from "./Success";
import Error from "./Error";

const UploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem ${sizes.inlineMargin};

  border: 3px solid ${colors.primary};
  border-radius: 20px;
  min-height: calc(100vh - ${sizes.navbar} - 6rem);
  justify-content: center;
  transition: 0.3s;

  @media (max-width: 1000px) {
    margin: 2rem;
    min-height: calc(100vh - ${sizes.navbar} - 4rem);
  }

  @media (max-width: 768px) {
    margin: 1rem;
    min-height: calc(100vh - ${sizes.navbar} - 2rem);
  }
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 5rem;
  min-height: inherit;
  min-width: 100%;

  @media (max-width: 1200px) {
    padding: 2rem 3rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export default function UploadView() {
  const [state, setState] = useState("upload");

  return (
    <App>
      <UploadDiv>
        <MotionDiv
          key={state}
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 20 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.15 }}
        >
          {state === "upload" && <Upload setState={setState} />}
          {state === "loading" && <Loading />}
          {state === "success" && <Success />}
          {state === "error" && <Error />}
        </MotionDiv>
      </UploadDiv>
    </App>
  );
}
