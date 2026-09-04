"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import Image from "next/image";

type Message = {
  role: "user" | "model";
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "model", 
      text: "¡Hola! Soy el asistente virtual oficial de Mizton Shop. ¿En qué te puedo asesorar hoy sobre productos, métodos de pago con Stripe o envíos a todo México (5 a 12 días hábiles)?" 
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages: Message[] = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessages((prev) => [...prev, { role: "model", text: `Error: ${data.error || "No se pudo procesar la consulta."}` }]);
      } else {
        setMessages((prev) => [...prev, { role: "model", text: data.reply || "Hubo un error de formato en la respuesta." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "model", text: "Lo siento, ha ocurrido un error al procesar tu solicitud. Escríbenos a bfs237@gmail.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      {/* Botón Flotante con la Mascota */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-1 bg-gradient-to-tr from-primary via-secondary to-tertiary rounded-full shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ring-4 ring-primary/20"
          aria-label="Abrir chat de soporte Mizton Shop"
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
            <Image
              src="/mascot.jpg"
              alt="Mizton Shop AI"
              fill
              className="object-cover"
            />
          </div>
          {/* Badge de estado en línea */}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          {/* Tooltip en desktop */}
          <span className="hidden md:group-hover:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-surface-container-lowest text-on-surface text-xs font-bold px-3 py-1.5 rounded-xl shadow-md border border-outline-variant/60 whitespace-nowrap items-center gap-1">
            <Sparkles size={12} className="text-tertiary" />
            ¿Dudas? Chat oficial de ayuda
          </span>
        </button>
      )}

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="bg-surface-container-lowest border border-outline-variant/80 shadow-2xl rounded-3xl w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] flex flex-col overflow-hidden transition-all duration-300">
          {/* Cabecera del Chat */}
          <div className="bg-gradient-to-r from-[#082A30] via-primary to-secondary text-white px-4 py-3.5 flex justify-between items-center relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shadow-sm shrink-0">
                <Image
                  src="/mascot.jpg"
                  alt="Mizton Shop AI"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm">Mizton Shop AI</span>
                  <span className="text-[9px] bg-amber-400/30 text-amber-200 px-1.5 py-0.2 rounded-full font-semibold border border-amber-300/40">
                    Oficial
                  </span>
                </div>
                <span className="text-[11px] text-teal-100/80">Asistente Virtual de la Tienda</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-colors relative z-10"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-surface-container-low/40">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-xs ${
                  msg.role === "user"
                    ? "bg-primary text-white self-end rounded-tr-xs"
                    : "bg-surface-container-lowest border border-outline-variant/60 text-on-surface self-start rounded-tl-xs"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-surface-container-lowest border border-outline-variant/60 text-on-surface-variant self-start rounded-2xl rounded-tl-xs px-4 py-2.5 text-xs animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span>Procesando tu consulta...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de Envío */}
          <div className="p-3 border-t border-outline-variant/60 bg-surface-container-lowest">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu duda aquí..."
                className="flex-1 bg-surface-container-low border border-outline-variant/80 rounded-full px-4 py-2 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-secondary text-white p-2.5 rounded-full disabled:opacity-40 transition-colors flex items-center justify-center shrink-0 shadow-xs"
                aria-label="Enviar mensaje"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
