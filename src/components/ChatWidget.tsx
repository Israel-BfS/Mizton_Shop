"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = {
  role: "user" | "model";
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "¡Hola! Soy el asistente virtual de Mizton Shop. ¿En qué te puedo ayudar hoy?" },
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
      setMessages((prev) => [...prev, { role: "model", text: "Lo siento, ha ocurrido un error al procesar tu solicitud." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-on-primary p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
          aria-label="Abrir chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-surface-container-lowest border border-outline-variant shadow-xl rounded-2xl w-[90vw] md:w-[350px] h-[500px] max-h-[80vh] flex flex-col overflow-hidden transition-all duration-300 transform scale-100 opacity-100">
          {/* Header */}
          <div className="bg-primary text-on-primary px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="font-label-md text-label-md font-bold">Mizton AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-primary hover:bg-white/20 p-1 rounded-full transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-surface-container-lowest">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-2 font-body-md text-body-md whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary-container text-on-primary-container self-end rounded-tr-sm"
                    : "bg-surface-container text-on-surface self-start rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-surface-container text-on-surface self-start rounded-2xl rounded-tl-sm px-4 py-2 font-body-md text-body-md text-sm animate-pulse">
                Mizton AI está escribiendo...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-outline-variant bg-surface">
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
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary text-on-primary p-2 rounded-full hover:bg-surface-tint disabled:opacity-50 disabled:hover:bg-primary transition-colors flex items-center justify-center"
                aria-label="Enviar"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
