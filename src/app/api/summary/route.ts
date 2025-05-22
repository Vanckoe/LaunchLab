// pages/api/summary.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  // Твой prompt: коротко, ясно, понятно
  const prompt = `
Ты — PageSpeed-инспектор. Вот полные данные аудита сайта:
${JSON.stringify(data)}
Сделай краткое summary (2-3 предложения), что с сайтом не так, где основные потери скорости и что срочно исправить. Не используй технический жаргон.
`;

  // Запрос к GPT-4.1 mini (например, через openai sdk)
  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-nano', // или mini, если у тебя есть доступ
      messages: [
        { role: 'system', content: 'Ты — эксперт по скоростям сайтов.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 140,
      temperature: 0.4,
    }),
  });

  const json = await openaiRes.json();
  const summary = json.choices?.[0]?.message?.content ?? 'Нет ответа';

  return NextResponse.json({ summary });
}
