import { authAdmin } from "../../config/firebaseadmin";
import { sendPasswordResetEmail } from "../../util/email";

export default async function resetPassword(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { email } = JSON.parse(req.body);

  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
  };

  try {
    const url = await authAdmin.generatePasswordResetLink(
      email,
      actionCodeSettings
    );
    await sendPasswordResetEmail(email, url);
    res.status(200).json({ status: "success" });
    return;
  } catch {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}
