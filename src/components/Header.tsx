import { Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="bg-surface dark:bg-inverse-surface w-full top-0 sticky border-b border-outline-variant dark:border-outline flex items-center justify-between px-margin-mobile h-16 z-40">
        <button
          aria-label="Menu"
          className="text-primary dark:text-primary-fixed-dim hover:bg-surface-container-low dark:hover:bg-surface-variant p-2 rounded-full transition-colors duration-200"
        >
          <Menu size={24} />
        </button>
        <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
          <Link href="/">Mizton Shop</Link>
        </div>
        <button
          aria-label="Cart"
          className="text-primary dark:text-primary-fixed-dim hover:bg-surface-container-low dark:hover:bg-surface-variant p-2 rounded-full transition-colors duration-200 relative"
        >
          <ShoppingCart size={24} />
          <span className="absolute top-1 right-1 bg-error text-on-error text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      </header>
      {/* Search Bar (Mobile only, beneath header) */}
      <div className="md:hidden px-margin-mobile py-sm bg-surface border-b border-outline-variant">
        <div className="relative w-full">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant"
          />
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-full font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Buscar productos..."
            type="text"
          />
        </div>
      </div>
    </>
  );
}
