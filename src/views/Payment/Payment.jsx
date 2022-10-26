import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { getCards } from "../../util/api";
import styled from "styled-components";
import { motion } from "framer-motion";
import Resume from "./Resume";
import Card from "./Card";
import AddCard from "./AddCard";
import Loading from "../../components/Loading";
import CardSuccess from "./CardSuccess";
import CardError from "./CardError";

export default function Payment({ documents }) {
  const { user } = useAuth();
  const [state, setState] = useState("resume");
  const [paymentDetails, setPaymentDetails] = useState({
    cardId: null,
    totalAmount: documents.reduce(
      (prev, current) => prev + parseFloat(current.price),
      0
    ),
    documents: documents,
  });

  return (
    <motion.div
      key={state}
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 20 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.15 }}
    >
      {state === "resume" && (
        <Resume paymentDetails={paymentDetails} setState={setState} />
      )}
      {state === "card" && (
        <Card
          setState={setState}
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
        />
      )}
      {state === "addCard" && <AddCard setState={setState} />}
      {state === "loading" && <Loading />}
      {state === "cardSuccess" && <CardSuccess />}
      {state === "cardError" && <CardError />}
    </motion.div>
  );
}
