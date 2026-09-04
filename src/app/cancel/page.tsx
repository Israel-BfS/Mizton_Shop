import Link from 'next/link';
import { XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto my-12">
        <div className="w-20 h-20 bg-secondary-container text-secondary rounded-full flex items-center justify-center mb-6 ring-4 ring-secondary/20 shadow-sm">
          <XCircle size={42} />
        </div>
        <h1 className="text-3xl font-extrabold text-on-surface mb-3">Pago cancelado</h1>
        <p className="text-base text-on-surface-variant mb-8 leading-relaxed">
          No se realizó ningún cargo a tu tarjeta. Puedes volver a intentarlo cuando estés listo o contactar a Mizton AI si tuviste algún inconveniente.
        </p>
        <Link 
          href="/" 
          className="px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-md"
        >
          Volver a la tienda
        </Link>
      </main>
      <Footer />
    </div>
  );
}
