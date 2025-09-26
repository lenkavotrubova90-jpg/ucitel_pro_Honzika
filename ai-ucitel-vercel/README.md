
# AI Učitel (hlas ↔ AI) – Vercel
Jednoduchá webová appka, která mluví česky (TTS), poslouchá mikrofon (STT) a ptá se po malých krocích. Backend je Vercel Edge Function.

## Deploy (nejrychleji)
1. Importuj tento projekt do Vercelu: https://vercel.com/new (vyber "Import Project" a nahraj ZIP nebo repo).
2. V nastavení projektu -> **Environment Variables** přidej:
   - `OPENAI_API_KEY` = tvůj klíč z https://platform.openai.com/api-keys
3. Deployni. Hotová URL bude např. `https://ai-ucitel.vercel.app`.
4. Otevři URL, povol mikrofon, vyber hlas a mluv.

## Lokálně (test bez backendu nefunguje)
Frontend volá `/api/chat`, takže bez deploye backendu odpověď nepřijde. Pro lokální test lze použít `vercel dev` (potřebuje Vercel CLI).
