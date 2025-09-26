// Vercel Serverless Function (Node 20)
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST');
    return;
  }
  try {
    const { system, messages } = req.body || {};
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        messages: [{ role: 'system', content: system }, ...(messages || [])]
      })
    });
    if (!r.ok) {
      const t = await r.text();
      res.status(502).send(`Upstream error: ${r.status} ${t}`);
      return;
    }
    const j = await r.json();
    const text = j?.choices?.[0]?.message?.content ?? '';
    res.status(200).json({ text });
  } catch (e) {
    res.status(400).send('Bad request: ' + (e?.message || 'unknown'));
  }
};
