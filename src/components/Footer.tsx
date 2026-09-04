import Link from "next/link";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#08262C] text-white border-t-2 border-amber-400/30 flex flex-col items-center pt-12 pb-24 md:pb-12 px-6 w-full mt-auto relative overflow-hidden">
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 pattern-alebrije-dark-dots opacity-20 pointer-events-none"></div>

      <div className="w-full max-w-max-width flex flex-col md:flex-row justify-between items-center md:items-start gap-10 relative z-10">
        {/* Brand & Mascot */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
              <Image
                src="/mascot.jpg"
                alt="Mascota Mizton"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-headline-md text-2xl font-bold bg-gradient-to-r from-teal-200 via-amber-200 to-pink-300 bg-clip-text text-transparent">
                Mizton Shop
              </span>
              <p className="text-[11px] text-amber-300 font-semibold tracking-wider uppercase">
                Tradición & Vanguardia
              </p>
            </div>
          </div>
          
          <p className="text-xs text-teal-100/70 leading-relaxed">
            Inspirados en la artesanía de Oaxaca y el amor por nuestras mascotas y hogares. Envíos confiables a toda la República Mexicana.
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col w-full max-w-sm gap-2">
          <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Sparkles size={14} />
            Únete a la familia Mizton
          </span>
          <p className="text-xs text-teal-100/70 mb-1">
            Recibe promociones especiales y lanzamientos exclusivos.
          </p>
          <div className="flex rounded-xl overflow-hidden shadow-inner border border-teal-700/60">
            <input
              className="flex-grow px-3.5 py-2.5 bg-teal-950/60 font-body-md text-xs text-white placeholder:text-teal-200/50 focus:outline-none focus:bg-teal-950/80"
              placeholder="tu.correo@ejemplo.com"
              type="email"
            />
            <button className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 font-label-md text-xs font-bold transition-colors">
              Suscribirme
            </button>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-xs text-teal-100/80">
          <Link className="hover:text-amber-300 transition-colors" href="#">
            Privacidad
          </Link>
          <Link className="hover:text-amber-300 transition-colors" href="#">
            Términos
          </Link>
          <Link className="hover:text-amber-300 transition-colors" href="#">
            Contacto
          </Link>
          <Link className="hover:text-amber-300 transition-colors" href="#">
            Ayuda y Envíos
          </Link>
        </nav>
      </div>

      <div className="w-full max-w-max-width mt-10 pt-6 border-t border-teal-900/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-teal-200/60 relative z-10">
        <span>© {new Date().getFullYear()} Mizton Shop. Hecho con orgullo en México.</span>
        <span className="flex items-center gap-1">
          Cuidado con cariño <Heart size={12} className="text-secondary fill-secondary" /> para tus mascotas
        </span>
      </div>
    </footer>
  );
}
