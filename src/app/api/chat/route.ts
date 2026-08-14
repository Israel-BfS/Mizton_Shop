import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = body.message;

    if (!message) {
      return NextResponse.json({ error: 'Mensaje no proporcionado' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Variable GEMINI_API_KEY no encontrada en el servidor' }, { status: 500 });
    }

    const systemPrompt = "Eres el asistente oficial de Mizton Shop (tienda en México). Respuestas cortas, amables y en español neutro de México. Envíos: 10-15 días hábiles a todo México. Pagos: Tarjeta con Stripe. Devoluciones: 7 días.";

    // Intentar llamada con gemini-1.5-flash
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nPregunta: ${message}` }]
            }
          ]
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error('Error Gemini API:', data);
      return NextResponse.json({ 
        error: data.error?.message || 'Error en la respuesta de Gemini' 
      }, { status: 500 });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude generar una respuesta.';
    return NextResponse.json({ reply });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
