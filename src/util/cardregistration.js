import { completeCardRegistration, createCardRegistration } from "./api";

export default async function registerCard(
  user,
  cardNumber,
  expirationDate,
  cvx
) {
  if (!cardNumber) throw new Error("Card Number is required");
  if (!expirationDate) throw new Error("Expiration Date is required");
  if (!cvx) throw new Error("CVX is required");

  try {
    const cardRegistration = await createCardRegistration(user);

    const response = await fetch(cardRegistration.CardRegistrationUrl, {
      method: "POST",
      body: new URLSearchParams({
        data: cardRegistration.PreregistrationData,
        accessKeyRef: cardRegistration.AccessKey,
        cardNumber: cardNumber,
        cardExpirationDate: expirationDate,
        cardCvx: cvx,
      }),
    });

    const registrationData = await response.text();

    const completeCardRegistrationReponse = await completeCardRegistration(
      cardRegistration.Id,
      registrationData
    );

    return;
  } catch (e) {
    console.log(e);
    throw new Error("Internal server error");
  }
}
