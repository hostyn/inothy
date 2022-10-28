export default function completebuy(req, res) {
  res.status(200).json({ status: "ok" });
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = JSON.parse(req.body);

  console.log(body);
}
