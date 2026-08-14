"use client";

import { useState } from "react";

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
      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {loading ? (
        <span className="animate-pulse">Redirigiendo a pago seguro...</span>
      ) : (
        "Comprar Ahora"
      )}
    </button>
  );
}
