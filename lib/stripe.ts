import { Stripe } from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(secretKey!, {
  apiVersion: "2025-08-27.basil",
  typescript: true,
});

export { stripe };