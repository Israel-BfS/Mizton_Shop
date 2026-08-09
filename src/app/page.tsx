import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Home, Grid, Heart, User } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Top Promo Bar */}
      <div className="bg-primary-container text-on-primary-container font-label-sm text-label-sm py-2 px-margin-mobile text-center">
        Envío gratis a todo México
      </div>
      
      <Header />

      <main className="flex-grow flex flex-col w-full max-w-max-width mx-auto">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-surface-container-high">
          <div
            className="absolute inset-0 bg-cover bg-center w-full h-full"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCq9dgccvFUYwAcz-T4qliM06HTY5vHVje0uS2sDRj7U2S7qLjulFyOKZoIO8_4T28cNnY73NE65FMS5pqu_qHgqlJKNNUhDM04JW8w0Jzas6fWaNydG8TJrmiHvIXFk7K6H9Z7qdIGwVn0_iOhvqSTsbMz5-GKh34cwfpXcugfJ2xoOIU4CxbWPMhzS5fkU56te03BWgM_Tipax8hqwK1LAGuDCEX5kBTL7UewQRozD_ujmf-gJnfr')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="relative z-10 text-center px-margin-mobile flex flex-col items-center justify-end h-full pb-xl w-full">
            <h1 className="font-display-lg text-display-lg text-on-primary mb-md">
              Novedades de Temporada
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/90 mb-lg max-w-lg">
              Descubre lo último en moda y accesorios para ti y tu mascota.
            </p>
            <button className="bg-primary text-on-primary font-label-md text-label-md px-lg py-3 rounded hover:bg-surface-tint transition-colors shadow-sm">
              Explorar Catálogo
            </button>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-lg px-margin-mobile bg-surface-bright border-b border-outline-variant">
          <div className="grid grid-cols-3 gap-sm max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary mb-xs text-[28px]">
                local_shipping
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                Envío Rápido
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary mb-xs text-[28px]">
                verified_user
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                Pago Seguro
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-primary mb-xs text-[28px]">
                support_agent
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                Soporte 24/7
              </span>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-xl px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-lg">
            Categorías Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Category 1 */}
            <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer border border-outline-variant hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDs-A1S9sApJnCxJfQNjNeQL74N8kWGf_BkWjVkBGtPZ2DWgzbteTEu_b49N30Yd8XnHZi35fIbq5ROSVHx0pEaKRAPMkeSLIR5xEP-ZEF57OrCf-InEBvNxlbmdxs8oV4OiM3HBz1GLVhInzlc70khRjL2DMeiPYfws2HGU20bLUmQXjEglrGS5824fECFUEFSgE1S7J9h4qURwnDg_IFXe19RRRuHyrLU2iDKaAPb5Z0zi0apevdP')",
                }}
              ></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-label-md text-label-md text-on-surface">
                  Para Mascotas
                </span>
              </div>
            </div>
            {/* Category 2 */}
            <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer border border-outline-variant hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWjbqtzQlLhzuiRjIaPFNqXq1KtvCLXqONz6zlVQvF5YjPSVkrHqufGjifBK1HnB-jrJvFICv5uaVKOC3YXZ6Tb14v-DxS8r2ohZZnDF_uGcNajCsbfvfqq0FMdjVhcvQ3K32usnAuZF83KeTpR-ReUTldufVhexc2DCNG5MtIOFlhGlzUyIhQUuJbINdrrSVo_0UrkCfaAAm-KtT2fBaGi-O0owILFce2qVXFGBPf62LAmBOni2z4')",
                }}
              ></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-label-md text-label-md text-on-surface">
                  Ropa y Estilo
                </span>
              </div>
            </div>
            {/* Category 3 */}
            <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer border border-outline-variant hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUYiW9eiuZAQVWSq7Di6VoeJZuzNbKPP8-j9m4AiYCoUPG7jPFSN8SL4k5K_a3poyrz8amDNaQ4Xs9edMiYg7uzp_H4ktvkoqeuDyDVJPJ0YEIZOeZYo-BdZyI9dqUqaZj4YMM2FO19f3-pQOsY2aZpH3-Z_BIsaJ49S9MUAXcdrEVSkb1C9OFHioBHes8nlIfb0q5XCcJ49bbvKITpLVgET6nStDzJVZ26az-bt7aGfBH1n10YYaJ')",
                }}
              ></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="font-label-md text-label-md text-on-surface">
                  Lo Más Vendido
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface-bright">
          <div className="flex justify-between items-end mb-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Nuevos Ingresos
            </h2>
            <button className="text-primary font-label-md text-label-md hover:underline">
              Ver Todos
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-sm md:gap-md">
            <ProductCard
              title="Cama Confort Mascotas"
              price={850}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuD81YY_k1TMJ6afLoTSjRtuSrOSdl5sqdULPtRnzAyXidMnSiNKlvnW6a-XPirv5AysjGWgRxdQ04p1mbweRdl5l3By3pwbfR5kj9cOwjvpG_7-ph2AjPg1PFd_wfOkth9U3KQ4A53UO8e_qSMaNH3YU9zHFDfIDKXdIucqcqXJVf2BvdnADCYgCNy_WjgBTZqikERgVE6bhimCZ1LLSnuSgPSXbRNy0aw2BdzbE6cUF5fTgDqB_fxw"
              imageAlt="Cama Confort Mascotas"
              isNew={true}
            />
            <ProductCard
              title="Plato Cerámica Minimalista"
              price={320}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAc4dHlXRcCGsb-hqPLfcObmAGO8u5YGyk46bcWGx__CfspXiuBWdIn16jCenrzuRcGKhOqtrzst9F7KLJRw6QoHY-HaLaaVN5jokhEKiPd9GctgpEJAbTAzgIG0DmlwUgvvHbHK2XrLLKaUcHtNrizLg_4Eg8tuoYDSWyozck6iDuNzKWRiYAA0Q2udfisOA_aXOK_ZDN3PW42IFi2MuUobd2bycUcer-vBYr40JmW9obaAcaNtF1n"
              imageAlt="Plato Cerámica Minimalista"
            />
            <ProductCard
              title="Correa Trenzada Reforzada"
              price={450}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDU0ndh1iMOaNEKisC7gqkAqWZkBQ6-eSJWYz3tgAJa1vEy8jgFXfNByDv4klVIsWP-rtsUDvwEe5gA2B84j8AStPZdym86OrbJGvneMn7e2u5ZciW6phT_AUY5ssSktFAezQRGa6itZmcRD9HSGxcTZ4o-UEjykml9xeUJZgVLjsxwF8_SkRQrXzyU_VqA9y7zqf5Hd2A5bsLPKdu_-3z-Ir3OYX8yEvJVs8EGgvAxDT9h4Fta-eiu"
              imageAlt="Correa Trenzada Reforzada"
            />
            <ProductCard
              title="Tote Bag Mizton Edición Limitada"
              price={290}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Ay3X3cR9FZzbVW16Nbq0ytLmJIV3IbhTV32ImReAPWEGjeAe2IgbE3exRDr6dZpFc-nup83BC5Oe7U6rhTkp8t9VSnVVhWY_4WbBZKUjtZEJjPg8DZcMAJ2dPhZOSbsI9Mh2-qddF7w3B8rKI8Yul9vL02l8303lBwwS_l5GhcJ5QGHcw4C8pFo8xJkWnQfG93kGDZlqFbIwXYHBVH-j10aZGWdYXAaCDmsp9CDO_Q_BFdI6Fo4a"
              imageAlt="Tote Bag Mizton Edición Limitada"
            />
          </div>
        </section>
      </main>

      <Footer />

      {/* BottomNavBar (JSON) - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-4 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-sm z-50">
        <Link
          className="flex flex-col items-center justify-center bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed rounded-full px-4 py-1 scale-95 active:duration-100"
          href="#"
        >
          <Home size={24} className="mb-1" />
          <span className="font-label-sm text-label-sm">Inicio</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest rounded-full px-4 py-1 scale-95 active:duration-100 transition-colors"
          href="#"
        >
          <Grid size={24} className="mb-1" />
          <span className="font-label-sm text-label-sm">Categorías</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest rounded-full px-4 py-1 scale-95 active:duration-100 transition-colors"
          href="#"
        >
          <Heart size={24} className="mb-1" />
          <span className="font-label-sm text-label-sm">Favoritos</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest rounded-full px-4 py-1 scale-95 active:duration-100 transition-colors"
          href="#"
        >
          <User size={24} className="mb-1" />
          <span className="font-label-sm text-label-sm">Perfil</span>
        </Link>
      </nav>
    </>
  );
}
