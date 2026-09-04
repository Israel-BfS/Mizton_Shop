"use client";

import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

export default function CheckoutButton({ productId }: { productId: string | number }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Ocurrió un error al procesar el pago");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error al iniciar el pago");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-[#05373B] text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
    >
      <Lock size={18} className="opacity-90" />
      {loading ? (
        <span className="animate-pulse">Redirigiendo a pago seguro...</span>
      ) : (
        <>
          <span>Comprar Ahora</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}
