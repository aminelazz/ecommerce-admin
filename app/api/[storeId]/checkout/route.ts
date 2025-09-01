import { Stripe } from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const storeURL = process.env.FRONTEND_STORE_URL

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = await params
    const body = await req.json()
    const { productIds }: { productIds: string[] } = body

    const storeURL = req.headers.get("origin") || process.env.FRONTEND_STORE_URL

    if (!storeURL) {
      return new NextResponse("Store URL is required", { status: 400, headers: corsHeaders })
    }

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Invalid request", { status: 400, headers: corsHeaders })
    }

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    })

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    products.forEach(product => { 
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name
          },
          unit_amount: product.price.toNumber() * 100, // Convert to cents
        },
        quantity: 1,
      })
    })

    const order = await prismadb.order.create({
      data: {
        storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map(productId => ({
            product: {
              connect: { // Link to existing product
                id: productId
              }
            }
          }))
        }
      }
    })

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true
      },
      payment_method_types: ["card"],
      success_url: `${storeURL}/cart?success=1`,
      cancel_url: `${storeURL}/cart?canceled=1`,
      metadata: {
        orderId: order.id
      }
    })

    return NextResponse.json({ url: session.url }, { headers: corsHeaders })

  } catch (error) {
    console.log("[CHECKOUT_POST]", error)
    return new NextResponse("Internal error", { status: 500, headers: corsHeaders })
  }
}