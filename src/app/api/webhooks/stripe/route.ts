import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // @ts-expect-error: Stripe SDK type version mismatch
  apiVersion: "2024-06-20",
});

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables"
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("Error: Falta stripe-signature o STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Missing stripe-signature header or STRIPE_WEBHOOK_SECRET environment variable" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error al verificar la firma";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extraer los line items adquiridos
    let items: Array<{
      id: string;
      description: string | null;
      quantity: number | null;
      amount_total: number;
      unit_amount: number;
      currency: string;
    }> = [];

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });

      items = lineItems.data.map((item) => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total ? item.amount_total / 100 : 0,
        unit_amount: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
        currency: item.currency,
      }));
    } catch (lineItemsError) {
      console.warn("No se pudieron obtener los line items de Stripe:", lineItemsError);
    }

    // Extraer dirección de envío (shipping_details o customer_details)
    const sessionWithShipping = session as unknown as {
      shipping_details?: {
        address?: Stripe.Address | null;
        name?: string | null;
      };
    };

    const address =
      sessionWithShipping.shipping_details?.address ||
      session.customer_details?.address;

    const shippingAddress = {
      calle: address?.line1 || "",
      colonia: address?.line2 || "",
      cp: address?.postal_code || "",
      estado: address?.state || "",
      ciudad: address?.city || "",
      pais: address?.country || "MX",
    };

    const stripePaymentIntentId =
      (typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id) || session.id;

    const customerEmail =
      session.customer_details?.email || session.customer_email || "";
    const customerName =
      session.customer_details?.name ||
      sessionWithShipping.shipping_details?.name ||
      "";
    const totalMxn = session.amount_total ? session.amount_total / 100 : 0;

    // Conectar e insertar en Supabase (tabla orders) usando SUPABASE_SERVICE_ROLE_KEY
    try {
      const supabaseAdmin = getSupabaseAdmin();
      const { error: insertError } = await supabaseAdmin.from("orders").insert({
        stripe_payment_intent_id: stripePaymentIntentId,
        customer_email: customerEmail,
        customer_name: customerName,
        shipping_address: shippingAddress,
        items: items,
        total_mxn: totalMxn,
        status: "paid",
      });

      if (insertError) {
        console.error("Error al registrar la orden en Supabase:", insertError);
        return NextResponse.json(
          { error: "Error al guardar el pedido en la base de datos" },
          { status: 500 }
        );
      }

      console.log(`Pedido creado exitosamente para la sesión ${session.id}`);
    } catch (supabaseErr: unknown) {
      const msg =
        supabaseErr instanceof Error
          ? supabaseErr.message
          : "Error con cliente Supabase";
      console.error("Error al inicializar Supabase o insertar orden:", msg);
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
