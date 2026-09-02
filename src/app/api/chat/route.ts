import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not defined in environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

const SYSTEM_INSTRUCTION = `
Eres el asistente virtual oficial de "Mizton Shop", una tienda online en México especializada en productos para mascotas y cuidado del hogar.
Tus responsabilidades:
- Responder dudas sobre productos, métodos de pago y tiempos de entrega de forma concisa, educada y clara.
- Métodos de pago aceptados: Tarjetas de crédito/débito y pagos seguros procesados vía Stripe.
- Envíos: Cobertura en toda la República Mexicana. Tiempos de entrega estándar estimados entre 5 a 12 días hábiles (según el proveedor/paquetería).
- Si un usuario pregunta por soporte específico de una orden existente, indícale que proporcione su número de pedido o escriba directamente al correo de soporte: bfs237@gmail.com.
- Mantén las respuestas breves (máximo 2 párrafos) y directas.
`;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { messages, message } = await req.json();

    // Permitir recibir un prompt simple o el historial completo de mensajes
    const incomingMessage = message || (Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1].content
      : null);

    if (!incomingMessage) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const result = await model.generateContent(incomingMessage);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);

    return NextResponse.json(
      { error: error?.message || 'Internal server error while processing chat' },
      { status: 500 }
    );
  }
}
