export const config = { runtime: 'edge' };

export default async (req: Request) => {
  if (req.method !== 'POST') return new Response('Only POST', { status: 405 });
  try {
    const { system, messages } = await req.json();

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY!}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        messages: [{ role: 'system', content: system }, ...messages]
      })
    });

    if (!r.ok) {
      const t = await r.text();
      return new Response(`Upstream error: ${r.status} ${t}`, { status: 502 });
    }

    const j = await r.json();
    const text = j.choices?.[0]?.message?.content ?? '';
    return new Response(JSON.stringify({ text }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(`Bad request: ${e?.message ?? 'unknown'}`, { status: 400 });
  }
};
