export default async function handler(req, res) {
  // Ganti URL di bawah ini dengan URL Web App GAS kamu
  const GAS_URL = "https://script.google.com/macros/s/AKfycbyO7ySl9hrbc7KmOT1i0InVejw5ytqYD9FQII7Fcm9PIGLueh_GKtYfdtLh1FEezqXf/exec";

  try {
    // CORS header
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(204).end(); // preflight
    }

    // Handle GET (baca data dari sheet ADMIN)
    if (req.method === "GET") {
      const response = await fetch(GAS_URL);
      const data = await response.text();
      return res.status(200).send(data);
    }

    // Handle POST (update data ke sheet ADMIN)
    if (req.method === "POST") {
      const response = await fetch(GAS_URL + "?updateKandidat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const text = await response.text();
      return res.status(200).send(text);
    }

    return res.status(405).send("Method Not Allowed");
  } catch (err) {
    console.error("Error pada proxy:", err);
    return res.status(500).json({ error: err.message });
  }
}
