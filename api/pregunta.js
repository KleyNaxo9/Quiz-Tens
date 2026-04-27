export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        messages: [{
          role: "user",
          content: `
Genera una pregunta tipo TENS Chile con 4 alternativas.
Responde SOLO en JSON:
{
  "pregunta": "...",
  "opciones": ["A","B","C","D"],
  "correcta": 0
}`
        }]
      })
    });

    const data = await r.json();
    const texto = data.choices[0].message.content;

    res.status(200).json(JSON.parse(texto));

  } catch (error) {
    res.status(500).json({ error: "Error en servidor" });
  }
}
