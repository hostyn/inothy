import App from "../../components/App";
import styled from "styled-components";
import { colors, sizes } from "../../config/theme";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { motion } from "framer-motion";
import CompleteProfileInfo from "./CompleteProfileInfo";
import Kyc from "./Kyc";
import Loading from "../../components/Loading";
import KYCCompleted from "./KYCCompleted";
import KYCError from "./KYCError";
import { completeKYC } from "../../util/api";
import Upload from "./Upload";
import Success from "./Success";
import Error from "./Error";

const UploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem ${sizes.inlineMargin};

  border: 3px solid ${colors.primary};
  border-radius: 20px;
  min-height: 42rem;
  height: calc(100vh - ${sizes.navbar} - 6rem);
  justify-content: center;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 5rem;
  min-height: inherit;
  height: calc(100vh - ${sizes.navbar} - 6rem);
  min-width: 100%;
`;

export default function UploadView() {
  const { user, updateData } = useAuth();
  const [state, setState] = useState(
    user.data.mangopayType !== "OWNER" ? "completeProfileInfo" : "upload"
  );

  const [data, setData] = useState({});

  const hanldeKYCSubmit = async (files) => {
    // TODO: handle errors
    try {
      setState("loading");
      await completeKYC(user, {
        ...data,
        files: [files.front.base64, files.back.base64],
      });

      setState("kyccompleted");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await updateData();
      setState("upload");
    } catch {
      setState("kycerror");
    }
  };

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
          {state === "completeProfileInfo" && (
            <CompleteProfileInfo setData={setData} setState={setState} />
          )}
          {state === "kyc" && <Kyc handleSubmit={hanldeKYCSubmit} />}
          {state === "upload" && <Upload setState={setState} />}
          {state === "loading" && <Loading />}
          {state === "kyccompleted" && <KYCCompleted />}
          {state === "kycerror" && <KYCError />}
          {state === "success" && <Success />}
          {state === "error" && <Error />}
        </MotionDiv>
      </UploadDiv>
    </App>
  );
}
