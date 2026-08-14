import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Pago cancelado</h1>
      <p className="mt-2 text-gray-600">No se realizó ningún cargo a tu tarjeta.</p>
      <Link href="/" className="mt-6 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition">
        Volver a la tienda
      </Link>
    </div>
  );
}
