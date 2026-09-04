import { Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="bg-surface-container-lowest/95 backdrop-blur-md w-full top-0 sticky border-b border-outline-variant/60 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-18 py-2 z-40 shadow-xs">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Menu"
            className="md:hidden text-primary hover:bg-primary-container/40 p-2 rounded-full transition-colors duration-200"
          >
            <Menu size={24} />
          </button>
          
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Mascot Avatar Icon */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-tertiary shadow-sm group-hover:scale-105 transition-transform duration-300 ring-2 ring-primary/20">
              <Image
                src="/mascot.jpg"
                alt="Mascota Mizton Shop"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all">
                Mizton Shop
              </span>
              <span className="hidden md:block text-[10px] font-semibold tracking-widest uppercase text-tertiary -mt-1">
                Tienda con Alma Mexicana
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-on-surface-variant"
            />
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
              placeholder="Buscar productos para ti y tu mascota..."
              type="text"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Cart"
            className="text-primary hover:bg-primary-container/40 p-2.5 rounded-full transition-colors duration-200 relative group"
          >
            <ShoppingCart size={24} className="group-hover:text-secondary transition-colors" />
            <span className="absolute top-1 right-1 bg-secondary text-on-secondary text-[11px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-xs">
              3
            </span>
          </button>
        </div>
      </header>

      {/* Search Bar (Mobile only) */}
      <div className="md:hidden px-margin-mobile py-2.5 bg-surface-container-low border-b border-outline-variant/60">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-on-surface-variant"
          />
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-full font-body-md text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            placeholder="Buscar productos..."
            type="text"
          />
        </div>
      </div>
    </>
  );
}
