import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'El mensaje es requerido' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY no configurada' }, { status: 500 });
    }

    const systemPrompt = `Eres el asistente virtual oficial de Mizton Shop (tienda en línea en México).
- Tono: Amable, formal y conciso en español de México.
- Envíos: Todo México, 10 a 15 días hábiles.
- Pagos: Tarjetas de crédito/débito procesadas de forma segura por Stripe.
- Devoluciones: 7 días naturales por defectos de fábrica.
Si la duda requiere consultar un pedido específico, solicita amablemente el correo electrónico del cliente.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
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
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Error desde la API de Gemini:', data);
      return NextResponse.json({ error: 'Error al comunicarse con la IA' }, { status: 500 });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, no pude procesar tu respuesta.';

    // Note: returning 'text' instead of 'reply' to maintain compatibility with the existing ChatWidget.tsx
    // which expects data.text
    return NextResponse.json({ text: reply });
  } catch (error) {
    console.error('Error en API Chat:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
