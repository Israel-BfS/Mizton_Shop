import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MODELS = [
  'gemini-flash-latest',
  'gemini-pro-latest',
  'gemini-1.5-flash-8b-latest'
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje no válido' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Falta configurar GEMINI_API_KEY' }, { status: 500 });
    }

    const systemPrompt = `Eres el asistente virtual oficial de Mizton Shop (tienda en línea de variedad en México).
- Tono: Formal, claro y conciso en español de México.
- Envíos: A todo México en 10 a 15 días hábiles.
- Pagos: Tarjetas de crédito y débito vía Stripe.
- Devoluciones: 7 días naturales por defectos de fábrica.
Si solicitan rastreo específico de un pedido, solicita su correo para remitirlo a soporte.`;

    const requestBody = JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nPregunta del cliente: ${message}` }]
        }
      ]
    });

    let lastError = 'No se pudo obtener respuesta del modelo';

    // Intentar en cascada a través de los modelos disponibles
    for (const model of MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody
        });

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return NextResponse.json({ reply: data.candidates[0].content.parts[0].text });
        }

        lastError = data.error?.message || `Error con modelo ${model}`;
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
      }
    }

    return NextResponse.json({ error: lastError }, { status: 503 });

  } catch (error: unknown) {
    console.error('Chat error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
