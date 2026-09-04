export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Home, Grid, Heart, Sparkles, ShieldCheck, Truck, Headphones, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default async function HomePage() {
  const { data: products } = await supabase
    .from("products")
    .select("*");

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top Promo Bar con información oficial y paleta alebrije */}
      <div className="bg-gradient-to-r from-primary via-secondary to-tertiary text-white font-label-sm text-xs md:text-sm py-2 px-margin-mobile text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-xs">
        <Sparkles size={14} className="animate-spin text-amber-200" style={{ animationDuration: '4s' }} />
        <span>Envíos a todo México (5 a 12 días hábiles) • Pagos con tarjeta vía Stripe</span>
        <Sparkles size={14} className="hidden sm:inline text-amber-200" />
      </div>
      
      <Header />

      <main className="flex-grow flex flex-col w-full max-w-max-width mx-auto px-4 md:px-margin-desktop py-6 md:py-8 gap-10 md:gap-14">
        {/* Hero Section con la Mascota Oficial */}
        <section className="relative w-full rounded-3xl overflow-hidden bg-alebrije-hero text-white p-6 md:p-12 shadow-xl border border-teal-800/40">
          {/* Fondo con patrón sutil */}
          <div className="absolute inset-0 pattern-alebrije-dark-dots opacity-40 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Columna Izquierda: Texto y Llamado a la Acción */}
            <div className="md:col-span-7 flex flex-col items-start justify-center gap-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/40 text-amber-300 text-xs md:text-sm font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Mizton Shop • Tienda Oficial
              </div>

              <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
                Moda, Accesorios y Cuidado para ti y tu Mascota
              </h1>

              <p className="font-body-lg text-white/90 text-sm md:text-base max-w-xl leading-relaxed">
                Envíos seguros a todo México en 5 a 12 días hábiles. Pagos 100% protegidos con tarjeta de crédito o débito a través de Stripe.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#catalogo"
                  className="bg-secondary hover:bg-secondary/90 text-white font-label-md text-sm md:text-base px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-secondary/30 flex items-center gap-2 font-bold group"
                >
                  Explorar Catálogo
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:bfs237@gmail.com"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-label-md text-sm md:text-base px-5 py-3.5 rounded-xl transition-colors backdrop-blur-sm flex items-center gap-2"
                >
                  <Mail size={16} />
                  Soporte Oficial
                </a>
              </div>
            </div>

            {/* Columna Derecha: Escultura 3D de la Mascota */}
            <div className="md:col-span-5 flex justify-center items-center relative">
              {/* Halos decorativos de color */}
              <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-secondary/30 blur-3xl -z-10"></div>
              <div className="absolute w-48 h-48 rounded-full bg-tertiary/25 blur-2xl -z-10 translate-x-8 translate-y-8"></div>

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-amber-400/60 shadow-2xl p-2 bg-gradient-to-br from-teal-900/60 via-purple-950/40 to-teal-950/80 backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-500">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/mascot.jpg"
                    alt="Mizton, Gato Alebrije - Mascota Oficial"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
                {/* Badge flotante en la imagen */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-2.5 border border-white/20 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="font-bold">Mizton Oficial</span>
                  </div>
                  <span className="text-amber-300 text-[11px] font-semibold">Mascota de la Tienda</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props con información oficial de la tienda */}
        <section className="py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base text-on-surface">Envíos a todo México</h4>
                <p className="text-xs text-on-surface-variant">Entrega estimada de 5 a 12 días hábiles</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs hover:border-secondary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base text-on-surface">Pagos Protegidos</h4>
                <p className="text-xs text-on-surface-variant">Tarjetas de crédito y débito vía Stripe</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs hover:border-tertiary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-tertiary/15 text-amber-700 flex items-center justify-center shrink-0">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base text-on-surface">Soporte Oficial</h4>
                <p className="text-xs text-on-surface-variant">Atención directa en bfs237@gmail.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold">
                Categorías Destacadas
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant mt-1">Explora nuestra variedad seleccionada</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Category 1: Mascotas */}
            <div className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer border border-outline-variant/60 hover:shadow-lg transition-all">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=700&auto=format&fit=crop&q=80')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <h3 className="font-headline-md text-xl font-bold text-white">
                  Para Mascotas
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>

            {/* Category 2: Ropa y Estilo */}
            <div className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer border border-outline-variant/60 hover:shadow-lg transition-all">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=700&auto=format&fit=crop&q=80')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <h3 className="font-headline-md text-xl font-bold text-white">
                  Ropa y Estilo
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>

            {/* Category 3: Lo Más Vendido */}
            <div className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer border border-outline-variant/60 hover:shadow-lg transition-all">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=700&auto=format&fit=crop&q=80')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <h3 className="font-headline-md text-xl font-bold text-white">
                  Lo Más Vendido
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center group-hover:bg-tertiary group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid dinámico desde Supabase */}
        <section id="catalogo" className="pt-2 pb-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold">
                Catálogo de Productos
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                Envíos a todo México de 5 a 12 días hábiles • Pagos protegidos vía Stripe
              </p>
            </div>
            <span className="text-xs font-semibold text-primary bg-primary-container/60 px-3 py-1.5 rounded-full border border-primary/20">
              {products?.length || 0} Disponibles
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id || product.title}
                  product={product}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-on-surface-variant bg-surface-container-low rounded-2xl border border-outline-variant/60">
                <p>No se encontraron productos disponibles en este momento.</p>
                <p className="text-xs text-on-surface-variant/70 mt-1">
                  Si tienes alguna duda, escríbenos a bfs237@gmail.com.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* BottomNavBar - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-3 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant shadow-lg z-50">
        <Link
          className="flex flex-col items-center justify-center text-primary font-semibold px-3 py-1"
          href="/"
        >
          <Home size={22} className="mb-0.5" />
          <span className="text-[11px]">Inicio</span>
        </Link>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors px-3 py-1"
          href="#catalogo"
        >
          <Grid size={22} className="mb-0.5" />
          <span className="text-[11px]">Catálogo</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors px-3 py-1"
          href="mailto:bfs237@gmail.com"
        >
          <Mail size={22} className="mb-0.5" />
          <span className="text-[11px]">Soporte</span>
        </a>
      </nav>
    </div>
  );
}
