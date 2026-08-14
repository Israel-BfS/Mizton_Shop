import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje inválido' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Falta configurar GEMINI_API_KEY en variables de entorno' }, { status: 500 });
    }

    const systemPrompt = `Eres el asistente virtual oficial de Mizton Shop (tienda en línea de variedad en México).
- Tono: Formal, claro y conciso en español de México.
- Envíos: A todo México en 10 a 15 días hábiles.
- Pagos: Tarjetas de débito y crédito vía Stripe.
- Devoluciones: 7 días naturales por defectos de fábrica.
Si solicitan rastreo específico de un pedido, solicita su correo de compra para remitirlo a soporte.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nPregunta del cliente: ${message}` }]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error Body:', data);
      return NextResponse.json({ 
        error: data.error?.message || `Error API Gemini (Status ${response.status})` 
      }, { status: response.status });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo generar respuesta.';
    return NextResponse.json({ reply });

  } catch (error: unknown) {
    console.error('Chat Route Exception:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
