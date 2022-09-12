import { useState } from "react";
import styled from "styled-components";
import Img from "../Img";
import { colors } from "../../config/theme";
import { AnimatePresence, motion } from "framer-motion";
import Text from "../Text";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useModal } from "../../context/modalContext";

const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 40rem;
  height: 30rem;
  border-radius: 1rem;
  padding: 0.3rem;
`;

const SelectionDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  border-bottom: 2px solid #dcdcdc;
`;

const Underline = styled(motion.div)`
  position: relative;
  bottom: -2px;
  left: 0;
  right: 0;
  min-height: 2px;
  width: 100%;
  background: ${colors.secondary};
`;

const Option = styled.div`
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#eee" : "transparent")};
  border-radius: 0.7rem 0.7rem 0 0;
`;

export default function AuthModal({ selected = "login" }) {
  const [selectedState, setSelectedState] = useState(selected);

  return (
    <AuthDiv>
      <Img
        src="/imagotipo2.svg"
        width="40%"
        aspectRatio="63/50"
        margin="0 0 3rem 0"
      />
      <AuthForm>
        <SelectionDiv>
          <Option
            onClick={() => setSelectedState("login")}
            selected={selectedState === "login"}
          >
            <Text
              color="secondary"
              textAlign="center"
              fontSize="1.5rem"
              margin="0.5rem 0 0.5rem 0"
            >
              Login
            </Text>
            {selectedState === "login" && <Underline layoutId="underline" />}
          </Option>
          <Option
            onClick={() => setSelectedState("register")}
            selected={selectedState === "register"}
          >
            <Text
              color="secondary"
              textAlign="center"
              fontSize="1.5rem"
              margin="0.5rem 0 0.5rem 0"
            >
              Register
            </Text>
            {selectedState === "register" && <Underline layoutId="underline" />}
          </Option>
        </SelectionDiv>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedState}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            style={{
              display: "grid",
              alignContent: "center",
              width: "100%",
              height: "100%",
              padding: "0 5rem",
            }}
          >
            {selectedState === "login" && <LoginForm />}
            {selectedState === "register" && <RegisterForm />}
          </motion.div>
        </AnimatePresence>
      </AuthForm>
    </AuthDiv>
  );
}
