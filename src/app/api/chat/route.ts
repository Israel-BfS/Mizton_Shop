import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_INSTRUCTION = `
Identidad: Eres el asistente virtual de "Mizton Shop", una tienda de variedad en México con productos para mascotas, ropa y novedades.
Tono: Amable, formal y directo. Usa español de México.
Políticas clave:
- Envíos a todo México con tiempo estimado de entrega de 10 a 15 días hábiles.
- Pagos seguros procesados por Stripe (tarjetas de crédito y débito).
- Devoluciones permitidas dentro de los primeros 7 días tras recibir el producto si presenta defectos.
Regla importante: Si no sabes la respuesta a una duda específica sobre una orden, pide el correo electrónico del cliente para que el equipo de soporte humano lo contacte.
`;

export async function POST(req: NextRequest) {
  try {
    const { history, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sanitizedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
      parts: msg.parts,
    }));

    // El primer mensaje debe ser 'user'
    while (sanitizedHistory.length > 0 && sanitizedHistory[0].role === "model") {
      sanitizedHistory.shift();
    }

    const chat = model.startChat({
      history: sanitizedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    return NextResponse.json({ text: response.text() });
  } catch (error: unknown) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
