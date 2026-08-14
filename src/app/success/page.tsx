import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Gracias por tu compra en Mizton Shop!</h1>
      <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
        Tu pedido ha sido procesado exitosamente. En breve recibirás un correo de confirmación con los detalles de tu compra.
        <br /><br />
        <strong>Tiempo estimado de entrega:</strong> 10 a 15 días hábiles a cualquier parte de México.
      </p>
      <Link href="/" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md">
        Volver al inicio
      </Link>
    </div>
  );
}
