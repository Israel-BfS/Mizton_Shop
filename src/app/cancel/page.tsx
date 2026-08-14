import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">El pago fue cancelado</h1>
      <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
        No se ha realizado ningún cargo a tu tarjeta. Puedes volver a intentar tu compra cuando lo desees.
      </p>
      <Link href="/" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md">
        Volver al catálogo
      </Link>
    </div>
  );
}
