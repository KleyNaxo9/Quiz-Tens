export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{
          role: "user",
          content: `
Genera una pregunta tipo TENS Chile con 4 alternativas.
Responde SOLO en JSON válido sin texto extra:
{
  "pregunta": "string",
  "opciones": ["A","B","C","D"],
  "correcta": 0
}`
        }]
      })
    });

    const data = await r.json();

    if (!data.choices) {
      return res.status(500).json({
        error: "OpenAI no devolvió respuesta válida",
        raw: data
      });
    }

    const texto = data.choices[0].message.content;

    return res.status(200).json(JSON.parse(texto));

  } catch (error) {
    return res.status(500).json({
      error: "Error en servidor",
      detalle: error.message
    });
  }
}
