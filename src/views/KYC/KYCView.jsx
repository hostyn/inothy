import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import App from "../../components/App";
import CompleteProfileInfo from "./CompleteProfileInfo";
import Loading from "../../components/Loading";
import Success from "./Success";
import Error from "./Error";
import Verified from "./Verified";
import Pending from "./Pending";
import { completeKYC } from "../../util/api";
import { colors, sizes } from "../../config/theme";
import UploadAccepted from "./UploadAccepted";
import UploadRejected from "./UploadRejected";
import DocumentSelection from "./DocumentSelection";
import Dni from "./Dni";
import Passport from "./Passport";

const UploadDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem ${sizes.inlineMargin};

  border: 3px solid ${colors.primary};
  border-radius: 20px;
  min-height: calc(100vh - ${sizes.navbar} - 6rem);
  justify-content: center;

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

export default function KYCView() {
  const { user } = useAuth();
  const [state, setState] = useState(
    user.data.mangopayKYCStatus === "VALIDATED"
      ? "verified"
      : user.data.mangopayKYCStatus === "VALIDATION_ASKED"
      ? "pending"
      : "completeProfileInfo"
  );

  const [userData, setUserData] = useState({
    name: user.data.name,
    surname: user.data.surname,
    email: user.email,
    address1: user.data.address.address1,
    address2: user.data.address.address2,
    city: user.data.address.city,
    region: user.data.address.region,
    postalCode: user.data.address.postalCode,
    country: user.data.address.country,
    birthday: parseInt(new Date().getTime() / 1000),
    nationality: "ES",
    countryOfResidence: "ES",
  });

  const handleKYCSubmit = async (files) => {
    try {
      setState("loading");
      await completeKYC(user, {
        ...userData,
        files,
      });

      setState("success");
    } catch (e) {
      console.log(e);
      setState("error");
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
            <CompleteProfileInfo
              setUserData={setUserData}
              userData={userData}
              setState={setState}
            />
          )}
          {state === "uploadaccepted" && <UploadAccepted setState={setState} />}
          {state === "uploadrejected" && <UploadRejected setState={setState} />}
          {state === "documentselection" && (
            <DocumentSelection setState={setState} />
          )}
          {state === "dni" && (
            <Dni setState={setState} handleKYCSubmit={handleKYCSubmit} />
          )}
          {state === "passport" && (
            <Passport setState={setState} handleKYCSubmit={handleKYCSubmit} />
          )}
          {state === "success" && <Success />}
          {state === "error" && <Error />}
          {state === "verified" && <Verified />}
          {state === "pending" && <Pending />}
          {state === "loading" && <Loading />}
        </MotionDiv>
      </UploadDiv>
    </App>
  );
}
