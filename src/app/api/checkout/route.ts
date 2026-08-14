import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // @ts-expect-error: Stripe SDK type version mismatch
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1 } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "productId es requerido" }, { status: 400 });
    }

    // Obtener el producto desde Supabase para validar el precio real
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error || !product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    const price = Number(product.price_mxn ?? product.price ?? 0);
    
    // Stripe expects amounts in cents
    const unitAmount = Math.round(price * 100);
    
    const rawImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.image_url;
    const cleanImage = rawImage ? rawImage.split('?')[0].replace(/_\.(avif|webp)$/i, '') : "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9";
    const finalImageUrl = cleanImage.startsWith('//') ? 'https:' + cleanImage : cleanImage;

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://mizton.shop';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      currency: "mxn",
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: product.title,
              images: [finalImageUrl],
            },
            unit_amount: unitAmount,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["MX"] },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Error creating checkout session", err);
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
