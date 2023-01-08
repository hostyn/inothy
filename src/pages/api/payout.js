import { authAdmin, firestoreAdmin } from "../../config/firebaseadmin";
import mangopay from "../../config/mangopay";

export default async function payout(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const user = await authAdmin.verifyIdToken(token).catch((error) => {
    res.status(401).json({ error: "Unauthorized" });
    return;
  });

  const userData = (
    await firestoreAdmin.collection("users").doc(user.uid).get()
  ).data();

  const wallet = await mangopay.Wallets.get(userData.mangopayWalletId);
  const balance = wallet.Balance.Amount;

  if (!balance) {
    res.status(400).json({ error: "Balance is 0" });
    return;
  }

  const [bankAccount] = await mangopay.Users.getBankAccounts(
    userData.mangopayClientId,
    {
      parameters: {
        Active: true,
      },
    }
  );

  await mangopay.PayOuts.create({
    AuthorId: userData.mangopayClientId,
    DebitedFunds: { Currency: "EUR", Amount: balance },
    Fees: { Currency: "EUR", Amount: 0 },
    BankAccountId: bankAccount.Id,
    DebitedWalletId: userData.mangopayWalletId,
    PaymentType: "BANK_WIRE",
  });

  res.status(200).json({ status: "ok" });
  return;
}
