import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto my-12">
        <div className="w-20 h-20 bg-primary-container text-primary rounded-full flex items-center justify-center mb-6 ring-4 ring-primary/20 shadow-sm">
          <CheckCircle2 size={42} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">
          ¡Gracias por tu compra en Mizton Shop!
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant mb-6 leading-relaxed">
          Tu pedido ha sido procesado exitosamente. En breve recibirás un correo de confirmación con los detalles de tu compra.
        </p>
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/60 text-sm text-on-surface-variant mb-8 w-full text-left">
          <strong className="text-primary block mb-1">📦 Tiempo estimado de entrega:</strong>
          5 a 12 días hábiles a cualquier parte de la República Mexicana.
        </div>
        <Link 
          href="/" 
          className="px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-[#05373B] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          Volver al catálogo
        </Link>
      </main>
      <Footer />
    </div>
  );
}
