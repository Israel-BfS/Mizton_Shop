import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-expect-error: Suppress type error if API version doesn't exactly match the type definition
  apiVersion: "2024-06-20", 
});

interface CheckoutItem {
  title: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Origin for redirect after payment
    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: CheckoutItem) => ({
        price_data: {
          currency: "mxn",
          product_data: {
            name: item.title,
            images: [item.imageUrl],
          },
          unit_amount: item.price * 100, // Stripe expects amounts in cents
        },
        quantity: item.quantity || 1,
      })),
      mode: "payment",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: unknown) {
    console.error("Error creating checkout session", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
