import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container dark:bg-surface-dim border-t border-outline-variant dark:border-outline flex flex-col items-center p-xl w-full gap-lg mt-auto pb-24 md:pb-xl">
      <div className="w-full max-w-max-width flex flex-col md:flex-row justify-between items-center gap-lg">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-md w-full md:w-auto">
          <div className="font-headline-md text-headline-md text-primary font-bold">
            Mizton Shop
          </div>
          <div className="flex flex-col w-full max-w-sm gap-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Suscríbete para ofertas exclusivas
            </span>
            <div className="flex">
              <input
                className="flex-grow px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-l font-body-md text-body-md focus:outline-none focus:border-primary"
                placeholder="Tu correo electrónico"
                type="email"
              />
              <button className="bg-primary text-on-primary px-4 py-2 rounded-r font-label-md text-label-md hover:bg-surface-tint transition-colors">
                Enviar
              </button>
            </div>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-lg gap-y-sm">
          <Link
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary underline opacity-80 hover:opacity-100 transition-opacity"
            href="#"
          >
            Privacidad
          </Link>
          <Link
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary underline opacity-80 hover:opacity-100 transition-opacity"
            href="#"
          >
            Términos
          </Link>
          <Link
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary underline opacity-80 hover:opacity-100 transition-opacity"
            href="#"
          >
            Contacto
          </Link>
          <Link
            className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary underline opacity-80 hover:opacity-100 transition-opacity"
            href="#"
          >
            Ayuda
          </Link>
        </nav>
      </div>
      <div className="font-label-sm text-label-sm text-on-surface-variant mt-sm">
        © {new Date().getFullYear()} Mizton Shop. Todos los derechos reservados.
      </div>
    </footer>
  );
}
